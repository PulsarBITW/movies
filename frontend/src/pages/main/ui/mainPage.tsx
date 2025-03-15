import {useRef, useState} from 'react';
import {useGate, useUnit} from 'effector-react';

import {Button, Papper} from '@shared/ui';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@shared/ui/carousel';
import {slideOnWheelPlugin} from '@shared/ui/carousel/slideOnWheelPlugin';
import {slideOnArrowPlugin} from '@shared/ui/carousel/slideOnArrowPlugin';

import {$mediaList, fetchMediaListFx, fetchMoviesListFx, logPending, MainPageGate} from '../model';
import {MediaCard} from './mediaCard';

export const MainPage = () => {
  useGate(MainPageGate);

  const fetchMediaList = useUnit(fetchMediaListFx);
  const fetchMoviesList = useUnit(fetchMoviesListFx);
  const logPendingOnClick = useUnit(logPending);

  const [count, setCount] = useState(1);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  const carousels = Array.from({length: count}, (_, i) => i + 1);

  return (
    <div className="flex max-w-full select-none flex-col gap-4 px-2">
      <div className="flex w-fit flex-col items-center gap-1">
        <h3 className="w-fit">{count}</h3>
        <div>
          <Button className="mr-2" onClick={() => decrement()}>
            -
          </Button>
          <Button onClick={() => increment()}>+</Button>
        </div>
      </div>

      <Papper>
        <Button
          onClick={() => {
            fetchMediaList();
          }}
        >
          force fetchMediaList
        </Button>
        <Button
          onClick={() => {
            logPendingOnClick();
          }}
        >
          check pending
        </Button>
        <Button
          onClick={() => {
            fetchMoviesList();
          }}
        >
          force fetchMoviesList
        </Button>
      </Papper>
      {carousels.map((value) => (
        <Papper className="px-0" key={value}>
          <LatestArrivals orientation="horizontal" />
        </Papper>
      ))}
    </div>
  );
};

const LatestArrivals = ({orientation}: {orientation: 'horizontal' | 'vertical'}) => {
  const mediaList = useUnit($mediaList);

  const carouselApi = useRef<CarouselApi | null>(null);

  if (mediaList.length === 0) return null;

  return (
    <Carousel
      options={{
        align: 'start',
        skipSnaps: false,
        dragFree: true,
      }}
      orientation={orientation}
      plugins={[slideOnWheelPlugin(), slideOnArrowPlugin()]}
      setApi={(api) => {
        carouselApi.current = api;
      }}
      className="w-full"
    >
      <CarouselContent>
        {mediaList.map((mediaItem, index) => (
          <CarouselItem key={index} className="w-fit basis-auto">
            <div className="p-1">
              <MediaCard mediaItem={mediaItem} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
