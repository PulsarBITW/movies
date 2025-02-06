import {Domain, sample, scopeBind} from 'effector';

import {currentUserModel} from '@entities/currentUser';
import {rootDomain} from '@shared/effectorRootEntities';
import {
  invalidToken,
  AuthTokensStorageController,
  baseAuthentication,
  Credentials,
} from '@shared/api';

export function createAuthModel({domain}: {domain: Domain}) {
  const login = domain.createEvent<Credentials>('login');

  const loginFx = domain.createEffect({
    name: 'loginFx',
    handler: async (credentials: Credentials) => {
      const boundCurrentUserChanged = scopeBind(currentUserModel.currentUserChanged);

      const {accessToken, refreshToken, user} = await baseAuthentication(credentials);

      boundCurrentUserChanged(user);

      AuthTokensStorageController.setAuthTokens({
        accessToken,
        refreshToken,
      });
    },
  });

  // const GoogleAuthorizeModel = createGoogleAuthorizeModel()
  // const MetaAuthorizeModel = createMetaAuthorizeModel()

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

  return {logout, login, $isAuth};
}

const authDomain = rootDomain.createDomain('authDomain');

export const authenticationModel = createAuthModel({domain: authDomain});
