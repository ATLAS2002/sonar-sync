import { App } from "octokit";
import {
  AppConfig,
  installationId as defaultInstallationId,
} from "../config/github.config";

export class GithubAPI {
  readonly #app;

  constructor(config: AppConfig) {
    this.#app = new App(config);
  }

  async getOctokit(installationId: number = defaultInstallationId) {
    return await this.#app.getInstallationOctokit(installationId);
  }

  get webhooks() {
    return this.#app.webhooks;
  }
}
