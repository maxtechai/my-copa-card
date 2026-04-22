export type Team = {
  code: string;
  name: string;
  flag: string;
  gradient: string;
  textColor: string;
};

export const TEAMS: Team[] = [
  { code: "BRA", name: "Brasil", flag: "🇧🇷", gradient: "linear-gradient(145deg, oklch(0.78 0.18 140), oklch(0.86 0.19 95))", textColor: "oklch(0.18 0.04 260)" },
  { code: "ARG", name: "Argentina", flag: "🇦🇷", gradient: "linear-gradient(145deg, oklch(0.78 0.13 230), oklch(0.98 0.01 90))", textColor: "oklch(0.18 0.04 260)" },
  { code: "MEX", name: "México", flag: "🇲🇽", gradient: "linear-gradient(145deg, oklch(0.55 0.18 145), oklch(0.62 0.24 25))", textColor: "oklch(0.98 0.01 90)" },
  { code: "USA", name: "Estados Unidos", flag: "🇺🇸", gradient: "linear-gradient(145deg, oklch(0.4 0.18 265), oklch(0.62 0.24 25))", textColor: "oklch(0.98 0.01 90)" },
  { code: "CAN", name: "Canadá", flag: "🇨🇦", gradient: "linear-gradient(145deg, oklch(0.62 0.24 25), oklch(0.98 0.01 90))", textColor: "oklch(0.18 0.04 260)" },
  { code: "FRA", name: "França", flag: "🇫🇷", gradient: "linear-gradient(145deg, oklch(0.4 0.18 265), oklch(0.62 0.24 25))", textColor: "oklch(0.98 0.01 90)" },
  { code: "ESP", name: "Espanha", flag: "🇪🇸", gradient: "linear-gradient(145deg, oklch(0.62 0.24 25), oklch(0.86 0.19 95))", textColor: "oklch(0.18 0.04 260)" },
  { code: "POR", name: "Portugal", flag: "🇵🇹", gradient: "linear-gradient(145deg, oklch(0.55 0.18 145), oklch(0.62 0.24 25))", textColor: "oklch(0.98 0.01 90)" },
  { code: "ENG", name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", gradient: "linear-gradient(145deg, oklch(0.98 0.01 90), oklch(0.62 0.24 25))", textColor: "oklch(0.18 0.04 260)" },
  { code: "GER", name: "Alemanha", flag: "🇩🇪", gradient: "linear-gradient(145deg, oklch(0.18 0.04 260), oklch(0.62 0.24 25))", textColor: "oklch(0.98 0.01 90)" },
  { code: "ITA", name: "Itália", flag: "🇮🇹", gradient: "linear-gradient(145deg, oklch(0.4 0.18 265), oklch(0.55 0.18 145))", textColor: "oklch(0.98 0.01 90)" },
  { code: "URU", name: "Uruguai", flag: "🇺🇾", gradient: "linear-gradient(145deg, oklch(0.78 0.13 230), oklch(0.86 0.19 95))", textColor: "oklch(0.18 0.04 260)" },
  { code: "COL", name: "Colômbia", flag: "🇨🇴", gradient: "linear-gradient(145deg, oklch(0.86 0.19 95), oklch(0.62 0.24 25))", textColor: "oklch(0.18 0.04 260)" },
  { code: "CHI", name: "Chile", flag: "🇨🇱", gradient: "linear-gradient(145deg, oklch(0.62 0.24 25), oklch(0.4 0.18 265))", textColor: "oklch(0.98 0.01 90)" },
  { code: "NED", name: "Holanda", flag: "🇳🇱", gradient: "linear-gradient(145deg, oklch(0.7 0.2 50), oklch(0.86 0.19 95))", textColor: "oklch(0.18 0.04 260)" },
];

export const VIBES = [
  { id: "raiz", label: "Torcedor Raiz", emoji: "🔥" },
  { id: "confiante", label: "Confiante", emoji: "😎" },
  { id: "oficial", label: "Torcedor Oficial", emoji: "🏆" },
  { id: "fanatico", label: "Fanático", emoji: "💥" },
  { id: "pe-frio", label: "Pé-frio Assumido", emoji: "🥶" },
  { id: "profeta", label: "Profeta da Bola", emoji: "🔮" },
];