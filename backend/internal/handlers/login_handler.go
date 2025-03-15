package handlers

import (
	"fmt"
	"movies-backend/configs"
	"movies-backend/internal/mockdata"
	"movies-backend/internal/models"
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

	if currentUser.RegType != models.RegByCredentials {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Account registered by social"})
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
		RefreshToken string `json:"refreshToken" binding:"required"`
	}

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	claims, err := lib.ParseToken(requestBody.RefreshToken, configs.TOP_SECRET)

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

func LoginByGoogleHandler(c *gin.Context) {
	var requestBody struct {
		GoogleToken string `json:"googleToken" binding:"required"`
	}

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	googleClaims, err := lib.ParseGoogleOAuth2Token(requestBody.GoogleToken)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	//
	currentUser, userFound:= mockdata.UsersByLogin[googleClaims.Email]

	if (userFound) {
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
		} else {
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
	} else {
		newUser:=createUserByGoogle(googleClaims)
		
		newAccessToken,newRefreshToken, err:= lib.GenerateTokens(newUser.ID,newUser.Login,newUser.Role, configs.TOP_SECRET)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token generation failed"})
			return
		}

		newUser.RefreshToken = newRefreshToken
		newUser.AccessToken = newAccessToken
		mockdata.UsersByLogin[googleClaims.Email] = newUser

		fmt.Println(mockdata.UsersByLogin)

		c.JSON(http.StatusOK, gin.H{
			"user": gin.H{
				"id":    newUser.ID,
				"login": newUser.Login,
				"name":  newUser.Name,
				"role":  newUser.Role,
			},
			"accessToken":  newUser.AccessToken,
			"refreshToken": newUser.RefreshToken,
		})
	}


}

func createUserByGoogle (googleClaims *lib.GoogleClaims) models.User {
	newUser := models.User{
		ID:       len(mockdata.UsersByLogin),
		Login:    googleClaims.Email,
		Name:     googleClaims.Name,
		Role:     models.UserRole,
		RegType:  models.RegByGoogle,
	}
	return newUser
}