import { Guard } from "#/core/domain/value-objects/utils/guard";
import assert from "node:assert";

function validateEnumEnvironment<T extends object>(
  value: string,
  enumParameter: T,
): void {
  const enumAsArray = Object.values(enumParameter);
  const isValid = enumAsArray.includes(value);
  assert(
    isValid,
    `Invalid environment variable ${value}, does not belong to enum group. Valid values: ${enumAsArray.join(
      ",",
    )}`,
  );
}

export function getEnvOrThrow<T extends object>(
  envName: string,
  enumParameter?: T,
): string {
  const env = process.env[envName];
  assert(env, `Missing environment variable ${envName}`);

  if (!Guard.isEmpty(enumParameter)) {
    validateEnumEnvironment(env, enumParameter);
  }

  return env;
}

export function getEnvOrDefault<T extends object>(
  envName: string,
  defaultValue: string,
  enumParameter?: T,
): string {
  const env = process.env[envName] ?? defaultValue;

  if (!Guard.isEmpty(enumParameter)) {
    validateEnumEnvironment(env, enumParameter);
  }

  return env;
}

export const DATABASE_URI = getEnvOrThrow("DATABASE_URI");

// Google Calendar
export const GOOGLE_CLIENT_ID = getEnvOrThrow("GOOGLE_CLIENT_ID");
export const GOOGLE_CLIENT_SECRET = getEnvOrThrow("GOOGLE_CLIENT_SECRET");
export const GOOGLE_REDIRECT_URI = getEnvOrThrow("GOOGLE_REDIRECT_URI");