package Model

import (
	"gorm.io/gorm"
)

// User  gitlab用户表
type User struct {
	gorm.Model
	GitlabId   int64  `gorm:"column:gitlab_id" db:"gitlab_id" json:"gitlab_id" form:"gitlab_id"`
	Identifier string `gorm:"column:identifier" db:"identifier" json:"identifier" form:"identifier"` //  用户loginName
	Username   string `gorm:"column:username" db:"username" json:"username" form:"username"`         //  用户名
	Email      string `gorm:"column:email" db:"email" json:"email" form:"email"`                     //  邮箱
	Token      string `gorm:"column:token" db:"token" json:"token" form:"token"`                     //  token

}

func (User) TableName() string {
	return "user"
}
