import { z } from 'zod';

export const ProfileFormSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'The username must be 4 characters or more' })
    .max(10, { message: 'The username must be 10 characters or less' })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'The username must contain only letters, numbers and underscore (_)'
    ),
  email: z.string().email({
    message: 'Invalid email. Please enter a valid email address',
  }),
  isAdmin: z.boolean(),
  createdAt: z
    .string()
    .nonempty({ message: 'Invalid data. Please enter a valid date' }),
});
