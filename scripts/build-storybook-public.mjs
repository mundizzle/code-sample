import { cp, rm } from "node:fs/promises";
import { spawn } from "node:child_process";

const tempDir = ".tmp-storybook-public";
const publicDir = "public/storybook";

await rm(tempDir, { force: true, recursive: true });
await rm(publicDir, { force: true, recursive: true });

await new Promise((resolve, reject) => {
  const child = spawn(
    "npx",
    ["storybook", "build", "--output-dir", tempDir, "--quiet"],
    {
      shell: false,
      stdio: "inherit",
    },
  );

  child.on("error", reject);
  child.on("exit", (code) => {
    if (code === 0) {
      resolve();
      return;
    }

    reject(new Error(`Storybook build failed with exit code ${code}`));
  });
});

await cp(tempDir, publicDir, { recursive: true });
await rm(tempDir, { force: true, recursive: true });
