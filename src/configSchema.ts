import * as Joi from 'joi';

export const configSchema = Joi.object({
  PORT: Joi.number().required(),
  SWAGGER_USER: Joi.string().required(),
  SWAGGER_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  PGADMIN_DEFAULT_EMAIL: Joi.string().required(),
  PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),
})
