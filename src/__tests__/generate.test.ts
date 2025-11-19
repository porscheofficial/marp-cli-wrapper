import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildCommand, parseArguments, type MarpConfig } from "../generate";

describe("generate.ts", () => {
  let mockConsoleError: ReturnType<typeof vi.spyOn>;
  let mockProcessExit: any;

  beforeEach(() => {
    mockConsoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    mockProcessExit = vi.spyOn(process, "exit").mockImplementation((() => {
      throw new Error("process.exit");
    }) as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("parseArguments", () => {
    it("should parse valid arguments correctly", () => {
      // Arrange
      const argv = ["node", "generate.js", "sample", "pdf", "dracula"];

      // Act
      const result = parseArguments(argv);

      // Assert
      expect(result).toEqual({
        name: "sample",
        format: "pdf",
        theme: "dracula",
      });
    });

    it("should parse arguments without theme", () => {
      // Arrange
      const argv = ["node", "generate.js", "sample", "html"];

      // Act
      const result = parseArguments(argv);

      // Assert
      expect(result).toEqual({
        name: "sample",
        format: "html",
        theme: undefined,
      });
    });

    it("should throw error when name is missing", () => {
      // Arrange
      const argv = ["node", "generate.js"];

      // Act & Assert
      expect(() => parseArguments(argv)).toThrow("process.exit");
      expect(mockConsoleError).toHaveBeenCalledWith("Usage: pnpm run marp <name> <format> [theme]");
      expect(mockConsoleError).toHaveBeenCalledWith("Example: pnpm run marp sample pdf dracula");
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });

    it("should throw error when format is missing", () => {
      // Arrange
      const argv = ["node", "generate.js", "sample"];

      // Act & Assert
      expect(() => parseArguments(argv)).toThrow("process.exit");
      expect(mockConsoleError).toHaveBeenCalledWith("Usage: pnpm run marp <name> <format> [theme]");
      expect(mockConsoleError).toHaveBeenCalledWith("Example: pnpm run marp sample pdf dracula");
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });
  });

  describe("buildCommand", () => {
    it("should build command with theme", () => {
      // Arrange
      const config: MarpConfig = {
        name: "sample",
        format: "pdf",
        theme: "dracula",
      };

      // Act
      const result = buildCommand(config);

      // Assert
      expect(result).toBe(
        "marp slides/sample/sample.md -o slides/sample/sample.pdf --theme themes/dracula.css --allow-local-files"
      );
    });

    it("should build command without theme", () => {
      // Arrange
      const config: MarpConfig = {
        name: "presentation",
        format: "html",
      };

      // Act
      const result = buildCommand(config);

      // Assert
      expect(result).toBe(
        "marp slides/presentation/presentation.md -o slides/presentation/presentation.html --allow-local-files"
      );
    });

    it.each(["pdf", "html", "pptx", "png"])("should handle format: %s", (format) => {
      // Arrange & Act
      const result = buildCommand({ name: "test", format });

      // Assert
      expect(result).toContain(`slides/test/test.md`);
      expect(result).toContain(`slides/test/test.${format}`);
      expect(result).toContain("--allow-local-files");
    });

    it.each(["dracula", "plato", "custom-theme"])("should handle theme: %s", (theme) => {
      // Arrange
      const config: MarpConfig = {
        name: "test",
        format: "pdf",
        theme,
      };

      // Act
      const result = buildCommand(config);

      // Assert
      expect(result).toContain(`--theme themes/${theme}.css`);
    });

    it("should always include --allow-local-files flag", () => {
      // Arrange
      const config: MarpConfig = {
        name: "test",
        format: "pdf",
      };

      // Act
      const result = buildCommand(config);

      // Assert
      expect(result).toContain("--allow-local-files");
    });
  });
});
