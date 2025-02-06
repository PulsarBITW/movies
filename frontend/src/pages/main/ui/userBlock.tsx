import {useState} from 'react';
import {useUnit} from 'effector-react';

import {currentUserModel} from '@entities/currentUser';
import {Button} from '@shared/ui';
import {authenticationModel} from '@features/auth';

export const UserBlock = () => {
  const {$currentUser, $isCurrentUserLoading} = useUnit(currentUserModel);
  const {logout, login, $isAuth: isAuth} = useUnit(authenticationModel);

  const [loginValue, setLogin] = useState<string>('');
  const [passwordValue, setPassword] = useState<string>('');

  if ($isCurrentUserLoading) return <div className="text-2xl font-bold">...Loading</div>;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div>{'id ' + $currentUser?.id}</div>
        <div>{'isAuth ' + isAuth}</div>
      </div>
      <div>
        <input
          value={loginValue}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="login"
          className="border-2 border-solid border-rose-100"
        />
        <input
          value={passwordValue}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-solid border-rose-100"
        />
        <Button onClick={() => login({login: loginValue, password: passwordValue})}>login</Button>
      </div>
      <div className="flex gap-2">
        <Button onClick={logout}>logout</Button>
      </div>
    </div>
  );
};
