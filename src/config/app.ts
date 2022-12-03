import dotenv from "dotenv";

dotenv.config();

const config = {
  cli_name: process.env.cli_name || "CLI-AI",
  app_version: process.env.npm_package_version,
  openai_api_token: process.env.openai_api_token,
  openai_api_options: {
    model: "text-davinci-003",
    temperature: 0.9,
    max_tokens: 300,
    top_p: 1,
    best_of: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: [" Human:", " AI:"],
  },
};

export { config };
