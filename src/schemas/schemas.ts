import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Email is invalid").trim(),
  password: z
    .string()
    .min(6, { message: "Be at least 6 characters long" })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
