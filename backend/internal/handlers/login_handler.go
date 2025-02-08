package handlers

import (
	"movies-backend/internal/mockdata"
	"movies-backend/internal/models"
	"movies-backend/lib"
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoginHandler(c *gin.Context) {
	var creds struct {
		Login    string `json:"login"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&creds); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	var user *models.User
	for _, u := range mockdata.Users {
		if u.Login == creds.Login && u.Password == creds.Password {
			user = &u
			break
		}
	}

	if user == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid credentials"})
		return
	}

	mockdata.TokenRefreshCounter++
	accessToken, refreshToken := lib.GenerateTokens(mockdata.TokenRefreshCounter)

	mockdata.RefreshTokenStore = append(mockdata.RefreshTokenStore, refreshToken)
	mockdata.AccessTokenStore = append(mockdata.AccessTokenStore, accessToken)



	c.JSON(http.StatusOK, gin.H{
		"user": gin.H{
			"id":    user.ID,
			"login": user.Login,
			"name":  user.Name,
			"role":  user.Role,
		},
		"accessToken":  accessToken,
		"refreshToken": refreshToken,
	})
}