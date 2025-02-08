package middlewares

import (
	"movies-backend/internal/mockdata"
	"movies-backend/lib"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		 fullPath := c.FullPath()
		if fullPath == "/api/refresh-tokens" || fullPath == "/api/login"{
			c.Next()
			return
		}

		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			c.Abort()
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
			c.Abort()
			return
		}

		accessToken := strings.TrimPrefix(authHeader, "Bearer ")

		if !lib.CheckIsTokenValid(mockdata.AccessTokenStore, accessToken) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid accessToken"})
			c.Abort()
			return
		}

		c.Next()
	}
}