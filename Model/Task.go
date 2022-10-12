package Model

type TaskConfig struct {
	SyncTasks []SyncTasks `yaml:"sync_tasks"`
}
type Source struct {
	Org      string `yaml:"org"`
	Platform string `yaml:"platform"`
	URL      string `yaml:"url"`
}
type Target struct {
	Org      string `yaml:"org"`
	Platform string `yaml:"platform"`
	URL      string `yaml:"url"`
}
type Task struct {
	Duration string   `yaml:"duration"`
	Type     string   `yaml:"type"`
	Source   []Source `yaml:"source"`
	Target   []Target `yaml:"target"`
}
type SyncTasks struct {
	Task []Task `yaml:"task"`
}
