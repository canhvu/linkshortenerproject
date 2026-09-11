#!/usr/bin/env bash

set -euo pipefail

tool_name="$(
  node -e '
    let input = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      input += chunk;
    });
    process.stdin.on("end", () => {
      const { toolName } = JSON.parse(input);
      if (typeof toolName === "string") {
        process.stdout.write(toolName);
      }
    });
  '
)"

if [[ "$tool_name" == "create" || "$tool_name" == "edit" ]]; then
  npx prettier --write .
fi
