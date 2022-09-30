---
title: Analysis of the Implementation Solution of the Container Exit Monitoring Mechanism in Kata Shim V2
date: 2021-04-09
tags:
  - iSulad
  - Container
  - shim v2
archives: 2021-04
author: Gao Huatao
summary: As the runtime of the kata container, containerd-shim-kata-v2 reduces the number of components and shortens the call chain compared with shim v1.
---

Currently, shim is available in two architectures: shim v1 and shim v2. As the traditional shim solution, shim v1 acts as the intermediate layer between the container engine and runtime to forward I/Os and signals. The new shim v2 integrates the runtime, shortening the call chain for creating containers and effectively reducing memory overheads. This document uses [containerd-shim-kata-v2](https://github.com/kata-containers/runtime/tree/master/containerd-shim-v2) to analyze how iSulad and containerd monitor the exit of the pause and service containers.  

### Introduction to Shim V2

In the shim v1 architecture, the startup of a secure container involves the kata-shim, kata-runtime, kata-proxy, kata-agent, and QEMU used to create VMs. In the shim v2 architecture, shim, proxy, and runtime are integrated into a binary file. When the pause container and service containers in the pause container are started, only one containerd-shim-kata-v2 process and one qemu-kvm process run in the host OS, that is, the pause container and its service containers share the same containerd-shim-kata-v2 process and VM.   

The following figure shows [comparison between the shim v2 and shim v1 architectures](https://github.com/kata-containers/documentation/blob/master/design/architecture.md). In the single pause + multiple service containers scenario of shim v1, each time a pause or service container is started, a containerd-shim or isulad-shim process and a kata-shim process are started. The pause and service containers share the kata-proxy (not VSOCK) and VM processes (2N+1). However, in the same scenario of shim v2, the host OS has only one containerd-shim-kata-v2 process and one qemu-kvm process. The call chain is shorter and the overall memory overhead is lower. This is particularly noticeable with increased service containers in the pause container, as it is more advantageous to have low memory overheads.  

![](./2021-04-09-isulad-shimv2-arch-1.png)  

### Relationship Between iSulad and Shim V1 and Shim V2  

1. Implementation of Shim V1 in iSulad  

   The isulad-shim component is the implementation solution of shim v1 in iSulad. Its code is stored in the iSulad repository so it is compiled and installed together with iSulad. The component can be used to connect to different OCI runtimes, such as runc and kata-runtime.  

2. Implementation of Shim V2 in iSulad  

   Currently, the interconnection between iSulad and shim v2 is still being debugged. Shim v2 is implemented in two modes: containerd-shim-kata-v2 and containerd-shim-runc-v2. This document uses containerd-shim-kata-v2 to analyze how shim v2 monitors the exit of a secure container.  

3. The following figure shows the differences between shimv1 and shim v2.  

![shimv-shimv2-diff](./2021-04-09-isulad-shimv2-shimv2-differences.png)  


### Container Exit Monitoring in iSulad

iSulad uses the epoll mechanism to confirm the exit_fifo file descriptor opened in each isulad-shim process is closed. When detecting that a container exits, isulad-shim writes its exit code into the FIFO file, and then reads and sets the container exit status in iSulad. Both the service container and pause container open an exit_fifo file descriptor and start an isulad-shim process, respectively.

iSulad  | <==> isulad-shim <==> container init

iSulad  | <==> isulad-shim <==> pause init

The code for opening the exit_fifo file descriptor and enabling epoll monitoring during the container startup process in iSulad is as follows:  

```c
int do_start_container(container_t *cont, const char *console_fifos[], bool reset_rm, pid_ppid_info_t *pid_info)
{
    runtime_start();
    do_post_start_on_success() {
        container_supervisor_add_exit_monitor() {
            supervisor_handler_lock();
    	    epoll_loop_add_handler();
        }
    }
}
```



### Container Exit Monitoring in containerd

When starting a container and monitoring its exit status, containerd uses the wait method in RPC instead of the FIFO file. When starting a pause container or service container and invoking the exec command of the container, containerd starts a coroutine to obtain the exit status. After containerd is restarted, the connect method rebuilds the wait methods of all containers.  

- Process of monitoring the start sandbox and start container  

Code file: containerd/vendor/github.com/containerd/cri/pkg/server/events.go  

```go
// eventMonitor monitors containerd event and updates internal state correspondingly.
// TODO(random-liu): Handle event for each container in a separate goroutine.  
type eventMonitor struct {
	c  *criService
	ch <-chan *events.Envelope
	// exitCh receives container/sandbox exit events from exit monitors.  
	exitCh  chan *eventtypes.TaskExit
	errCh   <-chan error
	ctx     context.Context
	cancel  context.CancelFunc
	backOff *backOff
}
//container monitors exits.  
func (c *criService) StartContainer(ctx context.Context, r *runtime.StartContainerRequest) (retRes *runtime.StartContainerResponse, retErr error) {
    // wait is a long running background request, no timeout needed.   
	//ght container for listening  
	exitCh, err := task.Wait(ctrdutil.NamespacedContext())
    
    // start the monitor after updating container state, this ensures that  
	// event monitor receives the TaskExit event and update container state
	// after this.
	c.eventMonitor.startExitMonitor(context.Background(), id, task.Pid(), exitCh)
}

// RunPodSandbox creates and starts a pod-level sandbox. Runtimes should ensure
// the sandbox is in ready state.
func (c *criService) RunPodSandbox(ctx context.Context, r *runtime.RunPodSandboxRequest) (_ *runtime.RunPodSandboxResponse, retErr error) {
    // wait is a long running background request, no timeout needed.
	exitCh, err := task.Wait(ctrdutil.NamespacedContext())
    // start the monitor after adding sandbox into the store, this ensures
	// that sandbox is in the store, when event monitor receives the TaskExit event.
	//
	// TaskOOM from containerd may come before sandbox is added to store,
	// but we don't care about sandbox TaskOOM right now, so it is fine.
	c.eventMonitor.startExitMonitor(context.Background(), id, task.Pid(), exitCh)
}
```

containerd/process.go

```go
// containerd/process.go monitors the exit of processes such as container exec.
func (p *process) Wait(ctx context.Context) (<-chan ExitStatus, error) {
	c := make(chan ExitStatus, 1)
	go func() {
		defer close(c)
		r, err := p.task.client.TaskService().Wait(ctx, &tasks.WaitRequest{
			ContainerID: p.task.id,
			ExecID:      p.id,
		})
		if err != nil {
			c <- ExitStatus{
				code: UnknownExitStatus,
				err:  err,
			}
			return
		}
		c <- ExitStatus{
			code:     r.ExitStatus,
			exitedAt: r.ExitedAt,
		}
	}()
	return c, nil
}
```

- containerd obtains the shim PID again. Different from shim v1, the shim PID is not used as the PPID of the container. Therefore, if the container process cannot be killed, you cannot kill the shim PID to forcibly exit the container.

```go
func (m *TaskManager) loadTasks(ctx context.Context) error {}
  func loadShim() 
	func (s *shim) Connect(ctx context.Context) error {
	response, err := s.task.Connect(ctx, &task.ConnectRequest{
		ID: s.ID(),
	})
	if err != nil {
		return err
	}
	s.taskPid = int(response.TaskPid) // Obtain the PID of shim.
	return nil
}

```



### containerd-kata-shim-v2 Code Analysis

1. Entry of the ttrpc Server  

The **containerd-shim-v2/service.go** file defines the entry function for containerd-kata-shim-v2 to serve as the ttrpc server, allowing shim v2 to listen to the ttrpc calls from the container engine and implement operations such as container exit monitoring, I/O and signal forwarding.  

```go
// service is the shim implementation of a remote shim over GRPC
type service struct {
	mu          sync.Mutex
	eventSendMu sync.Mutex

	// pid Since this shimv2 cannot get the container processes pid from VM,
	// thus for the returned values needed pid, just return this shim's
	// pid directly.
	pid uint32

	ctx        context.Context
	sandbox    vc.VCSandbox
	containers map[string]*container // Stores all pause and containers in this map.
	config     *oci.RuntimeConfig
	events     chan interface{}// publish uses the 128K buffer.
	monitor    chan error // Monitors the status of the sandbox, that is, the VM.

	cancel func() // ctx cancel

	ec chan exit // Stores information such as the container exit code and PID.
	id string// io.containerd.kata.v2
}
```

- The service provides interfaces for managing the ttrpc server and shim.  

```go
type TaskService interface {
	State(ctx context.Context, req *StateRequest) (*StateResponse, error)
	Create(ctx context.Context, req *CreateTaskRequest) (*CreateTaskResponse, error)
	Start(ctx context.Context, req *StartRequest) (*StartResponse, error)
	Delete(ctx context.Context, req *DeleteRequest) (*DeleteResponse, error)
	Pids(ctx context.Context, req *PidsRequest) (*PidsResponse, error)
	Pause(ctx context.Context, req *PauseRequest) (*google_protobuf1.Empty, error)
	Resume(ctx context.Context, req *ResumeRequest) (*google_protobuf1.Empty, error)
	Checkpoint(ctx context.Context, req *CheckpointTaskRequest) (*google_protobuf1.Empty, error)
	Kill(ctx context.Context, req *KillRequest) (*google_protobuf1.Empty, error)
	Exec(ctx context.Context, req *ExecProcessRequest) (*google_protobuf1.Empty, error)
	ResizePty(ctx context.Context, req *ResizePtyRequest) (*google_protobuf1.Empty, error)
	CloseIO(ctx context.Context, req *CloseIORequest) (*google_protobuf1.Empty, error)
	Update(ctx context.Context, req *UpdateTaskRequest) (*google_protobuf1.Empty, error)
    // Obtains the container exit status.
	Wait(ctx context.Context, req *WaitRequest) (*WaitResponse, error)
	Stats(ctx context.Context, req *StatsRequest) (*StatsResponse, error)
    // Obtains the shim pid.
	Connect(ctx context.Context, req *ConnectRequest) (*ConnectResponse, error)
    // Cancels all context subtasks and stops the containerd-shim-kata-v2 process.
	Shutdown(ctx context.Context, req *ShutdownRequest) (*google_protobuf1.Empty, error)
}
// Shim server interface
type Shim interface {
	shimapi.TaskService
	Cleanup(ctx context.Context) (*shimapi.DeleteResponse, error)
	StartShim(ctx context.Context, id, containerdBinary, containerdAddress string) (string, error)
}
```



### Using containerd-shim-kata-v2 to Run Containers on iSulad  

- Start the pause container.  

```bash
isula run -tid --runtime io.containerd.kata.v2 --network none --annotation io.kubernetes.docker.type=podsandbox <pause-image> <command>
```

Obtain sandbox-id of the pod.  

- Create a service container and add it to the pod.  

```bash
isula run -tid --runtime io.containerd.kata.v2 --network none --annotation io.kubernetes.docker.type=container --annotation io.kubernetes.sandbox.id=<sandbox-id> busybox <command>
```



### Using containerd-shim-kata-v2 to Run Containers on containerd

Install cri-tools. In this document, the master branch of the cri-tools Github repository is used for compilation and installation.  

- containerd configuration:

Add the following information to the containerd configuration file **/etc/containerd/config.toml** to configure the kata parameters:  

```toml
[plugins."io.containerd.grpc.v1.cri".containerd.runtimes]
//
        [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.kata]
          runtime_type = "io.containerd.kata.v2"
          pod_annotations = ["com.github.containers.virtcontainers.sandbox_cpu", "com.github.containers.virtcontainers.sandbox_mem", "com.github.containers.virtcontainers.static_devices", "com.github.containers.virtcontainers.sandbox_drivers", "com.github.containers.virtcontainers.boot_cgroup"]
          container_annotations = ["com.github.containers.virtcontainers.storage_spec"]
//
        [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
          base_runtime_spec = ""

```

- Install the CNI plug-in.

Install the plugin by using the following script:

```
https://github.com/containerd/containerd/blob/master/script/setup/install-cni
```

- Specify the runtime to run the pod.

```bash
$ crictl -i unix:///var/run/containerd/containerd.sock -r unix:///var/run/containerd/containerd.sock runp --runtime kata sandbox-config.json
$ cat sandbox-config.json
{
    "metadata": {
            "name": "nginx-sandbox",
            "namespace": "default",
            "attempt": 1,
            "uid": "hdishd83djaidwnduwk28bcsb"
        },
    "image": {
        "image": "docker.io/library/busybox:latest"
    },
    "linux": {
        }
}

```

----

Author: Gao Huatao
