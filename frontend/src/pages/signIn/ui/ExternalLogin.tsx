import {useUnit} from 'effector-react';
import {AtSign} from 'lucide-react';

import {Button} from '@shared/ui';
import {authModel} from '@features/auth';

export const ExternalLogin = () => {
  const gsiButtonCliked = useUnit(authModel.gsiButtonCliked);

  return (
    <div>
      <span className="mb-2 text-text-primary">Login by</span>
      <div className="flex gap-3">
        <Button variant="accent" size="icon" onClick={gsiButtonCliked}>
          <AtSign />
        </Button>
        <Button variant="accent" size="icon" onClick={gsiButtonCliked}>
          <AtSign />
        </Button>
        <Button variant="accent" size="icon" onClick={gsiButtonCliked}>
          <AtSign />
        </Button>
      </div>
    </div>
  );
};
