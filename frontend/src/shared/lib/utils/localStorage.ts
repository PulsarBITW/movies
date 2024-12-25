import {LocalStorageKeys} from '@shared/constants/localStorage';

export type InitLocalStorageValueParams<T> = {
  key: LocalStorageKeys;
  initialValue: T;
};

export const initLocalStorageValue = <T>({
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
