package models

type Media interface {
	GetID() int
	GetTitle() string
	GetGenre() string
	GetRating() float64
	GetType() string
}

type MediaStruct struct {
	ID       int     `json:"id"`
	Title    string  `json:"title"`
	Genre    string  `json:"genre"`
	Company  string  `json:"company"`
	Year     int     `json:"year"`
	Rating   float64 `json:"rating"`
	Seasons  *int    `json:"seasons"`
	Episodes *int    `json:"episodes"`
	Type     string  `json:"type"`
}