package mockdata

import "movies-backend/internal/models"

var UsersByLogin= map[string]models.User{
	"test": {ID: 0, Login: "test", Password: "test", Name: "test User", Role: "admin"},
	"admin": {ID: 1, Login: "admin", Password: "admin123", Name: "Admin User", Role: "admin"},
	"johndoe": {ID: 2, Login: "johndoe", Password: "user123", Name: "John Doe", Role: "user"},
	"janedoe": {ID: 3, Login: "janedoe", Password: "user123", Name: "Jane Doe", Role: "user"},
	"michael92": {ID: 4, Login: "michael92", Password: "user123", Name: "Michael Smith", Role: "user"},
	"emily_b": {ID: 5, Login: "emily_b", Password: "user123", Name: "Emily Brown", Role: "user"},
}