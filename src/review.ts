// Aviso único para pedir una valoración. Se pregunta una sola vez en la vida de la instalación,
// y solo a quien ya la ha usado de verdad: una semana desde el primer uso y 25 vistas en vivo.

export const REVIEW_MIN_DAYS = 7;
export const REVIEW_MIN_ITEMS = 25;

export interface ReviewState {
  firstSeen?: number; // ms, primer arranque
  liveCount: number;  // elementos que han llegado en vivo al panel
  asked: boolean;
}

export function shouldAskForReview(s: ReviewState, now: number): boolean {
  if (s.asked || s.firstSeen === undefined) return false;
  return now - s.firstSeen >= REVIEW_MIN_DAYS * 86_400_000 && s.liveCount >= REVIEW_MIN_ITEMS;
}

/** El Marketplace de Microsoft solo existe en VS Code; Cursor, VSCodium y Windsurf usan Open VSX. */
export function reviewUrl(appName: string): string {
  return /^visual studio code/i.test(appName)
    ? "https://marketplace.visualstudio.com/items?itemName=tato9689.visor-for-claude-code&ssr=false#review-details"
    : "https://open-vsx.org/extension/tato9689/visor-for-claude-code/reviews";
}
