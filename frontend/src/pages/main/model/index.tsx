import {createEffect, createEvent, sample} from 'effector';
import {createGate} from 'effector-react';

import {rootDomain} from '@shared/effectorRootEntities';
import {MediaItem} from '@shared/types/media';
import {baseFetchMovies, baseFetchMediaList} from '@shared/api';

function createMainPageModel() {
  const mainPageDomain = rootDomain.createDomain('mainPageDomain');
  const MainPageGate = createGate('MainPageGate');

  const mockRequest = async (): Promise<MediaItem[]> => {
    return [
      {
        id: 1,
        type: 'film',
        title: 'Film1',
        genre: 'Action',
        company: '20th Century Studios',
        rating: 8.5,
        year: 2024,
      },
      {
        id: 2,
        type: 'series',
        title: 'Serial1',
        genre: 'Drama',
        company: '20th Century Studios',
        rating: 9.0,
        episodes: 10,
        seasons: 1,
        year: 2024,
      },
      {
        id: 3,
        type: 'film',
        title: 'Inception',
        genre: 'Science Fiction',
        company: '20th Century Studios',
        rating: 8.5,
        year: 2024,
      },
      {
        id: 4,
        type: 'film',
        title: 'The Protagonist',
        genre: 'Comedy',
        company: '20th Century Studios',
        rating: 8.5,
        year: 2024,
      },
      {
        id: 5,
        type: 'series',
        title: "Pharmacist's Monologue",
        genre: 'Detective',
        company: '20th Century Studios',
        rating: 9.0,
        episodes: 24,
        seasons: 1,
        year: 2024,
      },
      {
        id: 6,
        type: 'film',
        title: "Nagi's Film (Blue Lock)",
        genre: 'Anime',
        company: 'Bandai Namco',
        rating: 8.5,
        year: 2024,
      },
      {
        id: 7,
        type: 'film',
        title: 'Dune: Part One',
        genre: 'Science Fiction',
        company: 'Warner Bros.',
        rating: 8.5,
        year: 2024,
      },
      {
        id: 8,
        type: 'film',
        title: 'Deadpool',
        genre: 'Comedy',
        company: '20th Century Fox',
        rating: 8.5,
        year: 2024,
      },
      {
        id: 9,
        type: 'series',
        title: 'Demon Slayer',
        genre: 'Anime',
        company: '20th Century Studios',
        rating: 9.0,
        episodes: 24,
        seasons: 1,
        year: 2024,
      },
    ];
  };

  const req = async () => {
    try {
      return await baseFetchMediaList();
    } catch (err) {
      console.error(err);
    } finally {
      return await mockRequest();
    }
  };

  const fetchMediaListFx = createEffect({name: '', handler: req});

  const fetchMoviesListFx = createEffect({name: 'moviesFx', handler: baseFetchMovies});

  const $mediaList = mainPageDomain.createStore<MediaItem[]>([]);

  $mediaList.on(fetchMediaListFx.doneData, (_, response) => response);

  const logPending = createEvent();

  sample({
    clock: MainPageGate.open,
    fn: () => {},
    target: [fetchMediaListFx, fetchMoviesListFx],
  });

  return {$mediaList, MainPageGate, fetchMediaListFx, fetchMoviesListFx, logPending};
}

export const {$mediaList, MainPageGate, fetchMediaListFx, fetchMoviesListFx, logPending} =
  createMainPageModel();
