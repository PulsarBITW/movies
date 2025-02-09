import {Domain} from 'effector';

import {ConfigSchema} from './types';
import {prepareSearchParams} from './prepareSearchParams';

type SearchParamsFactoryParams<T extends ConfigSchema> = {
  config: T;
  domain: Domain;
};

export const searchParamsFactory = <T extends ConfigSchema>({
  config,
  domain,
}: SearchParamsFactoryParams<T>) => {
  const getSearchParamsValuesFx = domain.createEffect({
    name: 'getSearchParamsValuesFx',
    handler: () => prepareSearchParams(config),
  });

  return {getSearchParamsValuesFx};
};
