package handlers

import (
	"movies-backend/configs"
	"movies-backend/internal/mockdata"
	"movies-backend/lib"
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoginByCredentialsHandler(c *gin.Context) {
	var credentials struct {
		Login    string `json:"login"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	currentUser, userFound:= mockdata.UsersByLogin[credentials.Login]

	if !userFound {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid login"})
		return
	}

	if currentUser.Password != credentials.Password {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid password"})
		return
	}

	_,accessTokenError := lib.ParseToken(currentUser.AccessToken, configs.TOP_SECRET)
	_,refreshTokenError := lib.ParseToken(currentUser.RefreshToken, configs.TOP_SECRET)

	 if (accessTokenError != nil || refreshTokenError != nil) {
			newAccessToken,newRefreshToken, err:= lib.GenerateTokens(currentUser.ID,currentUser.Login,currentUser.Role, configs.TOP_SECRET)

			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Token generation failed"})
				return
			}
	
			currentUser.RefreshToken = newRefreshToken
			currentUser.AccessToken = newAccessToken
	
			mockdata.UsersByLogin[currentUser.Login] = currentUser
	 }

	c.JSON(http.StatusOK, gin.H{
		"user": gin.H{
			"id":    currentUser.ID,
			"login": currentUser.Login,
			"name":  currentUser.Name,
			"role":  currentUser.Role,
		},
		"accessToken":  currentUser.AccessToken,
		"refreshToken": currentUser.RefreshToken,
	})
}


func LoginByTokenHandler(c *gin.Context) {
	var requestBody struct {
		AccessToken string `json:"accessToken" binding:"required"`
	}

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	claims, err := lib.ParseToken(requestBody.AccessToken, configs.TOP_SECRET)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	currentUser, userFound:= mockdata.UsersByLogin[claims.Login]

	if !userFound {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}
	
	_,accessTokenError := lib.ParseToken(currentUser.AccessToken, configs.TOP_SECRET)
	_,refreshTokenError := lib.ParseToken(currentUser.RefreshToken, configs.TOP_SECRET)

	 if (accessTokenError != nil || refreshTokenError != nil) {
			newAccessToken,newRefreshToken, err:= lib.GenerateTokens(currentUser.ID,currentUser.Login,currentUser.Role, configs.TOP_SECRET)

			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Token generation failed"})
				return
			}
	
			currentUser.RefreshToken = newRefreshToken
			currentUser.AccessToken = newAccessToken
	
			mockdata.UsersByLogin[currentUser.Login] = currentUser
	 }

	c.JSON(http.StatusOK, gin.H{
		"user": gin.H{
			"id":    currentUser.ID,
			"login": currentUser.Login,
			"name":  currentUser.Name,
			"role":  currentUser.Role,
		},
		"accessToken":  currentUser.AccessToken,
		"refreshToken": currentUser.RefreshToken,
	})
}