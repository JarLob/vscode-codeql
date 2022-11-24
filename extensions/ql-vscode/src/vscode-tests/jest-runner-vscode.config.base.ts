import * as path from "path";
import * as tmp from "tmp-promise";
import { RunnerOptions } from "jest-runner-vscode";

export const tmpDir = tmp.dirSync({ unsafeCleanup: true });

export const rootDir = path.resolve(__dirname, "../..");

const config: RunnerOptions = {
  version: "stable",
  launchArgs: [
    "--disable-extensions",
    "--disable-gpu",
    "--user-data-dir=" + path.join(tmpDir.name, "user-data"),
  ],
  extensionDevelopmentPath: rootDir,
};

export default config;