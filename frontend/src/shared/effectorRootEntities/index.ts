import {createDomain} from 'effector';
import {createGate} from 'effector-react';

export const rootDomain = createDomain('rootDomain');
export const RootGate = createGate('RootGate');

export const appStarted = rootDomain.createEvent('appStarted');
