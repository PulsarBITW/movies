import {LocalStorageKeys} from '@shared/config';
import {LocalStorageValuesUnion} from '@shared/types';

export type InitLocalStorageValueParams<T extends LocalStorageValuesUnion> = {
  key: LocalStorageKeys;
  initialValue: T;
};

export const initLocalStorageValue = <T extends LocalStorageValuesUnion>({
  key,
  initialValue,
}: InitLocalStorageValueParams<T>): T => {
  const value = localStorage.getItem(key);

  if (!value) {
    localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  } else {
    return JSON.parse(value);
  }
};
