module.exports = {
  apps: [
    {
      name: "zentyping_hosting_dev_mode",
      script: "index.ts",
      interpreter: "bun",  
      watch: true,       
      ignore_watch: ["node_modules", "logs"], // 監視除外フォルダ
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};