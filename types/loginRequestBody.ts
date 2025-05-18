import { z } from 'zod';
export const loginRequestBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
