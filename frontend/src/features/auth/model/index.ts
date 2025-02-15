import {attach, Domain, sample, scopeBind} from 'effector';

import {User} from '@shared/types/currentUser';
import {appStarted, NavigationGate, rootDomain} from '@shared/config';
import {currentUserModel} from '@entities/currentUser';
import {
  invalidToken,
  AuthTokensStorageController,
  baseAuthentication,
  Credentials,
} from '@shared/api';

export function createAuthModel({domain}: {domain: Domain}) {
  const login = domain.createEvent<Credentials>('login');

  const loginFx = attach({
    source: NavigationGate.state,
    effect: async (navigation, credentials: Credentials) => {
      const boundCurrentUserChanged = scopeBind(currentUserModel.currentUserChanged);

      const {accessToken, refreshToken, user} = await baseAuthentication(credentials);

      boundCurrentUserChanged(user as User);

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
    clock: login,
    target: loginFx,
  });

  sample({
    clock: appStarted,
    filter: () => !!AuthTokensStorageController.validatedAccessToken,
    fn: (): Credentials => ({login: 'test', password: 'test'}),
    target: loginFx,
  });

  return {logout, login, $isAuth};
}

const authDomain = rootDomain.createDomain('authDomain');

export const authModel = createAuthModel({domain: authDomain});
