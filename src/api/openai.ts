import {
  Configuration,
  CreateCompletionRequestPrompt,
  OpenAIApi,
} from "openai";
import { config } from "../config/app";
import { program } from "commander";

const openai = new OpenAIApi(
  new Configuration({ apiKey: config.openai_api_token })
);

const get_result = async (prompt: CreateCompletionRequestPrompt) => {
  const response = await openai.createCompletion({
    model: program.opts().model || config.openai_api_options.model,
    temperature:
      program.opts().temperature || config.openai_api_options.max_tokens,
    max_tokens:
      program.opts().max_tokens || config.openai_api_options.max_tokens,
    ...config.openai_api_options,
    prompt: prompt,
  });
  return response.data.choices[0].text;
};

export { get_result };
