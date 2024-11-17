import * as z from 'zod';
import { Roles, Scopes, Token } from '../../types/token';

export const tokenDTOSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(Token),
  value: z.string({
    message: 'token is required',
  }),
});

export const updateTokenSchema = z.object({
  value: z.string().optional(),
});

export const createTokenSchema = z.object({
  type: z.nativeEnum(Token),
  email: z.string(),
});

export const authenticateSchema = z.object({
  role: z.nativeEnum(Roles),
  scopes: z
    .string()
    .optional()
    .transform(scopes => (scopes ?? 'read').split(',').map(scope => scope.trim()))
    .refine(
      scopes => scopes.map(scope => scope.trim()).every(scope => Object.values(Scopes).includes(scope as Scopes)),
      'Not valid scope array string. Provide comma separated string with scopes array'
    ),
  email: z.string(),
});

export type TokenDTO = z.infer<typeof tokenDTOSchema>;
export type UpdateToken = z.infer<typeof updateTokenSchema>;
export type CreateToken = z.infer<typeof createTokenSchema>;
export type AuthenticateDTO = z.infer<typeof authenticateSchema>;
