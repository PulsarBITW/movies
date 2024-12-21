package mockdata

import "movies-backend/internal/models"

var MovieList = []models.Movie{
	{ID: 1, Title: "Начало", Genre: "Научная фантастика", Company: "Warner Bros.", Year: 2010},
	{ID: 2, Title: "Главный герой", Genre: "Комедия", Company: "20th Century Studios", Year: 2021},
	{ID: 3, Title: "Фильм Наги (Блю Лок)", Genre: "Аниме", Company: "Bandai Namco", Year: 2024},
	{ID: 4, Title: "Дюна: Часть первая", Genre: "Научная фантастика", Company: "Warner Bros.", Year: 2021},
	{ID: 5, Title: "Дэдпул", Genre: "Комедия", Company: "20th Century Fox", Year: 2016},
}