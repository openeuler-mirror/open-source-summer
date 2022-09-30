package Dao

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"openSummer/Model"
)

var DbConn *gorm.DB

func init() {
	dsn := "root:password@tcp(127.0.0.1:3306)/GitlabUser?charset=utf8mb4&parseTime=True&loc=Local"
	var err error
	DbConn, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
}

func GetUser() []Model.User {
	var result []Model.User
	DbConn.Find(&result) // 根据整型主键查找
	return result
}

func CreateUser(user *Model.User) {
	DbConn.Create(user)
}
