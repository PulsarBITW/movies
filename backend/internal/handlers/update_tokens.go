package handlers

import (
	"fmt"
	"movies-backend/internal/mockdata"
	"movies-backend/lib"
	"net/http"

	"github.com/gin-gonic/gin"
)


func UpdateTokens(c *gin.Context) {
	var requestBody struct {
		RefreshToken string `json:"refreshToken" binding:"required"`
	}
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	var foundedToken bool = false
	for _, token := range mockdata.RefreshTokenStore {
		if token == requestBody.RefreshToken {
			foundedToken = true
			break
		}
	}

	if !foundedToken {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "refresh token not found"})
		return
	}

	mockdata.TokenRefreshCounter++
	newAccessToken,newRefreshToken:=lib.GenerateTokens(mockdata.TokenRefreshCounter)


	mockdata.RefreshTokenStore = append(mockdata.RefreshTokenStore, newRefreshToken)
	mockdata.AccessTokenStore = append(mockdata.AccessTokenStore, newAccessToken)

	fmt.Println(mockdata.RefreshTokenStore)

	c.JSON(http.StatusOK, gin.H{
		"accessToken":  newAccessToken,
		"refreshToken": newRefreshToken,
	})
}

