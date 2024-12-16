import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z
      .string({
        required_error: 'Please enter a valid email address.'
      })
      .email(),
    password: z.string({
      required_error: 'Please enter a password.'
    }),
    confirmPassword: z.string({
      required_error: 'Please confirm your password.'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match.'
  });
