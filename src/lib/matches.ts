export type Match = {
  id: string;
  homeCode: string;
  awayCode: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  /** "21:00" local label */
  time: string;
  stage: string;
};

// Datas dinâmicas: hoje, amanhã, e dias seguintes — pra os filtros sempre fazerem sentido.
const today = new Date();
const iso = (offsetDays: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};

export const MATCHES: Match[] = [
  { id: "m1", homeCode: "BRA", awayCode: "ARG", date: iso(0), time: "21:00", stage: "Grupo A" },
  { id: "m2", homeCode: "MEX", awayCode: "USA", date: iso(0), time: "18:00", stage: "Grupo B" },
  { id: "m3", homeCode: "FRA", awayCode: "ESP", date: iso(0), time: "15:00", stage: "Grupo C" },
  { id: "m4", homeCode: "ENG", awayCode: "GER", date: iso(1), time: "16:00", stage: "Grupo D" },
  { id: "m5", homeCode: "POR", awayCode: "ITA", date: iso(1), time: "19:00", stage: "Grupo E" },
  { id: "m6", homeCode: "URU", awayCode: "COL", date: iso(1), time: "22:00", stage: "Grupo F" },
  { id: "m7", homeCode: "NED", awayCode: "CHI", date: iso(2), time: "15:00", stage: "Grupo G" },
  { id: "m8", homeCode: "CAN", awayCode: "MEX", date: iso(2), time: "18:00", stage: "Grupo B" },
  { id: "m9", homeCode: "BRA", awayCode: "FRA", date: iso(3), time: "21:00", stage: "Oitavas" },
  { id: "m10", homeCode: "ARG", awayCode: "ENG", date: iso(4), time: "21:00", stage: "Oitavas" },
  { id: "m11", homeCode: "GER", awayCode: "ESP", date: iso(5), time: "16:00", stage: "Quartas" },
  { id: "m12", homeCode: "POR", awayCode: "NED", date: iso(6), time: "19:00", stage: "Quartas" },
];

/**
 * Popularidade "fake" porém determinística por matchId.
 * Retorna percentuais que somam 100 (home/draw/away).
 */
export function fakePopularity(matchId: string) {
  // Hash simples do id pra gerar números estáveis.
  let h = 0;
  for (let i = 0; i < matchId.length; i++) h = (h * 31 + matchId.charCodeAt(i)) >>> 0;
  const home = 35 + (h % 35); // 35..69
  const draw = 10 + ((h >> 5) % 20); // 10..29
  let away = 100 - home - draw;
  if (away < 5) away = 5;
  const total = home + draw + away;
  return {
    home: Math.round((home / total) * 100),
    draw: Math.round((draw / total) * 100),
    away: 100 - Math.round((home / total) * 100) - Math.round((draw / total) * 100),
  };
}
