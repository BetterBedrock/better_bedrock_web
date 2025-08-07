module.exports = {
  apps: [
    {
      name: "better-bedrock-web",
      script: "yarn",
      cwd: "./apps/web",
      args: "preview",
      interpreter: "bash",
      watch: false,
    },
    {
      name: "better-bedrock-api",
      script: "yarn",
      args: "preview",
      cwd: "./apps/api",
      interpreter: "bash",
      watch: false,
    },
  ],
};
