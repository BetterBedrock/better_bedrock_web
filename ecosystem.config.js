module.exports = {
  apps: [
    {
      name: "better-bedrock-web",
      script: "yarn",
      cwd: "./apps/web-next",
      args: "serve",
      watch: false,
    },
    {
      name: "better-bedrock-api",
      script: "yarn",
      args: "serve",
      cwd: "./apps/api",
      watch: false,
    },
    {
      name: "better-bedrock-web-dev",
      script: "yarn",
      cwd: "./apps/web-next",
      args: "serve-dev",
      watch: false,
    },
    {
      name: "better-bedrock-api-dev",
      script: "yarn",
      cwd: "./apps/api",
      args: "serve",
      watch: false,
    },
  ],
};
