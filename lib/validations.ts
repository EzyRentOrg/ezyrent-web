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

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter a valid email address.'
    })
    .email(),
  password: z.string({
    required_error: 'Please enter a password.'
  }),
  rememberMe: z.boolean().default(false)
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter a valid email address.'
    })
    .email()
});

export const resetPasswordSchema = z
  .object({
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

  export const contactSchema = z.object({
    name: z.string({
      required_error: 'Please enter your full name'
    }),
    email: z
      .string({
        required_error: 'Please enter a valid email address.'
      })
      .email(),
    message: z.string({ required_error: 'Please enter a message' })
  } )
