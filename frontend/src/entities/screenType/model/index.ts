import {Domain, sample, scopeBind} from 'effector';

import {breakPoints, ScreenTypeEnum} from '@shared/config';
import {appStarted, rootDomain} from '@shared/config';

const createScreenTypeModel = (domain: Domain) => {
  const mobileQuery = window.matchMedia(`(max-width: ${breakPoints.mobile}px)`);
  const tabletQuery = window.matchMedia(`(max-width: ${breakPoints.tablet}px)`);

  const getScreenType = () => {
    if (mobileQuery.matches) return ScreenTypeEnum.mobile;
    else if (tabletQuery.matches) return ScreenTypeEnum.tablet;
    else return ScreenTypeEnum.desktop;
  };

  const screenTypeChanged = domain.createEvent<ScreenTypeEnum>('screenTypeChanged');

  const subscribeFx = domain.createEffect(() => {
    const boundScreenTypeChanged = scopeBind(screenTypeChanged);
    const updateScreenType = () => boundScreenTypeChanged(getScreenType());

    mobileQuery.addEventListener('change', updateScreenType);
    tabletQuery.addEventListener('change', updateScreenType);
  });

  const $screenType = domain.createStore<ScreenTypeEnum>(getScreenType());

  sample({clock: appStarted, target: subscribeFx});

  sample({clock: screenTypeChanged, target: $screenType});

  return {$screenType, screenTypeChanged};
};

const screenTypeDomain = rootDomain.createDomain('screenTypeDomain');
export const {$screenType, screenTypeChanged} = createScreenTypeModel(screenTypeDomain);
