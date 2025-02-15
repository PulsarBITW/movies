import {useGate} from 'effector-react';
import {useNavigate, useSearchParams} from 'react-router-dom';

import {NavigationGate} from '@shared/config';

export const NavigationConnecter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useGate(NavigationGate, {searchParams, setSearchParams, navigate});

  return null;
};
