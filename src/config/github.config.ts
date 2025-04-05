import { z } from "zod";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import type { App } from "octokit";

import { env } from "./env";

const getPrivateKey = () => {
  if (env.NODE_ENV === "production") {
    if (!env.GH_PRIVATE_KEY) {
      throw new Error(
        "GH_PRIVATE_KEY is required in production but is not provided."
      );
    }

    return env.GH_PRIVATE_KEY;
  }

  const privateKeyPath = resolve(process.cwd(), ".private-key.pem");
  return z.string().parse(readFileSync(privateKeyPath, "utf8"));
};

export const GHConfig = {
  appId: env.GH_APP_ID,
  privateKey: getPrivateKey(),
  webhooks: {
    secret: env.GH_WEBHOOK_SECRET,
  },
} satisfies AppConfig;

export type AppConfig = ConstructorParameters<typeof App>[0];

export const installationId = env.GH_INSTALLATION_ID;
