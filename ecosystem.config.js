const slot = process.env.DEPLOY_SLOT || "blue";
const debug = process.env.DEBUG === "true";

if (!["blue", "green"].includes(slot)) {
  throw new Error(`Invalid DEPLOY_SLOT: "${slot}". Must be "blue" or "green".`);
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
      args: debug ? "serve-dev" : "serve",
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
