import {Film, MediaItem, Series} from './types';

export const isFilm = (mediaItem: MediaItem): mediaItem is Film => {
  return mediaItem.type === 'film';
};

export const isSeries = (mediaItem: MediaItem): mediaItem is Series => {
  return mediaItem.type === 'series';
};
