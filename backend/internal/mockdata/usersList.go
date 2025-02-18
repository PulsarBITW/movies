package mockdata

import "movies-backend/internal/models"

var UsersByLogin= map[string]models.User{
	"test": {ID: 0, Login: "test", Password: "test", Name: "test User", Role: models.AdminRole, RegType: models.RegByCredentials},
	"admin": {ID: 1, Login: "admin", Password: "admin123", Name: "Admin User", Role: models.AdminRole, RegType: models.RegByCredentials},
	"johndoe": {ID: 2, Login: "johndoe", Password: "user123", Name: "John Doe", Role: models.UserRole, RegType: models.RegByCredentials},
	"janedoe": {ID: 3, Login: "janedoe", Password: "user123", Name: "Jane Doe", Role: models.UserRole, RegType: models.RegByCredentials},
	"michael92": {ID: 4, Login: "michael92", Password: "user123", Name: "Michael Smith", Role: models.UserRole, RegType: models.RegByCredentials},
	"emily_b": {ID: 5, Login: "emily_b", Password: "user123", Name: "Emily Brown", Role: models.UserRole, RegType: models.RegByCredentials},
}