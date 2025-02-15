import {attach, Domain, sample, scopeBind} from 'effector';

import {appStarted, NavigationGate, rootDomain} from '@shared/config';
import {currentUserModel} from '@entities/currentUser';
import {
  invalidToken,
  AuthTokensStorageController,
  baseAuthenticationByCredentials,
  Credentials,
  baseAuthenticationByToken,
} from '@shared/api';

export function createAuthModel({domain}: {domain: Domain}) {
  const loginByCredentials = domain.createEvent<Credentials>('login');

  const loginByTokenFx = domain.createEffect({
    handler: async () => {
      const boundCurrentUserChanged = scopeBind(currentUserModel.currentUserChanged);
      const currentAccessToken = AuthTokensStorageController.validatedAccessToken;
      if (!currentAccessToken) throw new Error('loginByTokenFx failed');
      const {accessToken, refreshToken, user} = await baseAuthenticationByToken(currentAccessToken);
      boundCurrentUserChanged(user);

      AuthTokensStorageController.setAuthTokens({
        accessToken,
        refreshToken,
      });
    },
  });

  const loginByCredentialsFx = attach({
    source: NavigationGate.state,
    effect: async (navigation, credentials: Credentials) => {
      const boundCurrentUserChanged = scopeBind(currentUserModel.currentUserChanged);
      const {accessToken, refreshToken, user} = await baseAuthenticationByCredentials(credentials);
      boundCurrentUserChanged(user);

      AuthTokensStorageController.setAuthTokens({
        accessToken,
        refreshToken,
      });

      navigation.navigate('/');
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
    clock: loginByCredentials,
    target: loginByCredentialsFx,
  });

  sample({
    clock: appStarted,
    target: loginByTokenFx,
  });

  return {logout, loginByCredentials, $isAuth};
}

const authDomain = rootDomain.createDomain('authDomain');

export const authModel = createAuthModel({domain: authDomain});
