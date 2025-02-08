package models

type User struct {
	ID       int    `json:"id"`
	Login    string `json:"login"`
	Password string `json:"-"`
	Name     string `json:"name"`
	Role     string `json:"role"`
}