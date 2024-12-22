package middlewares

import (
	"log"

	"github.com/gin-gonic/gin"
)

func LoggerIP() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientIP := c.ClientIP()
		log.Printf("Client IP: %s", clientIP)
		c.Next()
	}
}