module.exports = {
  apps: [
    {
      name: "better-bedrock-web",
      script: "yarn",
      cwd: "./apps/web",
      args: "preview:prod",
      watch: false,
    },
    {
      name: "better-bedrock-api",
      script: "yarn",
      args: "preview:prod",
      cwd: "./apps/api",
      watch: false,
    },
  ],
};
