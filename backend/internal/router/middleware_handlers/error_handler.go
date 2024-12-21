package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
		if len(c.Errors) > 0 {
			for _, e := range c.Errors {
				c.Error(e.Err)
			}

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": c.Errors[0].Error(),
			})
			return
		}
	}
}
