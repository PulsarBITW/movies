package mockdata

import "movies-backend/internal/models"

var MovieList = []models.Movie{
	{ID: 1, Title: "Inception", Genre: "Science Fiction", Company: "Warner Bros.", Year: 2010},
	{ID: 2, Title: "Free Guy", Genre: "Comedy", Company: "20th Century Studios", Year: 2021},
	{ID: 3, Title: "Nagi's Film (Blue Lock)", Genre: "Anime", Company: "Bandai Namco", Year: 2024},
	{ID: 4, Title: "Dune: Part One", Genre: "Science Fiction", Company: "Warner Bros.", Year: 2021},
	{ID: 5, Title: "Deadpool", Genre: "Comedy", Company: "20th Century Fox", Year: 2016},
}