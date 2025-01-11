package handlers

import (
	"movies-backend/internal/mockdata"
	"movies-backend/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetFilms(c *gin.Context) {

	films := []models.Film{}

	for _, media:=range mockdata.MediaList {
		if film, ok := media.(models.Film); ok{
			films= append(films,film)
		}
	}

	c.JSON(http.StatusOK, films)
}