import { exec } from "child_process";
import { config, openai_api_options } from "../config";
import chalk from "chalk";
import figlet from "figlet";
import { clear } from "console";
import { program } from "commander";
import { get_result } from "../api/openai";
import { CreateCompletionRequestPrompt } from "openai";
import { exit } from "process";
import http from "node:https";

const banner_setup = () => {
  clear();
  console.log(
    chalk.bold.green(
      figlet.textSync(config.package_name.toUpperCase(), {
        whitespaceBreak: true,
        horizontalLayout: "fitted",
      })
    ),
    chalk.bold.bgGreenBright.white(` v${config.package_version} `)
  );
  divider();
};

const ask = (prompt: CreateCompletionRequestPrompt) => {
  get_result(prompt)
    .then((answer) => {
      clear();
      banner_setup();
      check_updates();

      say_voice_assistant(answer);

      console.log(
        `${chalk.bold.green("Question")}: ${program.opts().question}`
      );
      console.log(
        `${chalk.bold.hex("#FFD700")("Answer")}: ${answer.trimStart()} \n`
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

const check_updates = () => {
  const request = http.get(
    `https://registry.npmjs.org/${config.package_name}`,
    (response) => {
      let data = "";
      response.on("data", (chunk) => (data += chunk));

      response.on("end", () => {
        const latest_version = JSON.parse(data)["dist-tags"].latest;
        if (config.package_version !== latest_version) {
          divider();

          console.log(
            `✨ Update available: ${chalk.bold.red(
              config.package_version
            )} → ${chalk.bold.green(latest_version)}`
          );
          console.log(
            `↥ run: ${chalk.green(
              "yarn global upgrade cli-ai"
            )} or ${chalk.green("npm update -g cli-ai")}\n`
          );
          divider();
        }
      });
    }
  );

  request.end();
  request.on("error", (e) => {
    divider();
    console.log(`💥 checking updates failed: ${e}`);
    console.log(
      `Please report this issue on GitHub: ${chalk.red.bold(
        config.repo_url + "issues"
      )} \n`
    );
    divider();
  });
};

const divider = () => {
  console.log(
    `${chalk.gray("————————————————————————————————————————————————")} \n`
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
      chalk.red("https://beta.openai.com/account/api-keys \n")
    );

    exit();
  }
};

const render_ui = () => {
  if (!program.opts().question) console.log(program.help());

  console.log("✨ Processing request");
  const chat_mode =
    program.opts().chat === "active" ? openai_api_options.stop[0] : " ";
  const question = `${chat_mode} ${program.opts().question}`;
  console.log(
    `✦ ${chalk.green(chat_mode)} ${JSON.stringify(program.opts().question)}`
  );

  ask(question);
};

const say_voice_assistant = (answer: string) => {
  // execute MacOS's voice assistant to read the message
  process.platform === "darwin" && program.opts().voiceAssistant === "active"
    ? exec(`say "${answer}"`, () => exit())
    : "";
};

const render_cli = () => {
  banner_setup();
  handle_missing_api_token();
  render_ui();
};

export { render_cli };
