import { createFileRoute, Link } from "@tanstack/react-router";
import { FanCard } from "@/components/FanCard";
import { SiteHeader } from "@/components/SiteHeader";
import mascotesImg from "@/assets/mascotes-copa.jpeg";

export const Route = createFileRoute("/")({
  component: Landing,
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
        content: "Mostre pra todo mundo de qual time você é. Crie e compartilhe seu cartão.",
      },
    ],
  }),
});

const SAMPLE_CARDS = [
  {
    name: "Léo Raiz",
    photo: null,
    teamCode: "BRA",
    opponentCode: "ARG",
    scoreHome: "3",
    scoreAway: "1",
    vibeId: "raiz",
    phrase: "Hexa ou nada 🏆",
    matchDate: "25/06",
    premium: false,
  },
  {
    name: "Mariana",
    photo: null,
    teamCode: "ARG",
    opponentCode: "BRA",
    scoreHome: "2",
    scoreAway: "0",
    vibeId: "confiante",
    phrase: "Vamos vamos Argentina",
    matchDate: "25/06",
    premium: false,
  },
  {
    name: "Carlos",
    photo: null,
    teamCode: "MEX",
    opponentCode: "USA",
    scoreHome: "2",
    scoreAway: "1",
    vibeId: "fanatico",
    phrase: "Se errar pago taco 🌮",
    matchDate: "11/06",
    premium: false,
  },
];

function Landing() {
  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{ background: "var(--gradient-hero), var(--background)" }}
    >
      <SiteHeader />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-6 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div
            className="inline-block text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
            style={{ background: "oklch(0 0 0 / 0.4)", color: "var(--primary)" }}
          >
            🔥 A copa começa aqui
          </div>
          <h1 className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight">
            Crie seu <span style={{ color: "var(--primary)" }}>Cartão de Torcedor</span> da Copa
            2026
          </h1>
          <p className="text-lg opacity-80 max-w-md">
            Mostre seu palpite e prove que é raiz. Personalize, baixe e desafie seus amigos no
            story em menos de 1 minuto.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/criar"
              className="px-8 py-4 rounded-2xl font-black uppercase tracking-wider text-base transition-transform hover:scale-105 active:scale-95 inline-block text-center"
              style={{
                background: "var(--gradient-card)",
                color: "var(--primary-foreground)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              Criar meu cartão →
            </Link>
            <div className="flex items-center gap-2 text-xs opacity-60 px-2">
              <span>⭐⭐⭐⭐⭐</span>
              <span>+12.000 cartões criados</span>
            </div>
          </div>

          <div className="flex gap-6 pt-2 text-xs opacity-70">
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

      {/* Showcase */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">
          Veja como fica o seu
        </h2>
        <p className="text-center opacity-70 mb-10 text-sm">
          3 estilos. Infinitas personalizações.
        </p>

        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory md:justify-center">
          {SAMPLE_CARDS.map((card, i) => (
            <div
              key={i}
              className="snap-center flex-shrink-0 scale-[0.7] sm:scale-[0.8] origin-top -mx-12 sm:mx-0"
              style={{
                transform: `scale(0.75) rotate(${(i - 1) * 4}deg)`,
              }}
            >
              <FanCard data={card} />
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link
            to="/criar"
            className="inline-block px-8 py-4 rounded-2xl font-black uppercase tracking-wider text-base transition-transform hover:scale-105"
            style={{
              background: "var(--gradient-card)",
              color: "var(--primary-foreground)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            Quero o meu →
          </Link>
        </div>
      </section>

      {/* Features */}
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

      <footer className="border-t opacity-60 text-center py-6 text-xs" style={{ borderColor: "var(--border)" }}>
        © 2026 TorcedorCard · Feito com ⚽ pra galera da Copa
      </footer>
    </main>
  );
}
