import {
  Configuration,
  CreateCompletionRequestPrompt,
  OpenAIApi,
} from "openai";
import { config, openai_api_options } from "../config";
import { program } from "commander";

const openai = new OpenAIApi(
  new Configuration({ apiKey: config.openai_api_token })
);

const get_result = async (prompt: CreateCompletionRequestPrompt) => {
  const response = await openai.createCompletion({
    model: program.opts().model || openai_api_options.model,
    // TODO: Add support for other options
    ...openai_api_options,
    max_tokens:
      Number(program.opts().maxTokens) || openai_api_options.max_tokens,
    prompt: prompt,
  });
  return response.data.choices[0].text;
};

export { get_result };
