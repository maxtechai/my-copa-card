const KEY = "torcedor-predictions";

export type Prediction = {
  matchId: string;
  scoreHome: string;
  scoreAway: string;
  savedAt: number;
};

type Store = Record<string, Prediction>;

function read(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function write(s: Store) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export function loadPredictions(): Store {
  return read();
}

export function getPrediction(matchId: string): Prediction | null {
  return read()[matchId] ?? null;
}

export function savePrediction(p: Prediction) {
  const s = read();
  s[p.matchId] = p;
  write(s);
}
