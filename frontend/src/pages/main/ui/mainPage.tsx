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

import {$mediaList, MainPageGate} from '../model';
import {MediaCard} from './mediaCard';

const MockHeightBlock = () => (
  <div className="h-[400px] w-full rounded-2xl border border-orange-400"> 111</div>
);

export const MainPage = () => {
  useGate(MainPageGate);

  const [count, setCount] = useState(1);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  const carousels = Array.from({length: count}, (v) => v as number);

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

      {carousels.map((el) => (
        <Papper className="px-0" key={el}>
          <LatestArrivals />
        </Papper>
      ))}
    </div>
  );
};

const LatestArrivals = () => {
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
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  );
};
