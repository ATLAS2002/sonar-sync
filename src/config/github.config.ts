import { z } from "zod";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import type { App } from "octokit";

import { env } from "./env";

const privateKeyPath = resolve(process.cwd(), ".private-key.pem");
const privateKey = z.string().parse(readFileSync(privateKeyPath, "utf8"));

export const GHConfig = {
  appId: env.GITHUB_APP_ID,
  privateKey,
  webhooks: {
    secret: env.GITHUB_WEBHOOK_SECRET,
  },
} satisfies AppConfig;

export type AppConfig = ConstructorParameters<typeof App>[0];

export const installationId = env.GITHUB_INSTALLATION_ID;
