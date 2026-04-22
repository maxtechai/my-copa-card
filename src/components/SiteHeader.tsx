import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
      <Link to="/" className="text-sm font-black tracking-widest uppercase hover:opacity-80">
        ⚽ TorcedorCard
      </Link>
      <div className="flex items-center gap-4 text-xs font-black uppercase tracking-wider">
        <Link to="/criar" className="opacity-70 hover:opacity-100">
          Criar
        </Link>
        <Link to="/jogos" className="opacity-70 hover:opacity-100">
          Jogos ⚽
        </Link>
        <Link
          to="/premium"
          className="px-3 py-1.5 rounded-full"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          ★ Premium
        </Link>
      </div>
    </header>
  );
}