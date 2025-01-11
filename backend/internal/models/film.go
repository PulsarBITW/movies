package models

type Film struct {
	ID      int     `json:"id"`
	Title   string  `json:"title"`
	Genre   string  `json:"genre"`
	Company string  `json:"company"`
	Year    int     `json:"year"`
	Rating  float64 `json:"rating"`
	Type    string  `json:"type"`
}

func (f Film) GetID() int {
	return f.ID
}

func (f Film) GetTitle() string {
	return f.Title
}

func (f Film) GetGenre() string {
	return f.Genre
}

func (f Film) GetRating() float64 {
	return f.Rating
}

func (f Film) GetType() string {
	return f.Type
}