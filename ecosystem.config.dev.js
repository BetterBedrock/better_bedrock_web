module.exports = {
  apps: [
    {
      name: "better-bedrock-web-dev",
      script: "yarn",
      cwd: "./apps/web",
      args: "preview:dev",
      watch: true,
    },
    {
      name: "better-bedrock-api-dev",
      script: "yarn",
      cwd: "./apps/api",
      args: "preview:dev",
      watch: true,
    },
  ],
};
