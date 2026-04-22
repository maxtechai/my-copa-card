import { forwardRef } from "react";
import { TEAMS, VIBES } from "@/lib/teams";

export type CardData = {
  name: string;
  photo: string | null;
  teamCode: string;
  opponentCode: string;
  scoreHome: string;
  scoreAway: string;
  vibeId: string;
  phrase: string;
  matchDate: string;
  premium: boolean;
};

type Props = {
  data: CardData;
};

export const FanCard = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const team = TEAMS.find((t) => t.code === data.teamCode) ?? TEAMS[0];
  const opponent = TEAMS.find((t) => t.code === data.opponentCode) ?? TEAMS[1];
  const vibe = VIBES.find((v) => v.id === data.vibeId) ?? VIBES[0];

  return (
    <div
      ref={ref}
      className="relative w-[360px] h-[600px] rounded-3xl overflow-hidden select-none"
      style={{
        background: team.gradient,
        color: team.textColor,
        boxShadow: "var(--shadow-card)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Diagonal gold stripe */}
      <div
        className="absolute -top-10 -right-10 w-48 h-48 rotate-12 opacity-30"
        style={{ background: "var(--gradient-gold)" }}
      />

      {/* Header */}
      <div className="relative px-6 pt-6 flex items-center justify-between">
        <div className="text-[10px] font-black tracking-[0.2em] uppercase opacity-80">
          Copa 2026 · Fan Card
        </div>
        <div
          className="text-[10px] font-black px-2 py-1 rounded-md"
          style={{ background: "oklch(0 0 0 / 0.25)", color: "oklch(0.98 0.01 90)" }}
        >
          #{(team.code + (data.name || "fan")).slice(0, 8).toUpperCase()}
        </div>
      </div>

      {/* Big seal/badge — top-right floating */}
      <div
        className="absolute top-16 right-4 -rotate-12 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest z-10"
        style={{
          background: "var(--gradient-gold)",
          color: "oklch(0.18 0.04 260)",
          boxShadow: "0 4px 12px oklch(0 0 0 / 0.4)",
          border: "2px solid oklch(0.18 0.04 260 / 0.3)",
        }}
      >
        ★ {vibe.label}
      </div>

      {/* Photo */}
      <div className="relative px-6 pt-4 flex justify-center">
        <div
          className="w-40 h-40 rounded-full overflow-hidden border-4 flex items-center justify-center text-6xl"
          style={{
            borderColor: "var(--gradient-gold)",
            borderImage: "var(--gradient-gold) 1",
            background: "oklch(0 0 0 / 0.25)",
          }}
        >
          {data.photo ? (
            <img src={data.photo} alt="" className="w-full h-full object-cover" />
          ) : (
            <span>{team.flag}</span>
          )}
        </div>
      </div>

      {/* Name & flag */}
      <div className="relative px-6 pt-4 text-center">
        <div className="text-2xl font-black uppercase tracking-tight leading-none truncate">
          {data.name || "Seu Nome"}
        </div>
        <div className="mt-1 text-sm font-bold opacity-90 flex items-center justify-center gap-2">
          <span className="text-xl">{team.flag}</span>
          <span>{team.name}</span>
        </div>
      </div>

      {/* Vibe emoji line */}
      <div className="relative pt-2 text-center text-xs font-bold opacity-90">
        {vibe.emoji} {vibe.label}
      </div>

      {/* Score prediction */}
      <div className="relative mx-6 mt-4 rounded-2xl p-3" style={{ background: "oklch(0 0 0 / 0.35)" }}>
        <div
          className="text-[9px] font-black tracking-[0.2em] uppercase text-center mb-2"
          style={{ color: "oklch(0.86 0.19 95)" }}
        >
          Meu Palpite
        </div>
        <div className="flex items-center justify-around" style={{ color: "oklch(0.98 0.01 90)" }}>
          <div className="flex flex-col items-center gap-1">
            <div className="text-3xl">{team.flag}</div>
            <div className="text-[10px] font-bold">{team.code}</div>
          </div>
          <div className="flex items-center gap-2 text-3xl font-black">
            <span>{data.scoreHome || "0"}</span>
            <span className="opacity-50 text-xl">×</span>
            <span>{data.scoreAway || "0"}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-3xl">{opponent.flag}</div>
            <div className="text-[10px] font-bold">{opponent.code}</div>
          </div>
        </div>
      </div>

      {/* Phrase */}
      {data.phrase && (
        <div className="relative px-6 pt-3 text-center">
          <p className="text-xs italic opacity-90 line-clamp-2">"{data.phrase}"</p>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-4">
        <div
          className="h-px w-full mb-2 opacity-30"
          style={{ background: "currentColor" }}
        />
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider">
          <span>
            {team.flag} {team.code} vs {opponent.code} {opponent.flag}
            {data.matchDate ? ` · ${data.matchDate}` : ""}
          </span>
          {!data.premium && <span className="opacity-70">torcedorcard.app</span>}
          {data.premium && <span style={{ color: "oklch(0.18 0.04 260)" }}>★ PREMIUM</span>}
        </div>
      </div>
    </div>
  );
});

FanCard.displayName = "FanCard";