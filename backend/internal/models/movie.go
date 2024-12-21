package models

type Movie struct {
	ID      int    `json:"id"`      // Уникальный идентификатор
	Title   string `json:"title"`   // Название фильма
	Genre   string `json:"genre"`   // Жанр
	Company string `json:"company"` // Компания издатель
	Year    int    `json:"year"`    // Год выпуска
}