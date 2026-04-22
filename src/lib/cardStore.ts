import type { CardData } from "@/components/FanCard";

const KEY = "torcedor-card-data";

export const DEFAULT_CARD: CardData = {
  name: "",
  photo: null,
  teamCode: "BRA",
  opponentCode: "ARG",
  scoreHome: "2",
  scoreAway: "1",
  vibeId: "raiz",
  phrase: "Se errar o placar pago uma pizza 🍕",
  matchDate: "25/06",
  premium: false,
};

export function loadCard(): CardData {
  if (typeof window === "undefined") return DEFAULT_CARD;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return DEFAULT_CARD;
    return { ...DEFAULT_CARD, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CARD;
  }
}

export function saveCard(data: CardData) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* ignore quota */
  }
}