import {z} from 'zod';
import {ConfigSchema} from './types';

type ValidationValuesResult<T extends ConfigSchema> = {
  [K in keyof T]: {
    value: T[K]['schema'] extends z.ZodType<infer S>
      ? S[] | null
      : T[K]['parse'] extends (value: string | null) => infer R
        ? R[] | null
        : string[] | null;
    hasValidationError: boolean;
  };
};

type validationSearchParamsResult = {
  updatedSearchParams: URLSearchParams;
  searchParamsHasBeenChanged: boolean;
};

type ReturnPrepareSearchParams<T extends ConfigSchema> = {
  validationValuesResult: ValidationValuesResult<T>;
  validationSearchParamsResult: validationSearchParamsResult;
};

export function prepareSearchParams<T extends ConfigSchema>(
  config: T,
): ReturnPrepareSearchParams<T> {
  const searchParams = new URLSearchParams(window.location.search);

  const validationValuesResult = {} as ValidationValuesResult<T>;

  let searchParamsHasBeenChanged = false;

  for (const objKey in config) {
    const {searchKey, schema, parse} = config[objKey];

    const searchParamsValues = searchParams.getAll(searchKey);

    const parsedValues: unknown[] = parse
      ? searchParamsValues.map((value) => parse(value))
      : searchParamsValues;

    if (schema) {
      const validationResults = parsedValues.map((value) => schema.safeParse(value));

      const hasValidationError = validationResults.some((result) => !result.success);
      if (hasValidationError) {
        searchParams.delete(searchKey);
        searchParamsHasBeenChanged = true;
      }
      // eslint-disable-next-line
      // @ts-ignore
      validationValuesResult[objKey] = {
        value: hasValidationError || parsedValues.length === 0 ? null : parsedValues,
        hasValidationError: hasValidationError,
      };
    } else {
      // eslint-disable-next-line
      // @ts-ignore
      validationValuesResult[objKey] = {
        value: parsedValues.length > 0 ? parsedValues : null,
        hasValidationError: false,
      };
    }
  }
  return {
    validationValuesResult,
    validationSearchParamsResult: {updatedSearchParams: searchParams, searchParamsHasBeenChanged},
  };
}
