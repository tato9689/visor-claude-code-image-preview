import { describe, expect, it } from "vitest";
import { reviewUrl, shouldAskForReview, REVIEW_MIN_DAYS, REVIEW_MIN_ITEMS } from "../src/review";

const DAY = 86_400_000;
const now = 100 * DAY;

describe("aviso de valoración", () => {
  it("pregunta cuando pasa la semana y hay uso real", () => {
    expect(shouldAskForReview({ firstSeen: now - REVIEW_MIN_DAYS * DAY, liveCount: REVIEW_MIN_ITEMS, asked: false }, now)).toBe(true);
  });
  it("no pregunta antes de tiempo ni con poco uso", () => {
    expect(shouldAskForReview({ firstSeen: now - 2 * DAY, liveCount: 500, asked: false }, now)).toBe(false);
    expect(shouldAskForReview({ firstSeen: now - 30 * DAY, liveCount: 3, asked: false }, now)).toBe(false);
  });
  it("nunca repite", () => {
    expect(shouldAskForReview({ firstSeen: now - 30 * DAY, liveCount: 500, asked: true }, now)).toBe(false);
  });
  it("sin fecha de primer uso no pregunta", () => {
    expect(shouldAskForReview({ liveCount: 500, asked: false }, now)).toBe(false);
  });
  it("manda cada editor a su tienda", () => {
    expect(reviewUrl("Visual Studio Code")).toContain("marketplace.visualstudio.com");
    expect(reviewUrl("Visual Studio Code - Insiders")).toContain("marketplace.visualstudio.com");
    expect(reviewUrl("Cursor")).toContain("open-vsx.org");
    expect(reviewUrl("VSCodium")).toContain("open-vsx.org");
  });
});
