---
title: 玩转虚拟化测试框架avocado-vt之用例编写
date: 2021-01-30
tags: 
    - virttest
    - avocado-vt
archives: 2021-01
author: zhuhuankai
summary: 以vmtop的用例为例,介绍avocado-vt测试用例的执行流程和编写方法。
---

# 简介

本文以vmtop的用例为例，介绍如何使用avocado-vt框架来编写用例，执行测试。如果还没完成前置部署，可以前往本系列文章《玩转虚拟化测试框架avocado-vt之安装部署》。

# 用例执行流程

- 获取配置的参数

  框架配置好的默认参数和开发者自定义配置的参数 

- 根据配置的参数，准备环境

  比如创建或销毁虚拟机实例

- 执行测试主体

  使用前面配置好的参数，进行测试。通常在经过每个测试点时，如果引发了TestFail异常则失败，如果没有引发异常，则通过。

- 结束阶段，清理环境

  根据测试过程中的情况来执行清理环境的操作。包括销毁虚拟机，删除镜像等等。
  
# 笛卡尔配置

- Keys and values

  Avocado-VT框架用 "key" = "value“ 的方式来定义参数key，如下图中第16行中test_type就是"key", start就是"value"。
  要注意的是，Avocado-VT框架的参数解析是自顶向下的。所以后面的key实际上会覆盖前面的key。其实这也很符合正常的逻辑。

- Variants

  Variants是参数配置的关键，每个Variant块都可以包含多个同级别的参数。

  两个不同的variants间可以组成所有可能的组合。

  可以看到下图中，第10行的variants下，包含了positive_test和negative_test两个分支，这两个分支是独立的，分别代表正向测试用例和反向测试用例。在positive_test的分支里面包含了两个variants，第一个variant里的有life_cycle、data_events、cmdline_d、multivmtop、vcpu_hotplug五个元素，第二个variant里有single_vm、multi_vms两个元素。单就这两个同级的variants最大可以得到10个组合。

  因为life_cycle下还有一个variant，其中有start、destroy、reboot、pause_resume四个元素。所以理论上最大可以得到8乘2共16个组合。组合出来的名称会形如：positive_test.single_vm.life_cycle.start。

- Filters

  过滤器，帮助筛选用例组合，常用的过滤器一共两种，分别是only 和 no。下图中，因为第41行的only过滤器的存在。所以multi_vms只会和life_cycle.start组合，不会和其余的7个元素组合。positive_test一共有共9个组合。
  
```
- vmtop:
    type = vmtop
    start_vm = "no"
    output_file = "vmtop_output"
    vcpu_max = 8
    vcpu_cur = 4
    vcpu_live = 6
    vm_num = 1
    only aarch64
    variants:
        - positive_test:
            variants:
                - life_cycle:
                    variants:
                        - start:
                            test_type = start
                        - destroy:
                            test_type = destroy
                        - reboot:
                            test_type = reboot
                        - pause_resume:
                            test_type = pause
                - data_events:
                    test_type = data_events
                - cmdline_d:
                    option = "d"
                    interval = 2
                - multivmtop:
                    test_type = multivmtop
                    vmtopnum = 6
                - vcpu_hotplug:
                    test_type = vcpu_hotplug
                    vcpu_placement = "static"
            variants:
                - single_vm:
                    test_type = single_vm
                    vm_num = 1
                - multi_vms:
                    test_type = multi_vms
                    vm_num = 3
                    only life_cycle.start
        - negative_test:
            variants:
                - invalid_cmdline:
                    option = "x"
```

# 用例要点

- 依赖库

  Python和avocado-vt框架提供了大量的封装好的库。利用好这些库，可以大大提升编写用例的效率，精简用例的代码，提高可读性。

```python
import os
import logging

from avocado.utils import process
from avocado.utils import path
from avocado.core import exceptions

import virttest.utils_libguestfs as lgf
from virttest.utils_test import libvirt
from virttest.libvirt_xml import vm_xml
from virttest import virsh
from virttest import data_dir
```


- run函数

  run函数是avocado-vt用例必不可缺的部分，我们所要做的就是往run函数中添加测试逻辑，run函数提供的test、params、env三个参数将帮助我们完成对虚拟机实例的大量操作以及对测试点的设计和实现。

  test：avocado/avocado/core/test.py
  params: avocado-vt/virttest/utils_params.py
  env: avocado-vt/virttest/utils_env.py

```python
def run(test, params, env):
```

- 参数配置

  包括获取虚拟机实例，从cfg文件获取预置的参数。这部分类似于定义和初始化变量。

```python
vmname = params.get("main_vm", "avocado-vt-vm1")
vm = env.get_vm(vmname)

output = params.get("output_file", "output")
output_path = os.path.join(data_dir.get_tmp_dir(), output)
option = params.get("option")
interval = params.get("interval")
test_type = params.get("test_type", "")
vcpu_placement = params.get("vcpu_placement")
vcpu_cur = int(params.get("vcpu_cur"))
vcpu_max = int(params.get("vcpu_max"))
vcpu_live = int(params.get("vcpu_live"))
vm_num = int(params.get("vm_num"))
vmtopnum = params.get("vmtopnum")
```

- 对虚拟机实例的操作最常用的库来源

  libvirt: avocado-vt/virttest/libvirt_vm.py
avocado-vt/virttest/virsh.py
qemu: avocado-vt/virttest/qemu_vm.py

# 用例测试点

- 在环境上安装vmtop

  在hostos上使用“yum install -y vmtop”命令来安装vmtop工具。process.run是python提供的库，这里用于执行shell命令。如果没有成功安装，利用try-except的语法，合理地抛出异常。
  
```python
#Install vmtop command
install_cmd = "yum install -y vmtop"
process.run(install_cmd, shell=True)
#Find vmtop command
try:
    vmtop = path.find_command("vmtop")
except path.CmdNotFoundError as info:
    raise exceptions.TestSkipError("No vmtop command found - %s" % info)
```

- virsh.start

  利用virsh.start来启动libvirt虚拟机实例。注意libvirt类型的用例需要先用xml文件define一个虚拟机。

```python
virsh.start(vmname, ignore_status=True)
```

- test.fail

  编写一个vmtop_info函数，获取其返回值，根据返回值来判断是否符合我们的预期。如果不符合，进入test.fail，用例执行失败。这就是一个典型的测试点。

```python
#Test vmtop when start vm
res = vmtop_info(vmtop, output_path, info_type="Domains")
if int(res) != vm_num:
    test.fail("start failed and the res = %s" % res)
```

- vmtop_info

  该函数使用vmtop命令，将vmtop显示的结果存放到在参数配置阶段就预置好的临时路径output_path里（临时路径的能力是os库提供的，没人希望跑完用例后，产生一堆东西占用磁盘吧，用例执行过程中的临时存放路径很好地解决了这个问题）
  通常单独提取出这样一个函数，而不直接在run函数中测试，是为了能更好的复用。如果要对vmtop显示出的其他信息进行验证，只要在这个vmtop_info函数中去扩充即可。

```python
def vmtop_info(vmtop, output_path, info_type):
    """
    Collect and return vmtop infomation
    """
    cmd = "%s -b -H -n 1 > %s" % (vmtop, output_path)
    process.run(cmd, ignore_status=True, shell=True)

    if info_type == "Domains":
        cmd = "cat %s | grep  Domains | awk '{ print $2 }'" % output_path
        res = process.run(cmd, ignore_status=True, shell=True)
    elif info_type == "Cpu":
        cmd = "cat %s | grep /KVM | awk 'END{ print NR }'" % output_path
        res = process.run(cmd, ignore_status=True, shell=True)
    elif info_type == "Data":
        cmd = "cat %s | grep  DID" % output_path
        res = process.run(cmd, ignore_status=True, shell=True)

    return res.stdout_text
```

- 环境清理

  为了保证每个用例之间不要相互影响，我们需要在用例执行的结尾阶段，清理一下我们的环境。比如清除虚拟机实例，删除磁盘等等
  
```python
finally:
    # Destroy vm_clone
    if test_type == "multi_vms":
        num = 1
        while num < vm_num:
            if virsh.domain_exists(vm_clone_name[num - 1]):
                if virsh.is_alive(vm_clone_name[num - 1]):
                    virsh.destroy(vm_clone_name[num - 1])
                    virsh.remove_domain(vm_clone_name[num - 1], \
                                        "--remove-all-storage", debug=True)
            num = num + 1

    if vm.is_alive():
        vm.destroy()
    vmxml.sync()
```

- 完整的用例源码

  [1.python文件](https://gitee.com/openeuler/tp-libvirt/tree/openEuler-20.03/libvirt/tests/src/virt_cmd/vmtop.py
  )
  [2.cfg文件](https://gitee.com/openeuler/tp-libvirt/tree/openEuler-20.03/libvirt/tests/cfg/virt_cmd/vmtop.cfg
  )

