module.exports = {
  apps: [
    {
      name: "better-bedrock-web",
      script: "yarn",
      cwd: "./apps/web-next",
      args: "preview",
      watch: false,
    },
    {
      name: "better-bedrock-api",
      script: "yarn",
      args: "preview",
      cwd: "./apps/api",
      watch: false,
    },
    {
      name: "better-bedrock-web-dev",
      script: "yarn",
      cwd: "./apps/web-next",
      args: "preview",
      watch: false,
    },
    {
      name: "better-bedrock-api-dev",
      script: "yarn",
      cwd: "./apps/api",
      args: "preview",
      watch: false,
    },
  ],
};
