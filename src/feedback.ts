// «Sugerir una mejora»: abre la plantilla de idea de GitHub con versión, editor y sistema ya rellenos.
// Solo datos técnicos que la persona ve antes de enviar; nada del proyecto ni rutas.

const NEW_IDEA = "https://github.com/tato9689/visor-for-claude-code/issues/new";

export function suggestUrl(version: string, appName: string, platform: string): string {
  const q = new URLSearchParams({ template: "idea.yml", title: "Idea: ", env: `Visor ${version} · ${appName} · ${platform}` });
  return `${NEW_IDEA}?${q.toString()}`;
}
