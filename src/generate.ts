import { execSync } from "child_process";

export interface MarpConfig {
  name: string;
  format: string;
  theme?: string;
}

export function parseArguments(argv?: string[]): MarpConfig {
  const args = argv || process.argv;
  const [, , name, format, theme] = args;

  if (!name || !format) {
    console.error("Usage: pnpm run marp <name> <format> [theme]");
    console.error("Example: pnpm run marp sample pdf dracula");
    process.exit(1);
  }

  return { name, format, theme };
}

export function buildCommand(config: MarpConfig): string {
  const { name, format, theme } = config;
  const input = `slides/${name}/${name}.md`;
  const output = `slides/${name}/${name}.${format}`;

  let cmd = `marp ${input} -o ${output}`;

  if (theme) {
    cmd += ` --theme themes/${theme}.css`;
  }

  // Allow usage of local files for pdf generation
  cmd += " --allow-local-files";

  return cmd;
}

export function main(): void {
  try {
    const config = parseArguments();
    const command = buildCommand(config);

    console.log(`Generating ${config.format.toUpperCase()} presentation: ${config.name}`);
    if (config.theme) {
      console.log(`Using theme: ${config.theme}`);
    }

    execSync(command, { stdio: "inherit" });
    console.log("✅ Presentation generated successfully!");
  } catch (err) {
    console.error("❌ Failed to generate presentation");
    process.exit(1);
  }
}
