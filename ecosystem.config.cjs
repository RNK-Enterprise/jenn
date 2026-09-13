// Deployed as-is to the VPS (~/jenn-site/ecosystem.config.cjs) and run via pm2,
// which the box already manages under systemd (pm2-rnk.service, `pm2 startup` + `pm2 save`).
module.exports = {
  apps: [
    {
      name: "jenn-site",
      script: "node_modules/.bin/next",
      args: "start -p 4001",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: "4001",
      },
      error_file: "/home/rnk/.pm2/logs/jenn-site-error.log",
      out_file: "/home/rnk/.pm2/logs/jenn-site-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
    },
  ],
};
