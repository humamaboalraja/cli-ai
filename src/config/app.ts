import dotenv from "dotenv";

dotenv.config();

const config = {
  package_name: process.env.npm_package_name || "cli-ai",
  package_version: process.env.npm_package_version || "0.1.3",
  openai_api_token: process.env.openai_api_token,
  repo_url:
    process.env.npm_package_bugs_url ||
    "https://github.com/humamaboalraja/cli-ai/",
};

export { config };
