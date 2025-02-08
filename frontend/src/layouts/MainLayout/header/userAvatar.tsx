import {Avatar, AvatarFallback, AvatarImage} from '@shared/ui';

export const UserAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>You</AvatarFallback>
    </Avatar>
  );
};
