import {useSearchParams} from 'react-router-dom';
import {useGate, useUnit} from 'effector-react';

import {testSearchParamsModel} from '../model';
import {Papper} from '@shared/ui';

export const TestSearchParamsPage = () => {
  const urlSearchParamsController = useSearchParams();

  useGate(testSearchParamsModel.TestSearchParamsPageGate, {
    setUrlSearchParams: urlSearchParamsController[1],
  });

  const {searchUser, regType, pickedDate, genderList} = useUnit({
    searchUser: testSearchParamsModel.$searchUser,
    regType: testSearchParamsModel.$regType,
    pickedDate: testSearchParamsModel.$pickedDate,
    genderList: testSearchParamsModel.$genderList,
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-text-primary">test-search-params</h1>
      <div className="flex flex-col gap-4">
        <Papper>
          <h2 className="text-xl font-bold text-text-primary">searchUser</h2>
          <div>{`name = ${searchUser?.name}`}</div>
          <div>{`login = ${searchUser?.login}`}</div>
        </Papper>
        <Papper>
          <h2 className="text-xl font-bold text-text-primary">regType</h2>
          <div>{`regType = ${regType}`}</div>
        </Papper>
        <Papper>
          <h2 className="text-xl font-bold text-text-primary">pickedDate</h2>
          <div>{`pickedDate = ${pickedDate}`}</div>
        </Papper>
        <Papper>
          <h2 className="text-xl font-bold text-text-primary">gender list</h2>
          {genderList && genderList.length > 0 ? (
            <div className="flex flex-col gap-2">
              {genderList.map((gender, index) => (
                <div key={index}>{`gender = ${gender}`}</div>
              ))}
            </div>
          ) : (
            <div> gender = null</div>
          )}
        </Papper>
      </div>
    </div>
  );
};
