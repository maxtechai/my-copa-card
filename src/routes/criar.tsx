import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FanCard, type CardData } from "@/components/FanCard";
import { SiteHeader } from "@/components/SiteHeader";
import { TEAMS, VIBES } from "@/lib/teams";
import { DEFAULT_CARD, loadCard, saveCard } from "@/lib/cardStore";

export const Route = createFileRoute("/criar")({
  component: CriarPage,
  head: () => ({
    meta: [
      { title: "Criar cartão · TorcedorCard" },
      { name: "description", content: "Personalize seu cartão de torcedor da Copa 2026." },
      { property: "og:title", content: "Criar cartão · TorcedorCard" },
      { property: "og:description", content: "Personalize seu cartão de torcedor da Copa 2026." },
    ],
  }),
});

function CriarPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<CardData>(DEFAULT_CARD);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setData(loadCard());
  }, []);

  useEffect(() => {
    saveCard(data);
  }, [data]);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setData((d) => ({ ...d, photo: reader.result as string }));
    reader.readAsDataURL(file);
  };

  return (
    <main
      className="min-h-screen pb-20"
      style={{ background: "var(--gradient-hero), var(--background)" }}
    >
      <SiteHeader />

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_400px] gap-10 items-start">
        {/* Form */}
        <section className="order-2 lg:order-1 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black leading-tight">
              Monte seu <span style={{ color: "var(--primary)" }}>cartão</span>
            </h1>
            <p className="opacity-70 mt-2 text-sm">
              Atualiza ao vivo. Quando estiver bom, clica em gerar.
            </p>
          </div>

          <Field label="Foto (opcional)">
            <label
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer border-2 border-dashed transition-colors"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              <span className="text-2xl">📸</span>
              <span className="text-sm font-medium">
                {data.photo ? "Trocar foto" : "Enviar uma foto sua"}
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            </label>
          </Field>

          <Field label="Nome ou apelido">
            <input
              maxLength={20}
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Ex: Léo Raiz"
              className="w-full px-4 py-3 rounded-xl text-base font-bold outline-none focus:ring-2"
              style={{
                background: "var(--card)",
                color: "var(--card-foreground)",
                border: "1px solid var(--border)",
              }}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Sua seleção">
              <TeamSelect value={data.teamCode} onChange={(v) => setData({ ...data, teamCode: v })} />
            </Field>
            <Field label="Adversário">
              <TeamSelect
                value={data.opponentCode}
                onChange={(v) => setData({ ...data, opponentCode: v })}
              />
            </Field>
          </div>

          <Field label="Palpite do placar">
            <div className="flex items-center gap-3">
              <ScoreInput value={data.scoreHome} onChange={(v) => setData({ ...data, scoreHome: v })} />
              <span className="text-2xl font-black opacity-50">×</span>
              <ScoreInput value={data.scoreAway} onChange={(v) => setData({ ...data, scoreAway: v })} />
            </div>
          </Field>

          <Field label="Data do jogo">
            <input
              maxLength={10}
              value={data.matchDate}
              onChange={(e) => setData({ ...data, matchDate: e.target.value })}
              placeholder="25/06"
              className="w-full px-4 py-3 rounded-xl text-base font-bold outline-none focus:ring-2"
              style={{
                background: "var(--card)",
                color: "var(--card-foreground)",
                border: "1px solid var(--border)",
              }}
            />
          </Field>

          <Field label="Você é o tipo de torcedor...">
            <div className="flex flex-wrap gap-2">
              {VIBES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setData({ ...data, vibeId: v.id })}
                  className="px-3 py-2 rounded-full text-xs font-bold transition-all"
                  style={{
                    background: data.vibeId === v.id ? "var(--primary)" : "var(--card)",
                    color:
                      data.vibeId === v.id ? "var(--primary-foreground)" : "var(--card-foreground)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {v.emoji} {v.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Frase (opcional)">
            <input
              maxLength={70}
              value={data.phrase}
              onChange={(e) => setData({ ...data, phrase: e.target.value })}
              placeholder="Ex: Se errar pago uma pizza 🍕"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2"
              style={{
                background: "var(--card)",
                color: "var(--card-foreground)",
                border: "1px solid var(--border)",
              }}
            />
            <p className="text-[10px] opacity-60 mt-1">
              💡 Frases com desafio (ex: "se errar pago pizza") viralizam mais.
            </p>
          </Field>

          <button
            onClick={() => navigate({ to: "/resultado" })}
            className="w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-transform hover:scale-[1.02] active:scale-95"
            style={{
              background: "var(--gradient-card)",
              color: "var(--primary-foreground)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            Gerar meu cartão →
          </button>
        </section>

        {/* Preview */}
        <aside className="order-1 lg:order-2 lg:sticky lg:top-6 flex flex-col items-center">
          <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-3">
            Pré-visualização ao vivo
          </div>
          <div className="scale-[0.85] md:scale-100 origin-top">
            <FanCard ref={cardRef} data={data} />
          </div>
        </aside>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-wider opacity-70 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function TeamSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-3 rounded-xl text-sm font-bold outline-none focus:ring-2 cursor-pointer"
      style={{
        background: "var(--card)",
        color: "var(--card-foreground)",
        border: "1px solid var(--border)",
      }}
    >
      {TEAMS.map((t) => (
        <option key={t.code} value={t.code}>
          {t.flag} {t.name}
        </option>
      ))}
    </select>
  );
}

function ScoreInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="number"
      min={0}
      max={20}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 2))}
      className="w-20 h-16 text-center text-3xl font-black rounded-xl outline-none focus:ring-2"
      style={{
        background: "var(--card)",
        color: "var(--primary)",
        border: "1px solid var(--border)",
      }}
    />
  );
}
