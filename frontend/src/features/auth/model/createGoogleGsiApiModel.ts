import {EventCallable, sample, scopeBind} from 'effector';

import {LoginByGoogleCredentials} from '@shared/api';
import {ENV, rootDomain} from '@shared/config';

const GOOGLE_GSI_CLIENT_URL = 'https://accounts.google.com/gsi/client';

export function createGoogleGsiApiModel(eventOnAuth: EventCallable<LoginByGoogleCredentials>) {
  const domain = rootDomain.createDomain('GoogleGsiApiDomain');

  const gsiGoogleLoaded = domain.createEvent();
  const $isGsiGoogleApiLoaded = domain.createStore<boolean>(false).on(gsiGoogleLoaded, () => true);

  const initGsiAccountIdFx = domain.createEffect({
    name: 'initGsiAccountIdFx',
    handler: () => {
      const gsiApi = window.google;
      if (!gsiApi || !ENV.GOOGLE_CLIENT_ID) throw new Error('error');

      const boundEventOnAuth = scopeBind(eventOnAuth);

      gsiApi.accounts.id.initialize({
        client_id: ENV.GOOGLE_CLIENT_ID,
        callback: (response) => boundEventOnAuth({googleToken: response.credential}),
      });
    },
  });

  const loadGsiGoogleApiFx = domain.createEffect({
    name: 'loadGsiGoogleApiFx',
    handler: (nonce?: string) => {
      const boundInitGsiAccountIdFx = scopeBind(initGsiAccountIdFx);
      const boundGsiGoogleLoaded = scopeBind(gsiGoogleLoaded);

      const gsiScriptTag = document.createElement('script');
      gsiScriptTag.src = GOOGLE_GSI_CLIENT_URL;
      gsiScriptTag.async = true;
      gsiScriptTag.defer = true;
      if (nonce) gsiScriptTag.nonce = nonce;

      gsiScriptTag.onload = () => {
        boundInitGsiAccountIdFx();
        boundGsiGoogleLoaded();
      };

      gsiScriptTag.onerror = () => {
        console.error('gsiScriptTag error');
      };

      document.body.appendChild(gsiScriptTag);
    },
  });

  //   #TODO ))
  const clickGsiButtonFx = domain.createEffect({
    name: 'clickGsiButtonFx',
    handler: () => {
      const gsiApi = window.google;

      if (gsiApi) {
        const holder = document.createElement('div');
        gsiApi.accounts.id.renderButton(holder, {type: 'icon'});
        const gsiButton = holder.querySelector('[role="button"]');
        if (gsiButton instanceof HTMLElement) gsiButton.click();
      }
    },
  });

  const gsiButtonCliked = domain.createEvent();
  //

  sample({
    clock: gsiButtonCliked,
    target: clickGsiButtonFx,
  });

  const showGsiPromptFx = domain.createEffect({
    name: 'showGsiPromptFx',
    handler: () => {
      const gsiApi = window.google;
      if (gsiApi) gsiApi.accounts.id.prompt();
    },
  });

  return {$isGsiGoogleApiLoaded, loadGsiGoogleApiFx, showGsiPromptFx, gsiButtonCliked};
}
