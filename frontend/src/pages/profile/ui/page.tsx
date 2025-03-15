import {useUnit} from 'effector-react';

import {Button, Papper} from '@shared/ui';
import {authModel} from '@features/auth';

export const ProfilePage = () => {
  const logout = useUnit(authModel.logout);

  return (
    <Papper className="flex w-full flex-col gap-4">
      <div className="text-text-primary">Profile</div>
      <Button onClick={logout} color="destructive" variant="outline">
        Logout
      </Button>
    </Papper>
  );
};
