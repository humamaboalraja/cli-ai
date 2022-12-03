#!/usr/bin/env node
import { cli_options } from "./io/io";
import { render_ui, banner_setup, handle_missing_api_token } from "./ui/cli";

const cli_ai = async () => {
  banner_setup();
  handle_missing_api_token();
  cli_options();
  render_ui();
};

cli_ai();
