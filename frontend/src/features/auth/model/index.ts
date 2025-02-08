import {Domain, sample, scopeBind} from 'effector';

import {User} from '@shared/types/currentUser';
import {appStarted, rootDomain} from '@shared/effectorRootEntities';
import {currentUserModel} from '@entities/currentUser';
import {
  invalidToken,
  AuthTokensStorageController,
  baseAuthentication,
  Credentials,
} from '@shared/api';

export function createAuthModel({domain}: {domain: Domain}) {
  const login = domain.createEvent<{credentials: Credentials; redirect?: () => void}>('login');

  const loginFx = domain.createEffect({
    name: 'loginFx',
    handler: async ({credentials, redirect}: {credentials: Credentials; redirect?: () => void}) => {
      const boundCurrentUserChanged = scopeBind(currentUserModel.currentUserChanged);

      const {accessToken, refreshToken, user} = await baseAuthentication(credentials);

      boundCurrentUserChanged(user as User);

      AuthTokensStorageController.setAuthTokens({
        accessToken,
        refreshToken,
      });

      redirect?.();
    },
  });

  const $isAuth = currentUserModel.$currentUser.map<boolean>((currentUser) => Boolean(currentUser));

  const logout = domain.createEvent('logout');

  const logoutFx = domain.createEffect({
    name: 'logoutFx',
    handler: () => {
      currentUserModel.resetCurrentUser();
      AuthTokensStorageController.removeAuthTokens();
    },
  });

  const logoutFxTriggers = [invalidToken, logout];

  sample({
    clock: logoutFxTriggers,
    target: logoutFx,
  });

  sample({
    clock: login,
    target: loginFx,
  });

  sample({
    clock: appStarted,
    filter: () => !!AuthTokensStorageController.validatedAccessToken,
    fn: () => ({credentials: {login: 'test', password: 'test'}}),
    target: loginFx,
  });

  return {logout, login, $isAuth};
}

const authDomain = rootDomain.createDomain('authDomain');

export const authModel = createAuthModel({domain: authDomain});
