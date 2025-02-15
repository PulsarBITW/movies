package handlers

import (
	"fmt"
	"movies-backend/configs"
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

	claims, err := lib.ParseToken(requestBody.RefreshToken, configs.TOP_SECRET)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		c.Abort()
		return
	}

	currentUser, userFound:= mockdata.UsersByLogin[claims.Login]

	if !userFound || currentUser.RefreshToken != requestBody.RefreshToken {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		c.Abort()
		return
	}

	newAccessToken,newRefreshToken, err:= lib.GenerateTokens(claims.ID,claims.Login,claims.Role, configs.TOP_SECRET)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token generation failed"})
		c.Abort()
		return
	}

	currentUser.RefreshToken = newRefreshToken
	currentUser.AccessToken = newAccessToken

	mockdata.UsersByLogin[claims.Login] = currentUser


	fmt.Println("userByLogin", mockdata.UsersByLogin[claims.Login])

	c.JSON(http.StatusOK, gin.H{
		"accessToken":  newAccessToken,
		"refreshToken": newRefreshToken,
	})
}

