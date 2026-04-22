import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { TEAMS } from "@/lib/teams";
import { MATCHES, fakePopularity, type Match } from "@/lib/matches";
import {
  getPrediction,
  loadPredictions,
  savePrediction,
  type Prediction,
} from "@/lib/predictionsStore";
import { loadCard, saveCard } from "@/lib/cardStore";

export const Route = createFileRoute("/jogos")({
  component: JogosPage,
  head: () => ({
    meta: [
      { title: "Jogos da Copa · TorcedorCard" },
      {
        name: "description",
        content:
          "Veja os jogos da Copa 2026, faça seu palpite e use direto no seu cartão de torcedor.",
      },
      { property: "og:title", content: "Central de Jogos · TorcedorCard" },
      {
        property: "og:description",
        content: "Palpite, veja a popularidade e desafie seus amigos.",
      },
    ],
  }),
});

type Filter = "today" | "tomorrow" | "all";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function JogosPage() {
  const [filter, setFilter] = useState<Filter>("today");
  const [predictions, setPredictions] = useState<Record<string, Prediction>>({});

  useEffect(() => {
    setPredictions(loadPredictions());
  }, []);

  const filtered = useMemo(() => {
    if (filter === "today") return MATCHES.filter((m) => m.date === todayISO());
    if (filter === "tomorrow") return MATCHES.filter((m) => m.date === tomorrowISO());
    return MATCHES;
  }, [filter]);

  const handleSave = (matchId: string, scoreHome: string, scoreAway: string) => {
    const p: Prediction = {
      matchId,
      scoreHome,
      scoreAway,
      savedAt: Date.now(),
    };
    savePrediction(p);
    setPredictions((prev) => ({ ...prev, [matchId]: p }));
  };

  return (
    <main
      className="min-h-screen pb-20"
      style={{ background: "var(--gradient-hero), var(--background)" }}
    >
      <SiteHeader />

      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-black leading-tight">
            Jogos da <span style={{ color: "var(--primary)" }}>Copa</span> ⚽
          </h1>
          <p className="opacity-70 mt-2 text-sm">
            Palpite cada jogo. Seus palpites ficam salvos pra usar no seu cartão.
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          {(
            [
              { id: "today", label: "Hoje" },
              { id: "tomorrow", label: "Amanhã" },
              { id: "all", label: "Todos" },
            ] as { id: Filter; label: string }[]
          ).map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all"
              style={{
                background: filter === f.id ? "var(--primary)" : "var(--card)",
                color: filter === f.id ? "var(--primary-foreground)" : "var(--card-foreground)",
                border: "1px solid var(--border)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div
            className="text-center py-12 rounded-2xl text-sm opacity-70"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            Nenhum jogo nesse filtro. Tenta "Todos" 👇
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((m) => (
              <MatchCard
                key={m.id}
                match={m}
                prediction={predictions[m.id] ?? null}
                onSave={handleSave}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function MatchCard({
  match,
  prediction,
  onSave,
}: {
  match: Match;
  prediction: Prediction | null;
  onSave: (id: string, h: string, a: string) => void;
}) {
  const navigate = useNavigate();
  const home = TEAMS.find((t) => t.code === match.homeCode) ?? TEAMS[0];
  const away = TEAMS.find((t) => t.code === match.awayCode) ?? TEAMS[1];

  const [h, setH] = useState(prediction?.scoreHome ?? "");
  const [a, setA] = useState(prediction?.scoreAway ?? "");
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setH(prediction?.scoreHome ?? "");
    setA(prediction?.scoreAway ?? "");
  }, [prediction?.scoreHome, prediction?.scoreAway]);

  const pop = fakePopularity(match.id);
  const dateLabel = formatDate(match.date);

  const confirm = () => {
    const sh = (h || "0").replace(/\D/g, "").slice(0, 2) || "0";
    const sa = (a || "0").replace(/\D/g, "").slice(0, 2) || "0";
    onSave(match.id, sh, sa);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  };

  const useInCard = () => {
    const sh = (h || prediction?.scoreHome || "0").replace(/\D/g, "").slice(0, 2) || "0";
    const sa = (a || prediction?.scoreAway || "0").replace(/\D/g, "").slice(0, 2) || "0";
    // Garante que o palpite fique salvo também na lista de jogos
    onSave(match.id, sh, sa);
    const card = loadCard();
    saveCard({
      ...card,
      teamCode: match.homeCode,
      opponentCode: match.awayCode,
      scoreHome: sh,
      scoreAway: sa,
      matchDate: dateLabel,
    });
    navigate({ to: "/criar" });
  };

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest opacity-70 mb-3">
        <span>{match.stage}</span>
        <span>
          🕒 {dateLabel} · {match.time}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <TeamSide flag={home.flag} code={home.code} name={home.name} />

        <div className="flex items-center gap-2">
          <ScoreInput value={h} onChange={setH} />
          <span className="text-2xl font-black opacity-50">×</span>
          <ScoreInput value={a} onChange={setA} />
        </div>

        <TeamSide flag={away.flag} code={away.code} name={away.name} align="right" />
      </div>

      {/* Popularidade */}
      <div className="mt-4">
        <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1.5">
          Popularidade dos palpites
        </div>
        <div
          className="flex h-2 rounded-full overflow-hidden"
          style={{ background: "var(--muted)" }}
        >
          <div style={{ width: `${pop.home}%`, background: "var(--primary)" }} />
          <div style={{ width: `${pop.draw}%`, background: "var(--muted-foreground)" }} />
          <div style={{ width: `${pop.away}%`, background: "var(--accent)" }} />
        </div>
        <div className="flex justify-between text-[10px] mt-1.5 font-bold opacity-80">
          <span>{pop.home}% {home.code}</span>
          <span>{pop.draw}% empate</span>
          <span>{pop.away}% {away.code}</span>
        </div>
      </div>

      {/* Ações */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button
          onClick={confirm}
          className="flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-transform active:scale-95"
          style={{
            background: justSaved ? "var(--secondary)" : "var(--gradient-card)",
            color: "var(--primary-foreground)",
          }}
        >
          {justSaved ? "✓ Palpite salvo" : prediction ? "Atualizar palpite" : "Confirmar palpite"}
        </button>
        <button
          onClick={useInCard}
          className="flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-transform active:scale-95"
          style={{
            background: "transparent",
            color: "var(--primary)",
            border: "1px solid var(--primary)",
          }}
        >
          🎴 Usar no meu card
        </button>
      </div>
    </div>
  );
}

function TeamSide({
  flag,
  code,
  name,
  align = "left",
}: {
  flag: string;
  code: string;
  name: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`flex flex-col ${align === "right" ? "items-end" : "items-start"} flex-1 min-w-0`}
    >
      <div className="text-3xl">{flag}</div>
      <div className="text-xs font-black mt-1">{code}</div>
      <div className="text-[10px] opacity-60 truncate max-w-[80px]">{name}</div>
    </div>
  );
}

function ScoreInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="number"
      min={0}
      max={20}
      placeholder="0"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 2))}
      className="w-14 h-14 text-center text-2xl font-black rounded-xl outline-none focus:ring-2"
      style={{
        background: "var(--background)",
        color: "var(--primary)",
        border: "1px solid var(--border)",
      }}
    />
  );
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y.slice(2)}`;
}
