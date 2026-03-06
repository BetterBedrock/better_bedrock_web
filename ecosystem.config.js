const debug = process.env.DEBUG !== "false";
const slot = process.env.DEPLOY_SLOT || "blue";

if (debug) {
  module.exports = {
    apps: [
      {
        name: "better-bedrock-storybook-dev",
        script: "yarn",
        cwd: "./apps/web-next",
        args: "serve-storybook",
        watch: false,
      },
      {
        name: "better-bedrock-web-dev",
        script: "yarn",
        cwd: "./apps/web-next",
        args: "serve",
        watch: false,
        env: { PORT: 3002 },
      },
      {
        name: "better-bedrock-api-dev",
        script: "yarn",
        args: "serve",
        cwd: "./apps/api",
        watch: false,
        env: { PORT: 4002 },
      },
    ],
  };
} else {
  if (!["blue", "green"].includes(slot)) {
    throw new Error(
      `Invalid DEPLOY_SLOT: "${slot}". Must be "blue" or "green".`,
    );
  }

  const ports = {
    blue: { web: 3000, api: 4000 },
    green: { web: 3001, api: 4001 },
  };

  const { web: webPort, api: apiPort } = ports[slot];

  module.exports = {
    apps: [
      {
        name: `better-bedrock-web-${slot}`,
        script: "yarn",
        cwd: "./apps/web-next",
        args: "serve",
        watch: false,
        env: { PORT: webPort },
      },
      {
        name: `better-bedrock-api-${slot}`,
        script: "yarn",
        args: "serve",
        cwd: "./apps/api",
        watch: false,
        env: { PORT: apiPort },
      },
    ],
  };
}
