package main

import (
	"flag"
	"fmt"

	liboptions "github.com/opensourceways/community-robot-lib/options"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"openSummer/Model"
	"openSummer/service"
)

type Options struct {
	//syncEndpoint string
	service liboptions.ServiceOptions
	github  liboptions.GithubOptions
	gitee   liboptions.GiteeOptions
	gitlab  liboptions.GitLabOptions
}

func gatherOptions(fs *flag.FlagSet, args ...string) Options {
	var o Options

	o.github.AddFlags(fs)
	o.gitee.AddFlags(fs)
	o.service.AddFlags(fs)
	o.gitlab.AddFlags(fs)
	//fs.StringVar(&o.syncEndpoint, "sync-endpoint", "", "the sync agent server api root path")

	_ = fs.Parse(args)
	return o
}

func (o *Options) Validate() error {
	//if o.syncEndpoint == "" {
	//	return fmt.Errorf("missing sync-endpoint param")
	//}

	if err := o.service.Validate(); err != nil {
		return err
	}

	return o.github.Validate()
}

func main() {
	Init()
	service.Sync()

}

func store() {
	dsn := "root:password@tcp(127.0.0.1:3306)/GitlabUser?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	// Create
	db.Create(&Model.User{
		Identifier: "D42",
		Username:   "123",
		Email:      "123",
		Token:      "123",
	})

	// Read
	var user Model.User
	var userList []Model.User
	db.First(&user, 2) // 根据整型主键查找
	fmt.Println("查看user", user)

	a := db.First(&user, "token= ?", "123") // 查找 code 字段值为 D42 的记录
	fmt.Println("查看user", user)
	fmt.Println("查看a", a.Error)

	db.Find(&userList, "token=?", "123")
	fmt.Println("查看userList", userList)

	// Update - 将 product 的 price 更新为 200
	db.Model(&user).Update("token", "abc")
	// Update - 更新多个字段
	fmt.Println("查看user", user)

	// Delete - 删除 product
	db.Delete(&user)
}
