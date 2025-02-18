import {attach, Domain, sample, scopeBind} from 'effector';

import {appStarted, NavigationGate, rootDomain} from '@shared/config';
import {currentUserModel} from '@entities/currentUser';
import {
  invalidToken,
  AuthTokensStorageController,
  baseAuthenticationByCredentials,
  Credentials,
  baseAuthenticationByToken,
  LoginByGoogleCredentials,
  baseAuthenticationByGoogle,
} from '@shared/api';
import {createGoogleGsiApiModel} from './createGoogleGsiApiModel';

export function createAuthModel({domain}: {domain: Domain}) {
  const loginByCredentials = domain.createEvent<Credentials>('loginByCredentials');
  const loginByGoogle = domain.createEvent<LoginByGoogleCredentials>('loginByGoogle');

  const logout = domain.createEvent('logout');
  const logoutFxTriggers = [invalidToken, logout];

  const $isAuth = currentUserModel.$currentUser.map<boolean>((currentUser) => Boolean(currentUser));

  const {$isGsiGoogleApiLoaded, loadGsiGoogleApiFx, gsiButtonCliked} =
    createGoogleGsiApiModel(loginByGoogle);

  const loginByTokenFx = domain.createEffect({
    handler: async () => {
      const boundCurrentUserChanged = scopeBind(currentUserModel.currentUserChanged);
      const currentRefreshToken = AuthTokensStorageController.validatedRefreshToken;
      if (!currentRefreshToken) throw new Error('loginByTokenFx failed');
      const {accessToken, refreshToken, user} =
        await baseAuthenticationByToken(currentRefreshToken);
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

  const loginByGoogleFx = attach({
    source: NavigationGate.state,
    effect: async (navigation, credentials: LoginByGoogleCredentials) => {
      const boundCurrentUserChanged = scopeBind(currentUserModel.currentUserChanged);
      const {accessToken, refreshToken, user} = await baseAuthenticationByGoogle(
        credentials.googleToken,
      );
      boundCurrentUserChanged(user);

      AuthTokensStorageController.setAuthTokens({
        accessToken,
        refreshToken,
      });

      navigation.navigate('/');
    },
  });

  const logoutFx = domain.createEffect({
    name: 'logoutFx',
    handler: () => {
      currentUserModel.resetCurrentUser();
      AuthTokensStorageController.removeAuthTokens();
    },
  });

  sample({
    clock: appStarted,
    target: [loginByTokenFx, loadGsiGoogleApiFx],
  });

  sample({
    clock: logoutFxTriggers,
    target: logoutFx,
  });

  sample({
    clock: loginByCredentials,
    target: loginByCredentialsFx,
  });

  sample({
    clock: loginByGoogle,
    target: loginByGoogleFx,
  });

  return {
    logout,
    loginByCredentials,
    loginByGoogle,
    $isAuth,
    $isGsiGoogleApiLoaded,
    gsiButtonCliked,
  };
}

const authDomain = rootDomain.createDomain('authDomain');

export const authModel = createAuthModel({domain: authDomain});
