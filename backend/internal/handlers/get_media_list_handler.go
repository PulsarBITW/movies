package handlers

import (
	"movies-backend/internal/mockdata"
	"movies-backend/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMediaList(c *gin.Context) {

	mediaList:= []models.MediaStruct{}

	for _, mediaItem :=range mockdata.MediaList {

		if series, ok := mediaItem.(models.Series); ok{
			media := models.MediaStruct{
				ID:       series.ID,
				Title:    series.Title,
				Genre:   series.Genre,
				Company: series.Company,
				Year:     series.Year,
				Rating:   series.Rating,
				Seasons:  &series.Seasons,
				Episodes: &series.Episodes,
				Type :   series.Type,
				
			}
			mediaList = append(mediaList, media)
			continue;
		}

		if film, ok := mediaItem.(models.Film); ok{
			media := models.MediaStruct{
				ID:       film.ID,
				Title:    film.Title,
				Genre:   film.Genre,
				Company: film.Company,
				Year:     film.Year,
				Rating:   film.Rating,
				Type :   film.Type,
				
			}
			mediaList = append(mediaList, media)
			continue;
		}

	}

	c.JSON(http.StatusOK, mediaList)
}	