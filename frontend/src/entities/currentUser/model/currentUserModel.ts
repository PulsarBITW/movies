import {Domain} from 'effector';
import {debug} from 'patronum';

import {rootDomain} from '@shared/config';
import {User} from '@shared/types/currentUser';

type CreateCurrentUserModelParams = {
  domain: Domain;
};

export function createCurrentUserModel({domain}: CreateCurrentUserModelParams) {
  const fetchCurrentUserFx = domain.createEffect({
    name: '',
    handler: async (): Promise<User> => {
      const user: User = {
        id: '1ssdw-qdqwQS',
      };
      return await new Promise((res) => setTimeout(() => res(user), 500));
    },
  });
  const currentUserChanged = domain.createEvent<User>('currentUserChanged');
  const resetCurrentUser = domain.createEvent('resetCurrentUser');

  const $currentUser = domain.createStore<User | null>(null);

  const $isCurrentUserLoading = fetchCurrentUserFx.pending;

  $currentUser
    .on(fetchCurrentUserFx.doneData, (_, updatedCurrentUser) => updatedCurrentUser)
    .on(currentUserChanged, (_, updatedCurrentUser) => updatedCurrentUser)
    .reset(resetCurrentUser);

  debug(currentUserChanged);

  return {
    $currentUser,
    $isCurrentUserLoading,
    currentUserChanged,
    fetchCurrentUserFx,
    resetCurrentUser,
  };
}

const currentUserDomain = rootDomain.createDomain('currentUserDomain');
export const currentUserModel = createCurrentUserModel({domain: currentUserDomain});
