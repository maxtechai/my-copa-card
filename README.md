# 🏆 TorcedorCard

> Crie o seu cartão de torcedor da Copa 2026 em menos de 1 minuto, palpite os jogos e compartilhe no story.

TorcedorCard é um web app pensado para a Copa do Mundo de 2026. O usuário monta um cartão estilo "carta de FIFA" da sua seleção, registra um palpite público para os jogos e compartilha — transformando cada cartão em uma peça de divulgação orgânica do próprio app.

---

## ✨ Features

- 🎴 **Editor de cartão com preview ao vivo** — escolha seleção, adversário, placar, data, "tipo de torcedor" e frase. Visual atualiza em tempo real.
- 📸 **Foto do torcedor** — upload opcional via leitura local (sem upload pra servidor).
- ⚽ **Central de Jogos** — lista de partidas com filtros **Hoje / Amanhã / Todos**, palpite por placar e barra de **popularidade dos palpites**.
- 🔁 **Loop palpite → cartão** — botão "Usar no meu card" preenche o editor automaticamente com seleção, adversário, placar e data do jogo.
- 💬 **Frase automática inteligente** — quando o palpite vira cartão, uma frase é sugerida com base no placar (goleada → "Tô confiante demais 😎", empate → "Vai pro pênalti 🎯", etc.).
- 🆔 **ID único de cartão** (ex.: `#A7X92K`) — dá sensação de item oficial / colecionável.
- 🎨 **Identidade por seleção** — cada time tem sua própria paleta (gradiente + cor de texto) no cartão.
- 📤 **Tela de resultado** — pronta para download/compartilhamento, com legendas sugeridas.
- 💎 **Página Premium** — apresentação dos benefícios futuros (alta resolução, selos exclusivos, sem marca d'água, versões animadas).
- 💾 **Sem cadastro** — tudo persistido localmente no navegador (`sessionStorage` para o cartão, `localStorage` para palpites).

---

## 🗺️ Mapa de telas

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | `src/routes/index.tsx` | Landing com proposta, exemplo de cartão e CTA principal |
| `/criar` | `src/routes/criar.tsx` | Editor do cartão com preview ao vivo |
| `/jogos` | `src/routes/jogos.tsx` | Central de Jogos: lista, filtros, palpites e popularidade |
| `/resultado` | `src/routes/resultado.tsx` | Cartão final com ações de compartilhamento |
| `/premium` | `src/routes/premium.tsx` | Apresentação dos benefícios da versão paga |

---

## 🧱 Stack técnica

- **Framework**: [TanStack Start](https://tanstack.com/start) v1 (React 19, SSR opcional)
- **Bundler**: Vite 7
- **Roteamento**: TanStack Router (file-based em `src/routes/`)
- **Linguagem**: TypeScript (strict)
- **Estilo**: Tailwind CSS v4 via `src/styles.css` + design tokens em `oklch`
- **Componentes**: shadcn/ui (Radix + Tailwind)
- **Runtime de deploy**: Cloudflare Workers (`wrangler.jsonc`)
- **Gerenciador de pacotes**: Bun

> O projeto **não usa backend hoje**. Todos os dados ficam no navegador. A integração com Lovable Cloud (Supabase) está prevista como próximo passo.

---

## 📁 Estrutura de pastas

```
src/
├── components/
│   ├── FanCard.tsx            # O cartão visual do torcedor
│   ├── SiteHeader.tsx         # Header de navegação
│   └── ui/                    # Componentes shadcn/ui
├── lib/
│   ├── teams.ts               # Lista de seleções (bandeira, paleta, código)
│   ├── matches.ts             # Lista mockada de jogos + popularidade fake determinística
│   ├── cardStore.ts           # Persistência do cartão (sessionStorage)
│   └── predictionsStore.ts    # Persistência dos palpites (localStorage)
├── routes/
│   ├── __root.tsx             # Layout raiz (html/head/body shell)
│   ├── index.tsx              # /
│   ├── criar.tsx              # /criar
│   ├── jogos.tsx              # /jogos
│   ├── resultado.tsx          # /resultado
│   └── premium.tsx            # /premium
├── router.tsx                 # Configuração do router
├── routeTree.gen.ts           # Auto-gerado pelo plugin do TanStack Router
└── styles.css                 # Design tokens + Tailwind v4
```

---

## 🚀 Como rodar localmente

```bash
# Instalar dependências
bun install

# Subir o dev server
bun dev

# Build de produção
bun run build

# Preview do build
bun run preview
```

O dev server roda em `http://localhost:5173` por padrão.

---

## 🎨 Design System

Todas as cores e estilos vivem em `src/styles.css` como tokens semânticos em `oklch`. Componentes **nunca** devem usar classes de cor cruas (`text-white`, `bg-black`, etc.) — sempre referencie via tokens (`var(--primary)`, `var(--card)`, `var(--gradient-card)`, etc.).

Tokens principais:

- `--background` / `--foreground` — fundo e texto base
- `--primary` / `--primary-foreground` — ação principal (gerar cartão, CTAs)
- `--card` / `--card-foreground` — superfícies elevadas
- `--gradient-hero` — gradiente das telas
- `--gradient-card` — gradiente dos botões principais
- `--gradient-gold` — detalhes dourados (selos, bordas)
- `--shadow-card` / `--shadow-glow` — elevação e brilho

A paleta de cada seleção (gradient + textColor) está em `src/lib/teams.ts` e é aplicada inline no componente `FanCard`.

---

## 💾 Persistência (sem backend)

| Dado | Onde | Chave |
|------|------|-------|
| Cartão em edição | `sessionStorage` | `torcedor-card-data` |
| Palpites dos jogos | `localStorage` | `torcedor-predictions` |

**Por que essa escolha?**
- O cartão é volátil por sessão — o usuário monta, gera, compartilha. Não faz sentido reaparecer dias depois com aquele rascunho.
- Os palpites são **persistentes entre visitas** — quando o usuário voltar à Central de Jogos, vê o que já palpitou.

A migração para Lovable Cloud (DB + Auth) está prevista quando houver necessidade de ranking real, ligas entre amigos e popularidade verdadeira.

---

## 🔁 Fluxo principal (loop viral)

```
   ┌──────────┐     ┌──────────┐     ┌────────────┐     ┌────────────┐
   │ Landing  │ ──▶ │  /jogos  │ ──▶ │   /criar   │ ──▶ │ /resultado │
   │   /      │     │ palpita  │     │ auto-fill  │     │ compartilha│
   └──────────┘     └──────────┘     └────────────┘     └────────────┘
        │                                                      │
        └────────────────── ou direto ─────────────────────────┘
```

1. Usuário entra em `/jogos`, escolhe um jogo, digita o placar.
2. Clica em **"🎴 Usar no meu card"**.
3. É redirecionado para `/criar` com seleção, adversário, placar, data e **frase automática** já preenchidos.
4. Adiciona foto + nome.
5. Gera o cartão em `/resultado` e compartilha.

---

## 🧠 Lógicas-chave

### `fakePopularity(matchId)` — `src/lib/matches.ts`
Gera percentuais determinísticos (sempre os mesmos para o mesmo jogo) de popularidade entre `home / draw / away`. Permite mostrar a barra social sem backend.

### `autoPhrase(scoreHome, scoreAway)` — `src/routes/jogos.tsx`
Sugere uma frase para o cartão com base na diferença de gols:

| Condição | Frase |
|----------|-------|
| `0x0` | "0x0? Tô só zoando 😅 (ou não)" |
| diff ≥ 3 | "Tô confiante demais 😎 se errar pode me cobrar" |
| diff ≤ -3 | "Vai doer… mas eu avisei 😩" |
| empate | "Vai pro pênalti, escreve aí 🎯" |
| favorito | "Vai ser sofrido… mas vai dar 🇧🇷" |
| underdog | "Se errar esse placar, podem me cobrar 😳" |

Só sobrescreve a frase se o usuário ainda não personalizou.

### `makeCardId(data)` — `src/components/FanCard.tsx`
Hash FNV-1a do conteúdo do cartão convertido para uma string de **6 caracteres alfanuméricos** sem caracteres ambíguos (sem `0/O/1/I`). Mesmas entradas → mesmo ID, então o cartão tem identidade estável e estética de "raro".

---

## 🛣️ Roadmap

### ✅ Implementado
- Landing, editor, central de jogos, resultado, premium
- Persistência local (cartão e palpites)
- Integração palpite → cartão com frase automática
- ID único por cartão

### 🔜 Próximos passos
- **Pós-jogo automático** — comparar palpite com resultado real e gerar cartão "EU AVISEI 😎" / "Fui humilhado 🤡"
- **Lovable Cloud** — auth, ranking real, ligas privadas, popularidade verdadeira
- **Cards animados em vídeo** para Reels/TikTok
- **Notificações** de jogos próximos e resultados
- **Checkout Premium** via Stripe

---

## 🧪 Convenções do projeto

- **Roteamento**: file-based no padrão TanStack Start. **Não editar `src/routeTree.gen.ts`** — é gerado pelo plugin do Vite.
- **Cada rota tem seu próprio `head()`** com `title`, `description`, `og:title`, `og:description`.
- **Páginas marketing são rotas separadas**, não âncoras na home (melhor para SSR e SEO).
- **Sem `react-router-dom`** — sempre importar de `@tanstack/react-router`.
- **Sem cores cruas** em componentes — apenas tokens do design system.

---

## 📦 Deploy

O projeto está configurado para deploy em **Cloudflare Workers** via `wrangler.jsonc`. No fluxo padrão do Lovable, a publicação é automática a partir do botão **Publish** no editor.

---

## 📄 Documentação adicional

Uma versão da documentação em formato `.docx` (visão de produto, sem código) está disponível em `/mnt/documents/TorcedorCard-Documentacao.docx`.

---

## 🤝 Filosofia

> Não é só um gerador de imagem.
> É um **selo emocional + identidade de torcedor + aposta pública**.
>
> Cada cartão é, ao mesmo tempo, **produto e conteúdo**: o usuário se diverte criando e, ao postar, vira o canal de divulgação do próprio app.

Feito com ⚽ + ☕ para a Copa de 2026.
