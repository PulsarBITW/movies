package models

type User struct {
	ID           int    `json:"id"`
	Login        string `json:"login"`
	Name         string `json:"name"`
	Role         string `json:"role"`
	Password     string `json:"-"`
	RefreshToken string `json:"-"`
	AccessToken  string `json:"-"`
}