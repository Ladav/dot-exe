import { ConfigModuleOptions } from '@nestjs/config';
import * as joi from 'joi';

export type EnvironmentVars = {
  PORT: number;
  ORIGIN: string;
  DATABASE_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI: string;
};

const validationSchema = joi.object<EnvironmentVars>({
  PORT: joi.number().required(),
  ORIGIN: joi.string().required(),
  DATABASE_URL: joi.string().required(),
  GOOGLE_CLIENT_ID: joi.string().required(),
  GOOGLE_CLIENT_SECRET: joi.string().required(),
  GOOGLE_REDIRECT_URI: joi.string().required(),
});

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
  envFilePath: ['.env.development', '.env.production', '.env'],
  validationSchema,
};
