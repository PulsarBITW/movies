package mockdata

import "movies-backend/internal/models"

var Users = []models.User{
	{ID: 0, Login: "test", Password: "test", Name: "test User", Role: "admin"},
	{ID: 1, Login: "admin", Password: "admin123", Name: "Admin User", Role: "admin"},
	{ID: 2, Login: "johndoe", Password: "user123", Name: "John Doe", Role: "user"},
	{ID: 3, Login: "janedoe", Password: "user123", Name: "Jane Doe", Role: "user"},
	{ID: 4, Login: "michael92", Password: "user123", Name: "Michael Smith", Role: "user"},
	{ID: 5, Login: "emily_b", Password: "user123", Name: "Emily Brown", Role: "user"},
}