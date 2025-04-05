import { Hono } from "hono";
import { GithubAPI } from "./core/github";
import { GHConfig } from "./config/github.config";

const srv = new Hono();

const app = new GithubAPI(GHConfig);

app.webhooks.on("issues.opened", async ({ payload }) => {
  const { rest } = await app.getOctokit();

  const issueNumber = payload.issue.number;
  const owner = payload.repository.owner.login;
  const repo = payload.repository.name;

  const { data } = await rest.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body: "Thanks for opening this issue! We'll get back to you soon.",
  });

  return data;
});

srv.get("/", async (c) => {
  const { rest } = await app.getOctokit();

  await rest.issues.create({
    owner: "ATLAS2002",
    repo: "gh_sonarqube_integration",
    title: "Hello world!!!",
    body: "This is a test issue created by the GitHub App.",
  });

  return c.text("Hello from Hono!");
});

srv.post("/", async (c) => {
  try {
    const payload = await c.req.json();
    const signature = c.req.header("x-hub-signature-256");
    const id = c.req.header("x-github-delivery");
    const event = c.req.header("x-github-event");

    if (!signature || !id || !event) {
      return c.json({ error: "Missing required headers" }, 400);
    }

    await app.webhooks.verifyAndReceive({
      id,
      name: event,
      payload: JSON.stringify(payload),
      signature: signature,
    });

    return c.json({ success: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return c.json({ error: "Failed to process webhook" }, 500);
  }
});

export default srv;
