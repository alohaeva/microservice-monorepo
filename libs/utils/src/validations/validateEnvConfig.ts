import { fromError } from 'zod-validation-error';
import { ZodSchema } from 'zod';

export const validateEnvConfig = (schema: ZodSchema) => (config: Record<string, unknown>)=> {
  const validatedConfig = schema.safeParse(config);

  if (!validatedConfig.success) {
    const errors = fromError(validatedConfig.error);

    throw new Error(errors.toString());
  }

  return validatedConfig.data;
}
