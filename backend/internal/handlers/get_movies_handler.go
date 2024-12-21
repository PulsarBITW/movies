package handlers

import (
	"movies-backend/internal/mockdata"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMovieList(c *gin.Context) {
	c.JSON(http.StatusOK, mockdata.MovieList)
}