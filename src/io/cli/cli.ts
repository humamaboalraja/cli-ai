import { Command } from "commander";
class Cli {
  private program: Command;

  constructor(program: Command) {
    this.program = program;
  }

  name(name: string) {
    this.program.name(name);
  }

  description(description: string) {
    this.program.description(description);
  }

  version(version: string, flag: string, description?: string) {
    this.program.version(version, flag, description);
  }

  register_command(
    command_title: string,
    command_description?: string,
    command_action?: void | Promise<void>
  ) {
    this.program
      .command(command_title)
      .description(command_description)
      .action(() => command_action);
  }

  register_option(option_flag: string, option_description: string) {
    this.program.option(option_flag, option_description);
  }

  initialize() {
    this.program.parse(process.argv);
    this.program.parse();
  }
}

export { Cli };
