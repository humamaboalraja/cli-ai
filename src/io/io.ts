import { program } from "commander";
import { config } from "../config";
import { Cli } from "./cli/cli";

const cli: Cli = new Cli(program);

const cli_options = (): Cli => {
  try {
    cli.name(config.package_name);
    cli.version(config.package_version, "-v, --version", "CLI-AI's version ");
    cli.description("A CLI for interacting with OpenAI's GPT3 API");

    cli.register_option("-ask, --question <value>", "Add your prompt");
    cli.register_option(
      "-m, --model <value>",
      "Add your preferred training model e.g. 'text-davinci-003'"
    );
    cli.register_option("-c, --chat [type]", 'Enable chatting mode "active"');
    cli.register_option(
      "-t, --temperature <value>",
      'Set temperature e.g. default "0.9"'
    );
    cli.register_option(
      "-mt, --max-tokens <value>",
      "Set words count. default 300"
    );
  } catch (e) {
    console.log(`💥 ${e}\n`);
  }

  cli.initialize();
  return cli;
};

export { cli_options };
