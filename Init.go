package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/opensourceways/community-robot-lib/secret"
	"github.com/sirupsen/logrus"
	"gopkg.in/yaml.v2"

	"openSummer/Client"
	"openSummer/Dao"
	"openSummer/Model"
	"openSummer/service"
)

func ReadYamlConfig(path string) (*Model.TaskConfig, error) {
	conf := &Model.TaskConfig{}
	if f, err := os.Open(path); err != nil {
		return nil, err
	} else {
		err := yaml.NewDecoder(f).Decode(conf)
		if err != nil {
			return nil, err
		}
	}
	return conf, nil
}

func Init() {
	o := gatherOptions(flag.NewFlagSet(os.Args[0], flag.ExitOnError), os.Args[1:]...)
	if err := o.Validate(); err != nil {
		logrus.WithError(err).Fatal("Invalid Options")
	}
	var err error

	secretAgent := new(secret.Agent)
	if err := secretAgent.Start([]string{o.github.TokenPath, o.gitee.TokenPath, o.gitlab.TokenPath}); err != nil {
		logrus.WithError(err).Fatal("Error starting secret agent.")
	}

	Client.Gitee = Client.GetGiteeClient(string(secretAgent.GetTokenGenerator(o.gitee.TokenPath)()))
	Client.Gitlab = Client.GetGitlabClient(string(secretAgent.GetTokenGenerator(o.gitlab.TokenPath)()))

	service.SyncTask, err = ReadYamlConfig(o.service.ConfigFile)
	if err != nil {
		_ = fmt.Errorf(err.Error())
	}
	service.UserMap = make(map[string]Model.User)
	users := Dao.GetUser()
	for _, user := range users {
		service.UserMap[user.Identifier] = user
	}

}
