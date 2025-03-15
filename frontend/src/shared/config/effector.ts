import {debug} from 'patronum';
import {createDomain, fork} from 'effector';
import {createGate} from 'effector-react';
import {NavigateFunction, SetURLSearchParams} from 'react-router-dom';
import {ENV} from './env';

export {ENV} from './env';
export * from './localStorage';
export * from './theme';

export type NavigationGateProps = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  navigate: NavigateFunction;
};

export const appScope = fork();

export const rootDomain = createDomain('rootDomain');
export const RootGate = createGate('RootGate');

export const NavigationGate = createGate<NavigationGateProps>('NavigationGate');

export const appStarted = rootDomain.createEvent('appStarted');
export const globalReset = rootDomain.createEvent('globalReset');

if (ENV.IS_DEV) {
  debug.registerScope(appScope, {name: 'appScope'});
}
