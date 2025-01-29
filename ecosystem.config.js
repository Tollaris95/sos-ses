module.exports = {
  apps: [
    {
      name: "sos-ses",
      script: "npm",
      args: "start",
      cwd: "/home/sos-ses/source",
      interpreter: "/usr/bin/node",
      env_production: {
        PORT: 3000,
        NODE_ENV: "production",
      },
      autorestart: true,
      max_memory_restart: "1G",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      merge_logs: true,
      log_file: "./logs/combined.log",
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "163.172.160.241",
      ref: "origin/master",
      repo: "git@github.com:Tollaris95/sos-ses.git",
      path: "/home/sos-ses",
      "pre-deploy-local": "",
      "post-deploy": "npm install && npm run build && pm2 startOrReload ecosystem.config.js",
      "pre-setup": "",
    },
  },
};
