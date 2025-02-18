import {z} from 'zod';

import {ConfigSchema} from '@shared/lib/searchParams/types';
import {safeDeserializeJson} from '@shared/lib/json';

export enum RegTypeEnum {
  unknown = 'unknown',
  ssh = 'ssh',
  credentials = 'credentials',
}

export enum GenderEnum {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  NonBinary = 'nonBinary',
  PreferNotToSay = 'preferNotToSay',
}

const searchUserSchema = z.object({
  name: z.string().min(0),
  login: z.string().min(4),
});

const pickedDateSchema = z.date();
const genderSchema = z.nativeEnum(GenderEnum);
const regTypeSchema = z.nativeEnum(RegTypeEnum);

export type SearchUserType = z.infer<typeof searchUserSchema>;
export type PickedDateType = z.infer<typeof pickedDateSchema>;

const SearchParamsKeys = {
  pickedDate: 'pickedDate',
  regType: 'regType',
  gender: 'gender',
  searchUser: 'searchUser',
} as const;

export const testSearchParamsPageConfig = {
  regType: {
    searchKey: SearchParamsKeys.regType,
    schema: regTypeSchema,
  },
  gender: {
    searchKey: SearchParamsKeys.gender,
    schema: genderSchema,
  },
  pickedDate: {
    searchKey: SearchParamsKeys.pickedDate,
    schema: pickedDateSchema,
    parse: (value: string | null) => (value ? new Date(value) : null),
  },
  searchUser: {
    searchKey: SearchParamsKeys.searchUser,
    schema: searchUserSchema,
    parse: (value: string | null) => {
      if (value !== null) {
        return safeDeserializeJson(value, null);
      } else {
        return value;
      }
    },
  },
} as const satisfies ConfigSchema; // for autocompletion and suggestions when writing the object

export const initialSearchParamsForTestPage = () => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.append(SearchParamsKeys.gender, GenderEnum.Female);
  searchParams.append(SearchParamsKeys.gender, GenderEnum.Male);
  searchParams.append(SearchParamsKeys.gender, GenderEnum.Other);

  searchParams.append(SearchParamsKeys.regType, RegTypeEnum.ssh);

  searchParams.append(SearchParamsKeys.pickedDate, '2025-12-12');

  searchParams.append(
    SearchParamsKeys.searchUser,
    JSON.stringify({name: 'Bob', login: 'loginator2000'}),
  );

  return searchParams.toString();
};
