module.exports = {
  apps: [
    {
      name: "jira_app",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
