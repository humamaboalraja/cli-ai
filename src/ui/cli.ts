import { exec } from "child_process";
import { config } from "../config/app";
import chalk from "chalk";
import figlet from "figlet";
import { clear } from "console";
import { program } from "commander";
import { get_result } from "../api/openai";
import { CreateCompletionRequestPrompt } from "openai";
import { exit } from "process";

const banner_setup = () => {
  clear();
  console.log(
    chalk.green(
      figlet.textSync(config.cli_name, {
        whitespaceBreak: true,
        horizontalLayout: "fitted",
      })
    )
  );
};

const handle_missing_api_token = () => {
  if (
    !config.openai_api_token ||
    config.openai_api_token === null ||
    config.openai_api_token === ""
  ) {
    console.log(
      "Please set your OpenAI API Token in order to use this CLI",
      chalk.red("https://beta.openai.com/docs/api-reference/authentication \n")
    );

    exit();
  }
};

const ask = (prompt: CreateCompletionRequestPrompt) => {
  get_result(prompt)
    .then((question) => {
      clear();
      banner_setup();

      // execute MacOS's voice assistant to read the message
      // TODO - make this optional through a flag
      process.platform === "darwin"
        ? exec(`say "${question}"`, () => exit())
        : "";

      console.log(question);
    })
    .catch((err) => {
      console.log(err);
    });
};

const render_ui = () => {
  if (!program.opts().question) console.log(program.help());

  console.log("🎈⚡️ Processing request");
  const chat_mode =
    program.opts().chat === "active" ? config.openai_api_options.stop[0] : " ";
  const question = `${chat_mode} ${program.opts().question}`;
  console.log(
    `✦  ${chalk.green(chat_mode)} ${JSON.stringify(program.opts().question)}`
  );
  ask(question);
};

export { banner_setup, render_ui, handle_missing_api_token };
