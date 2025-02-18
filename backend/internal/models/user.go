package models

type User struct {
	ID           int    `json:"id"`
	Login        string `json:"login"`
	Name         string `json:"name"`
	Role         string `json:"role"`
	RegType      string `json:"regType"`
	Password     string `json:"-"`
	RefreshToken string `json:"-"`
	AccessToken  string `json:"-"`
}

const (
	RegByCredentials = "credentials"
	// external
	RegByGoogle = "google"
	RegByMeta   = "meta"
	RegByX      = "x"
)

const (
	AdminRole = "admin"
	UserRole  = "user"
)