import fetch from "node-fetch";

export interface SonarQubeConfig {
  url: string;
  token: string;
}

export class SonarQubeAPI {
  private baseUrl: string;
  private token: string;

  constructor(config: SonarQubeConfig) {
    this.baseUrl = config.url.endsWith("/") ? config.url : `${config.url}/`;
    this.token = config.token;
  }

  private getAuthHeaders() {
    const auth = Buffer.from(`${this.token}:`).toString("base64");
    return {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    };
  }

  async getProjects() {
    const response = await fetch(`${this.baseUrl}api/projects/search`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to get projects: ${response.statusText}`);
    }

    return await response.json();
  }

  async getProjectIssues(projectKey: string) {
    const response = await fetch(
      `${this.baseUrl}api/issues/search?componentKeys=${projectKey}`,
      {
        method: "GET",
        headers: this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get project issues: ${response.statusText}`);
    }

    return await response.json();
  }

  async createWebhook(name: string, url: string, secret?: string) {
    const response = await fetch(`${this.baseUrl}api/webhooks/create`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        name,
        url,
        secret,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create webhook: ${response.statusText}`);
    }

    return await response.json();
  }

  async getQualityGate(projectKey: string) {
    const response = await fetch(
      `${this.baseUrl}api/qualitygates/project_status?projectKey=${projectKey}`,
      {
        method: "GET",
        headers: this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to get quality gate status: ${response.statusText}`
      );
    }

    return await response.json();
  }
}
