import 'dotenv/config';

type ApiEnvironment = 'dev' | 'stage' | 'production';

const baseUrls: Record<ApiEnvironment, string | undefined> = {
  dev: process.env.BASE_URL_DEV,
  stage: process.env.BASE_URL_STAGE,
  production: process.env.BASE_URL_PRODUCTION,
};

const env = process.env.API_ENV || 'stage';

if (!Object.hasOwn(baseUrls, env)) {
  throw new Error(`Invalid API_ENV: "${env}"`);
}

const baseURL = baseUrls[env as ApiEnvironment];

if (!baseURL) {
  throw new Error(`Missing base URL for environment: ${env}`);
}

export const environmentConfig = {
  env: env as ApiEnvironment,
  baseURL,
} as const;