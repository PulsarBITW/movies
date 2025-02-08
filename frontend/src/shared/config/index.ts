import {debug} from 'patronum';
import {createDomain, fork} from 'effector';
import {createGate} from 'effector-react';

export const appScope = fork();

export const rootDomain = createDomain('rootDomain');
export const RootGate = createGate('RootGate');

export const appStarted = rootDomain.createEvent('appStarted');
export const globalReset = rootDomain.createEvent('globalReset');

if (process.env.NODE_ENV === 'development') {
  debug.registerScope(appScope, {name: 'appScope'});
}
