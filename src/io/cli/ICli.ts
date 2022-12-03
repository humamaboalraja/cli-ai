interface ICli {
  description(description: string): void;
  version(version: string, flag: string, description?: string): void;
  name(name: string): void;
  register_command(
    command_title: string,
    command_description?: string,
    command_action?: void | Promise<void>
  ): void;
  register_option(option_flag: string, option_description: string): void;
  initialize(): void;
}

export { ICli };
