package mockdata

import (
	"movies-backend/internal/models"
)





var MediaList = []models.Media{
	models.Film{ID: 1, Type:"Film",Title: "Film1", Genre: "Action", Company: "20th Century Studios", Rating: 8.5, Year:2024},
	models.Series{ID: 2,Type:"Series", Title: "Serial1", Genre: "Drama", Company: "20th Century Studios", Rating: 9.0, Episodes: 10, Seasons: 1, Year:2024},
	models.Film{ID: 3,Type:"Film", Title: "Начало", Genre: "Научная фантастика", Company: "20th Century Studios", Rating: 8.5, Year:2024},
	models.Film{ID: 4,Type:"Film", Title: "Главный герой", Genre: "Комедия", Company: "20th Century Studios", Rating: 8.5, Year:2024},
	models.Series{ID: 5,Type:"Series", Title: "Монолог фармацевта", Genre: "Детектив", Company: "20th Century Studios", Rating: 9.0, Episodes: 24, Seasons: 1, Year:2024},
	models.Film{ID: 6,Type:"Film", Title: "Фильм Наги (Блю Лок)", Genre: "Аниме", Company: "Bandai Namco", Rating: 8.5, Year:2024},
	models.Film{ID: 7,Type:"Film", Title: "Дюна: Часть первая", Genre: "Научная фантастика", Company: "Warner Bros.",  Rating: 8.5, Year:2024},
	models.Film{ID: 8,Type:"Film", Title: "Дэдпул", Genre: "Комедия", Company: "20th Century Fox", Rating: 8.5, Year:2024},
	models.Series{ID: 9,Type:"Series", Title: "Клинок демонов", Genre: "Anime", Company: "20th Century Studios", Rating: 9.0, Episodes: 24, Seasons: 1, Year:2024},

}

