const slot = process.env.DEPLOY_SLOT || "blue";
const debug = process.env.DEBUG || true;

const ports = {
  blueDev: { web: 3100, api: 4100 },
  greenDev: { web: 3101, api: 4101 },
  blue: { web: 3000, api: 4000 },
  green: { web: 3001, api: 4001 },
};

const { web: webPort, api: apiPort } = ports[slot + (debug ? "Dev" : "")];

module.exports = {
  apps: [
    {
      name: `better-bedrock-web-${debug ? "dev" : "" + slot}`,
      script: "yarn",
      cwd: "./apps/web-next",
      args: "serve",
      watch: false,
      env: { PORT: webPort },
    },
    {
      name: `better-bedrock-api-${debug ? "dev" : "" + slot}`,
      script: "yarn",
      args: "serve",
      cwd: "./apps/api",
      watch: false,
      env: { PORT: apiPort },
    },
  ],
};