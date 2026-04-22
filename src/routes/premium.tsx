import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/premium")({
  component: PremiumPage,
  head: () => ({
    meta: [
      { title: "Premium · TorcedorCard" },
      { name: "description", content: "Desbloqueie a versão premium do TorcedorCard." },
      { property: "og:title", content: "TorcedorCard Premium" },
      { property: "og:description", content: "Sem marca d'água, templates exclusivos e mais." },
    ],
  }),
});

const FEATURES = [
  { icon: "🚫", title: "Sem marca d'água", desc: "Cartão limpo, pronto pra postar." },
  { icon: "🎨", title: "Templates exclusivos", desc: "Estilos premium que ninguém mais tem." },
  { icon: "📸", title: "Alta resolução", desc: "Download em 4K, perfeito pra impressão." },
  { icon: "🎬", title: "Versão animada", desc: "Cartão em vídeo pro story (em breve)." },
];

function PremiumPage() {
  return (
    <main
      className="min-h-screen pb-20"
      style={{ background: "var(--gradient-hero), var(--background)" }}
    >
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-6 text-center">
        <div
          className="inline-block text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          ★ Premium
        </div>
        <h1 className="text-4xl md:text-5xl font-black leading-tight">
          Faz seu cartão{" "}
          <span style={{ color: "var(--primary)" }}>parecer profissional</span>
        </h1>
        <p className="opacity-70 mt-3 max-w-md mx-auto">
          Sem marca d'água, templates exclusivos e download em alta resolução. Pagamento único.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mt-10 text-left">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-5 rounded-2xl"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-black">{f.title}</div>
              <div className="text-xs opacity-70 mt-1">{f.desc}</div>
            </div>
          ))}
        </div>

        <div
          className="mt-10 p-8 rounded-3xl"
          style={{
            background: "var(--gradient-card)",
            color: "var(--primary-foreground)",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          <div className="text-[10px] font-black uppercase tracking-widest opacity-80">
            Oferta de lançamento
          </div>
          <div className="flex items-baseline justify-center gap-2 mt-2">
            <span className="text-2xl line-through opacity-50">R$ 9,90</span>
            <span className="text-5xl font-black">R$ 4,90</span>
          </div>
          <div className="text-xs opacity-80 mt-1">Pagamento único · Acesso vitalício</div>

          <button
            disabled
            className="w-full mt-6 py-4 rounded-2xl font-black text-base uppercase tracking-wider opacity-80 cursor-not-allowed"
            style={{ background: "oklch(0.18 0.04 260)", color: "oklch(0.86 0.19 95)" }}
          >
            🔒 Em breve
          </button>
          <p className="text-[10px] opacity-70 mt-2">
            Pagamentos serão habilitados em breve. Crie seu cartão grátis enquanto isso.
          </p>
        </div>

        <Link
          to="/criar"
          className="mt-8 inline-block text-sm font-bold opacity-80 hover:opacity-100 underline"
        >
          ← Voltar pro criador
        </Link>
      </div>
    </main>
  );
}
