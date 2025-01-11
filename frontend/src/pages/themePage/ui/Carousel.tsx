import {ReactNode} from 'react';

import {
  CarouselContent,
  Carousel,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@shared/ui/carousel';
import {slideOnArrowPlugin} from '@shared/ui/carousel/slideOnArrowPlugin';
import {slideOnWheelPlugin} from '@shared/ui/carousel/slideOnWheelPlugin';
import {Group} from './group';

export const Carousels = () => {
  const slides = Array.from({length: 16}, (_, k) => k + 1);

  return (
    <Group title="Carousel">
      <h3 className="text-text-primary">
        {'freeDrag + slideOnWheelPlugin (shiftKey by default) + slideOnArrowPlugin'}
      </h3>
      <Carousel
        options={{
          align: 'start',
          skipSnaps: false,
          dragFree: true,
        }}
        plugins={[slideOnWheelPlugin(), slideOnArrowPlugin()]}
        className="w-full"
      >
        <CarouselContent className="p-1">
          {slides.map((value) => (
            <CarouselItem key={value} className="w-fit basis-auto">
              <Card value={value} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Group>
  );
};

export const Card = ({value}: {value: ReactNode}) => {
  return (
    <div
      tabIndex={0}
      className="select-none rounded-2xl bg-foreground px-16 py-12 text-text-primary"
    >
      {value}
    </div>
  );
};
