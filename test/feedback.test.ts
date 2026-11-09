import { describe, expect, it } from "vitest";
import { suggestUrl } from "../src/feedback";

describe("sugerir una mejora", () => {
  it("abre la plantilla de idea con el entorno relleno", () => {
    const u = new URL(suggestUrl("0.2.8", "Cursor", "linux"));
    expect(u.origin + u.pathname).toBe("https://github.com/tato9689/visor-claude-code-image-preview/issues/new");
    expect(u.searchParams.get("template")).toBe("idea.yml");
    expect(u.searchParams.get("title")).toBe("Idea: ");
    expect(u.searchParams.get("env")).toBe("Visor 0.2.8 · Cursor · linux");
  });
  it("escapa nombres de editor raros", () => {
    const u = new URL(suggestUrl("0.2.8", "Visual Studio Code - Insiders & co", "win32"));
    expect(u.searchParams.get("env")).toBe("Visor 0.2.8 · Visual Studio Code - Insiders & co · win32");
  });
});
