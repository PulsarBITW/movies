export type MediaType = 'film' | 'series';

export interface Film {
  id: number;
  title: string;
  genre: string;
  company: string;
  year: number;
  rating: number;
  type: MediaType;
}

export interface Series extends Film {
  seasons: number;
  episodes: number;
}

export type MediaItem = Film | Series;
