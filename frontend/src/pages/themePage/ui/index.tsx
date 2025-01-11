import {Buttons} from './Buttons';
import {Text} from './Text';
import {Carousels} from './Carousel';

export const ThemePage = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="rounded-lg bg-foreground p-2">
        <h1 className="font-bold text-text-primary">Theme Page</h1>
      </div>
      <div className="flex flex-col">
        <Buttons />
        <Carousels />
        <Text />
      </div>
    </div>
  );
};
