package models

type Movie struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Genre   string `json:"genre"`
	Company string `json:"company"`
	Year    int    `json:"year"`
}