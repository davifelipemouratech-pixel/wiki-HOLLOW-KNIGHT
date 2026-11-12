import React, { useState, useEffect } from "react";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Consumo do arquivo JSON local (Simulando uma API)
  useEffect(() => {
    async function fetchHallownestData() {
      try {
        setLoading(true);
        setError(null);

        // Buscando o arquivo JSON salvo na pasta public
        const response = await fetch("/enemies.json");

        if (!response.ok) {
          throw new Error(
            "Não foi possível carregar os registros dos arquivos de Hallownest.",
          );
        }

        const data = await response.json();
        setCards(data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHallownestData();
  }, []);

  // 2. Filtro dinâmico por nome ou área
  const filteredCards = cards.filter((card) => {
    const query = search.toLowerCase();
    const matchesName = card.name?.toLowerCase().includes(query);
    const matchesArea = card.area?.toLowerCase().includes(query);
    return matchesName || matchesArea;
  });

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-200 flex flex-col justify-between relative overflow-hidden font-serif selection:bg-cyan-900 selection:text-cyan-200">
      {/* Brilho de fundo (Glow Effect) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-950/20 blur-[140px] pointer-events-none rounded-full" />

      {/* Header Superior com Busca */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 py-6 sticky top-0 z-20 shadow-2xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 bg-slate-200 rotate-45 border border-cyan-400 shadow-[0_0_10px_#38bdf8]" />
            <h1 className="text-2xl font-black tracking-[0.25em] text-slate-100 uppercase drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
              GRIMÓRIO DE HALLOWNEST
            </h1>
          </div>

          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Buscar por nome ou área..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:outline-none px-4 py-2.5 pl-10 text-xs tracking-wider text-slate-200 placeholder-slate-500 rounded-sm transition-all shadow-inner"
            />
            <svg
              className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl w-full mx-auto px-6 py-10 flex-1 relative z-10">
        <div className="text-center mb-10">
          <p className="text-slate-400 text-xs tracking-widest uppercase">
            {loading
              ? "Consultando as sombras..."
              : `${filteredCards.length} Registros Encontrados`}
          </p>
        </div>

        {/* Estado de Carregamento */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-cyan-400 text-xs tracking-[0.2em] uppercase animate-pulse">
              Carregando registros de Hallownest...
            </p>
          </div>
        )}

        {/* Estado de Erro */}
        {error && (
          <div className="p-8 border border-rose-900/50 bg-rose-950/20 text-center max-w-md mx-auto my-12 rounded-sm">
            <p className="text-rose-400 text-xs tracking-widest uppercase mb-2">
              Falha na Conexão
            </p>
            <p className="text-slate-400 text-xs">{error}</p>
          </div>
        )}

        {/* Grid de Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCards.map((card, index) => (
              <div
                key={card.id || index}
                className="rounded-sm overflow-hidden flex flex-col group relative border border-slate-800/80 bg-slate-900/40 hover:border-cyan-500/50 transition-all duration-300"
              >
                {/* Imagem do Card */}
                <div className="relative h-56 w-full bg-slate-950/80 overflow-hidden border-b border-slate-800/80 flex items-center justify-center p-4">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x300/090d16/38bdf8?text=Sem+Imagem";
                    }}
                  />
                  {card.area && (
                    <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 border border-slate-700 text-[10px] font-bold tracking-widest text-cyan-400 rounded-sm uppercase">
                      {card.area}
                    </div>
                  )}
                </div>

                {/* Informações do Card */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold tracking-wider text-slate-100 group-hover:text-cyan-300 transition-colors uppercase mb-2">
                      {card.name}
                    </h3>

                    {card.description && (
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                        {card.description}
                      </p>
                    )}
                  </div>

                  {/* Badges de Atributos (HP, Geo) */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/60">
                    {card.hp !== undefined && (
                      <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm border bg-rose-950/60 text-rose-300 border-rose-800/60">
                        HP: {card.hp}
                      </span>
                    )}
                    {card.geo !== undefined && (
                      <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm border bg-amber-950/60 text-amber-300 border-amber-800/60">
                        Geo: {card.geo}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Nenhum registro encontrado */}
        {!loading && !error && filteredCards.length === 0 && (
          <div className="border border-slate-800/80 bg-slate-950/40 p-12 text-center max-w-md mx-auto my-12 rounded-sm">
            <p className="text-slate-400 text-xs tracking-widest uppercase">
              Nenhuma criatura encontrada com esses termos.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 py-6 text-center text-[10px] tracking-[0.2em] uppercase text-slate-600 relative z-10">
        <p>HALLOWNEST ARCHIVE — HIGHER BEINGS, THESE WORDS ARE FOR YOU ALONE</p>
      </footer>
    </div>
  );
}
