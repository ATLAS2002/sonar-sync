import { z } from "zod";

export const envSchema = z.object({
  GITHUB_APP_ID: z.coerce.number().min(1),
  GITHUB_WEBHOOK_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GITHUB_INSTALLATION_ID: z.coerce.number(),

  SONAR_TOKEN: z.string(),
  SONAR_HOST_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;
export const env = envSchema.parse(process.env);
