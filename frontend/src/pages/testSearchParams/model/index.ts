import {attach, sample} from 'effector';
import {createGate} from 'effector-react';
import {SetURLSearchParams} from 'react-router-dom';
import {spread} from 'patronum';

import {rootDomain} from '@shared/config';
import {searchParamsFactory} from '@shared/lib/searchParams';
import {
  GenderEnum,
  PickedDateType,
  RegTypeEnum,
  SearchUserType,
  testSearchParamsPageConfig,
} from './searchParams';

function createTestSearchParamsModel() {
  const testSearchParamsDomain = rootDomain.createDomain('testSearchParamsDomain');
  const TestSearchParamsPageGate = createGate<{setUrlSearchParams: SetURLSearchParams}>();

  const {getSearchParamsValuesFx} = searchParamsFactory({
    domain: testSearchParamsDomain,
    config: testSearchParamsPageConfig,
  });

  const $searchUser = testSearchParamsDomain.createStore<SearchUserType | null>(null);
  const searchUserChanged = testSearchParamsDomain.createEvent<SearchUserType | null>();
  $searchUser.on(searchUserChanged, (_, payload) => payload);

  const $regType = testSearchParamsDomain.createStore<RegTypeEnum | null>(null);
  const regTypeChanged = testSearchParamsDomain.createEvent<RegTypeEnum | null>();
  $regType.on(regTypeChanged, (_, payload) => payload);

  const $genderList = testSearchParamsDomain.createStore<GenderEnum[] | null>(null);
  const genderListChanged = testSearchParamsDomain.createEvent<GenderEnum[] | null>();
  $genderList.on(genderListChanged, (_, payload) => payload);

  const $pickedDate = testSearchParamsDomain.createStore<PickedDateType | null>(null);
  const pickedDateChanged = testSearchParamsDomain.createEvent<PickedDateType | null>();
  $pickedDate.on(pickedDateChanged, (_, payload) => payload);

  const updatedSearchParamsFx = attach({
    // or window.history.replaceState(null, '', '?' + searchParams.toString());
    source: TestSearchParamsPageGate.state,
    effect: (source, updatedUrlSearchParams: URLSearchParams) => {
      source.setUrlSearchParams(updatedUrlSearchParams);
    },
  });

  sample({
    clock: TestSearchParamsPageGate.open,
    target: getSearchParamsValuesFx,
  });

  sample({
    clock: getSearchParamsValuesFx.doneData,
    fn: ({validationValuesResult}) => {
      return {
        searchUser: validationValuesResult.searchUser.value?.[0] ?? null,
        regType: validationValuesResult.regType.value?.[0] ?? null,
        genderList: validationValuesResult.gender.value ?? null,
        pickedDate: validationValuesResult.pickedDate.value?.[0] ?? null,
      };
    },
    target: spread({
      searchUser: searchUserChanged,
      regType: regTypeChanged,
      genderList: genderListChanged,
      pickedDate: pickedDateChanged,
    }),
  });

  // clear invalid searchParams

  //   sample({
  //     clock: getSearchParamsValuesFx.doneData,
  //     filter: ({validationSearchParamsResult}) =>
  //       validationSearchParamsResult.searchParamsHasBeenChanged,
  //     fn: ({validationSearchParamsResult}) => validationSearchParamsResult.updatedSearchParams,
  //     target: updatedSearchParamsFx,
  //   });

  return {TestSearchParamsPageGate, $searchUser, $pickedDate, $regType, $genderList};
}

export const testSearchParamsModel = createTestSearchParamsModel();
