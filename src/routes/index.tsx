import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useCallback } from "react";
import { toPng } from "html-to-image";
import { FanCard, type CardData } from "@/components/FanCard";
import { TEAMS, VIBES } from "@/lib/teams";
import mascotesImg from "@/assets/mascotes-copa.jpeg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TorcedorCard — Crie seu cartão da Copa 2026" },
      {
        name: "description",
        content:
          "Crie seu cartão de torcedor oficial da Copa 2026. Escolha sua seleção, faça seu palpite e desafie seus amigos.",
      },
      { property: "og:title", content: "TorcedorCard — Copa 2026" },
      {
        property: "og:description",
        content: "Mostre pra todo mundo de qual time você é. Crie e compartilhe seu cartão de torcedor.",
      },
    ],
  }),
});

function Index() {
  const [step, setStep] = useState<"landing" | "create">("landing");
  const [data, setData] = useState<CardData>({
    name: "",
    photo: null,
    teamCode: "BRA",
    opponentCode: "ARG",
    scoreHome: "2",
    scoreAway: "1",
    vibeId: "raiz",
    phrase: "Se errar o placar pago uma pizza 🍕",
    premium: false,
  });
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setData((d) => ({ ...d, photo: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const download = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `torcedor-card-${data.name || "copa2026"}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  }, [data.name]);

  const shareWhatsApp = () => {
    const text = `Criei meu cartão da Copa 2026! Meu palpite: ${data.scoreHome}x${data.scoreAway}. ${data.phrase ? `"${data.phrase}"` : ""} ⚽🏆`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (step === "landing") {
    return <Landing onStart={() => setStep("create")} />;
  }

  return (
    <main
      className="min-h-screen pb-20"
      style={{ background: "var(--gradient-hero), var(--background)" }}
    >
      <header className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <button
          onClick={() => setStep("landing")}
          className="text-sm font-bold tracking-wide opacity-80 hover:opacity-100"
        >
          ← TorcedorCard
        </button>
        <div className="text-xs font-black uppercase tracking-widest opacity-60">
          Copa 2026
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_400px] gap-10 items-start">
        {/* Form */}
        <section className="order-2 lg:order-1 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black leading-tight">
              Monte seu <span style={{ color: "var(--primary)" }}>cartão de torcedor</span>
            </h1>
            <p className="opacity-70 mt-2 text-sm">
              Personalize, baixe e desafie a galera no story.
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
              <ScoreInput
                value={data.scoreHome}
                onChange={(v) => setData({ ...data, scoreHome: v })}
              />
              <span className="text-2xl font-black opacity-50">×</span>
              <ScoreInput
                value={data.scoreAway}
                onChange={(v) => setData({ ...data, scoreAway: v })}
              />
            </div>
          </Field>

          <Field label="Você é o tipo de torcedor...">
            <div className="flex flex-wrap gap-2">
              {VIBES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setData({ ...data, vibeId: v.id })}
                  className="px-3 py-2 rounded-full text-xs font-bold transition-all"
                  style={{
                    background:
                      data.vibeId === v.id ? "var(--primary)" : "var(--card)",
                    color:
                      data.vibeId === v.id
                        ? "var(--primary-foreground)"
                        : "var(--card-foreground)",
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
          </Field>
        </section>

        {/* Card preview */}
        <aside className="order-1 lg:order-2 lg:sticky lg:top-6 flex flex-col items-center gap-4">
          <div className="scale-[0.85] md:scale-100 origin-top">
            <FanCard ref={cardRef} data={data} />
          </div>

          <div className="w-full max-w-[360px] space-y-2">
            <button
              onClick={download}
              disabled={downloading}
              className="w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
              style={{
                background: "var(--gradient-card)",
                color: "var(--primary-foreground)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              {downloading ? "Gerando..." : "📥 Baixar Cartão"}
            </button>
            <button
              onClick={shareWhatsApp}
              className="w-full py-3 rounded-2xl font-bold text-sm transition-colors"
              style={{
                background: "var(--secondary)",
                color: "var(--secondary-foreground)",
              }}
            >
              📤 Compartilhar no WhatsApp
            </button>
            <p className="text-[10px] text-center opacity-60 pt-2">
              💎 Versão premium em breve — sem marca d'água, mais templates e animação.
            </p>
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

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{ background: "var(--gradient-hero), var(--background)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-sm font-black tracking-widest uppercase">
          ⚽ TorcedorCard
        </div>
        <div
          className="text-[10px] font-black px-3 py-1.5 rounded-full"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          COPA 2026
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 pt-10 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div
            className="inline-block text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
            style={{ background: "oklch(0 0 0 / 0.4)", color: "var(--primary)" }}
          >
            🔥 A copa começa aqui
          </div>
          <h1 className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight">
            Mostra pra geral{" "}
            <span style={{ color: "var(--primary)" }}>de que time você é</span>.
          </h1>
          <p className="text-lg opacity-80 max-w-md">
            Crie seu cartão de torcedor da Copa 2026, escolha seu palpite e desafie seus
            amigos no story. Demora menos de 1 minuto.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onStart}
              className="px-8 py-4 rounded-2xl font-black uppercase tracking-wider text-base transition-transform hover:scale-105 active:scale-95"
              style={{
                background: "var(--gradient-card)",
                color: "var(--primary-foreground)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              Criar meu cartão →
            </button>
            <div className="flex items-center gap-2 text-xs opacity-60 px-2">
              <span>⭐⭐⭐⭐⭐</span>
              <span>+12.000 cartões já criados</span>
            </div>
          </div>

          <div className="flex gap-6 pt-4 text-xs opacity-70">
            <div>📲 100% grátis</div>
            <div>⚡ Sem cadastro</div>
            <div>📤 Compartilha em 1 clique</div>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-10 rounded-full blur-3xl opacity-50"
            style={{ background: "var(--gradient-card)" }}
          />
          <img
            src={mascotesImg}
            alt="Mascotes oficiais da Copa 2026: o alce do Canadá, a onça-pintada do México e a águia dos EUA"
            className="relative w-full max-w-md mx-auto rounded-3xl"
            style={{ boxShadow: "var(--shadow-card)" }}
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-4">
        {[
          { icon: "🎨", title: "Personalizado", desc: "Foto, nome, seleção e palpite — tudo seu." },
          { icon: "🏆", title: "Estilo FIFA", desc: "Design de carta de game, pronto pro story." },
          { icon: "🍕", title: "Desafia a galera", desc: "Marque seus amigos e veja quem acerta." },
        ].map((f) => (
          <div
            key={f.title}
            className="p-6 rounded-2xl"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-black text-lg">{f.title}</h3>
            <p className="text-sm opacity-70 mt-1">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
