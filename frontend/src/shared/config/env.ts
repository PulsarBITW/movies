const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const ENV = {
  NODE_ENV,
  IS_DEV,
  IS_PROD,
  GOOGLE_CLIENT_ID,
} as const;
