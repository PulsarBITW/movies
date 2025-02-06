import {z} from 'zod';

import {AuthKeys, LocalStorageKeys} from '@shared/constants';
import {AuthTokensData} from '@shared/api';

export class AuthTokensStorageController {
  public static readonly tokenSchema = z.string();

  private static setField(key: AuthKeys, value: string) {
    localStorage.setItem(key, value);
  }

  private static removeField(key: AuthKeys) {
    localStorage.removeItem(key);
  }

  private static getField({key}: {key: AuthKeys}): string | null {
    const rawValue = localStorage.getItem(key);
    return rawValue;
  }

  private static getValidatedField({
    key,
    schema,
    removeOnValidationError = true,
  }: {
    key: AuthKeys;
    schema: z.ZodString;
    removeOnValidationError?: boolean;
  }): string | null {
    const parsedValue = this.getField({key});
    if (!parsedValue) return null;

    const validatedValue = schema.safeParse(parsedValue);

    if (validatedValue.success) return validatedValue.data;

    if (removeOnValidationError) this.removeField(key);
    return null;
  }

  public static get validatedAccessToken(): string | null {
    return this.getValidatedField({
      key: LocalStorageKeys.App_access_token,
      schema: this.tokenSchema,
    });
  }
  public static get validatedRefreshToken(): string | null {
    return this.getValidatedField({
      key: LocalStorageKeys.App_refresh_token,
      schema: this.tokenSchema,
    });
  }

  public static setAuthTokens({accessToken, refreshToken}: AuthTokensData): void {
    this.setField(LocalStorageKeys.App_access_token, accessToken);
    this.setField(LocalStorageKeys.App_refresh_token, refreshToken);
  }

  public static removeAuthTokens() {
    this.removeField(LocalStorageKeys.App_access_token);
    this.removeField(LocalStorageKeys.App_refresh_token);
  }
}

//
const INVALID_ACCESS_TOKEN = 'something';
const VALID_REFRESH_TOKEN = 'refresh1';

AuthTokensStorageController.setAuthTokens({
  accessToken: INVALID_ACCESS_TOKEN,
  refreshToken: VALID_REFRESH_TOKEN,
});
