#!/usr/bin/env node
import { cli_options } from "./io/io";
import { render_cli } from "./ui/cli";

const cli_ai = () => {
  cli_options();
  render_cli();
};

cli_ai();
