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
    .email()
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
});

//  property form validation
export const propertyFormSchema = z.object({
  address: z
    .string()
    .min(1, 'Address is required')
    .max(150, 'Address must be less than 150 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1500, 'Description must be less than 1500 characters'),
  price: z
  .string()
  .min(1, 'Price is required')
  .refine((val) => !isNaN(Number(val)), 'Price must be a valid number')
  .refine((val) => !val.startsWith('0'), 'Price cannot start with 0')
  .refine((val) => Number(val) !== 0, 'Price cannot be 0'),
  duration: z.number({
    required_error: 'Please select a duration'
  }),
  primaryFile: z.object({
    name: z.string().min(1, 'Main image is required'),
    data: z.string().min(1, 'Main image data is required')
  }),
  otherFiles: z
    .array(
      z.object({
        name: z.string(),
        data: z.string()
      })
    )
    .min(1, 'At least one image is required for other images')
    .max(7, 'Maximum 6 images allowed'),
  beds: z.enum(['1', '2', '3', '4', '5+ '], {
    required_error: 'Please select number of beds'
  }),
  baths: z.enum(['1', '2', '3', '4', '5+'], {
    required_error: 'Please select number of baths'
  }),
  amenities: z.array(
    z.enum([
      'Gym',
      'POP Ceiling',
      'Water Treatment',
      'Security',
      'Parking Space',
      'Spacious Compound',
      '24/7 Electricity',
      'Supermarket Nearby',
      'Swimming Pool',
      'Fast Internet',
      'Restaurants Nearby',
      'Free WiFi'
    ])
  ),
  error: z.string().nullable()
});
