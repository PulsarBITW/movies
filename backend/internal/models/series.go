package models

type Series struct {
	ID       int     `json:"id"`
	Title    string  `json:"title"`
	Genre    string  `json:"genre"`
	Company  string  `json:"company"`
	Year     int     `json:"year"`
	Rating   float64 `json:"rating"`
	Seasons  int     `json:"seasons"`
	Episodes int     `json:"episodes"`
	Type     string  `json:"type"`
}

func (s Series) GetID() int {
	return s.ID
}

func (s Series) GetTitle() string {
	return s.Title
}

func (s Series) GetGenre() string {
	return s.Genre
}

func (s Series) GetType() string {
	return s.Type
}

func (s Series) GetRating() float64 {
	return s.Rating
}

func (s Series) GetEpisodes() int {
	return s.Episodes
}

func (s Series) GetSeasons() int {
	return s.Seasons
}
