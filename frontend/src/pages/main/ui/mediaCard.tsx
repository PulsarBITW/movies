import {MediaItem} from '@shared/api/media/types';

type MediaCardProps = {
  mediaItem: MediaItem;
};

export const MediaCard = ({mediaItem}: MediaCardProps) => {
  const {title, genre, rating, company, year} = mediaItem;

  return (
    <div className="flex h-full w-fit flex-col gap-1 rounded-lg border border-orange-400 bg-foreground p-2 text-text-primary">
      <div>{title}</div>
      <div>{genre}</div>
      <div>{rating}</div>
      <div>{company}</div>
      <div>{year}</div>
    </div>
  );
};
