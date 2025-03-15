import {z} from 'zod';

export type ConfigSchema = {
  [objKey: string]: {
    searchKey: string;
    schema?: z.ZodTypeAny;
    parse?: (searchParamsValue: string | null) => unknown;
  };
};
