import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { FanCard, type CardData } from "@/components/FanCard";
import { SiteHeader } from "@/components/SiteHeader";
import { DEFAULT_CARD, loadCard } from "@/lib/cardStore";

export const Route = createFileRoute("/resultado")({
  component: ResultadoPage,
  head: () => ({
    meta: [
      { title: "Seu cartão tá pronto · TorcedorCard" },
      { name: "description", content: "Baixe e compartilhe seu cartão de torcedor da Copa 2026." },
      { property: "og:title", content: "Olha meu cartão da Copa 2026" },
      { property: "og:description", content: "Crie o seu também e desafie a galera." },
    ],
  }),
});

function ResultadoPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<CardData>(DEFAULT_CARD);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setData(loadCard());
  }, []);

  const download = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true });
      const link = document.createElement("a");
      link.download = `torcedor-card-${data.name || "copa2026"}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  }, [data.name]);

  const shareText = `Criei meu cartão da Copa 2026! Meu palpite: ${data.scoreHome}x${data.scoreAway}. ${
    data.phrase ? `"${data.phrase}"` : ""
  } Crie o seu: ${typeof window !== "undefined" ? window.location.origin : ""}`;

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const copyLink = async () => {
    if (typeof window === "undefined") return;
    await navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main
      className="min-h-screen pb-20"
      style={{ background: "var(--gradient-hero), var(--background)" }}
    >
      <SiteHeader />

      <div className="max-w-3xl mx-auto px-6 text-center">
        <div
          className="inline-block text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4"
          style={{ background: "var(--secondary)", color: "var(--secondary-foreground)" }}
        >
          ✓ Seu cartão tá pronto
        </div>
        <h1 className="text-3xl md:text-4xl font-black leading-tight">
          Bora <span style={{ color: "var(--primary)" }}>desafiar</span> a galera?
        </h1>
        <p className="opacity-70 mt-2 text-sm">
          Baixa, posta no story e marca seus amigos. Quem errar paga a pizza 🍕
        </p>

        <div className="flex justify-center mt-8">
          <FanCard ref={cardRef} data={data} />
        </div>

        <div className="max-w-md mx-auto mt-8 space-y-3">
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
            {downloading ? "Gerando..." : "📥 Baixar imagem"}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={shareWhatsApp}
              className="py-3 rounded-2xl font-bold text-sm transition-colors"
              style={{ background: "var(--secondary)", color: "var(--secondary-foreground)" }}
            >
              📤 WhatsApp
            </button>
            <button
              onClick={copyLink}
              className="py-3 rounded-2xl font-bold text-sm transition-colors"
              style={{
                background: "var(--card)",
                color: "var(--card-foreground)",
                border: "1px solid var(--border)",
              }}
            >
              {copied ? "✓ Copiado!" : "🔗 Copiar link"}
            </button>
          </div>

          <button
            onClick={() => navigate({ to: "/criar" })}
            className="w-full py-2 text-xs font-bold opacity-60 hover:opacity-100 underline"
          >
            Voltar e ajustar
          </button>
        </div>

        {/* Upsell */}
        <div
          className="mt-12 max-w-md mx-auto p-6 rounded-3xl text-left"
          style={{
            background: "var(--gradient-card)",
            color: "var(--primary-foreground)",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          <div className="text-[10px] font-black uppercase tracking-widest opacity-80">
            ★ Versão Premium
          </div>
          <h2 className="text-2xl font-black mt-1">Tira a marca d'água</h2>
          <p className="text-sm opacity-90 mt-1">
            Cartão sem marca d'água, templates exclusivos e download em alta resolução.
          </p>
          <Link
            to="/premium"
            className="mt-4 inline-block px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider"
            style={{ background: "oklch(0.18 0.04 260)", color: "oklch(0.86 0.19 95)" }}
          >
            Desbloquear por R$ 4,90 →
          </Link>
        </div>
      </div>
    </main>
  );
}
