import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { FOOD_CHAIN_NODES, FOOD_WEB_EXTENDED_NODES } from '../data/curriculumData';
import { FoodChainNode } from '../types';
import { soundEngine } from '../utils/audio';
import { IMAGES } from '../assets/images';
import { ArrowRight, CheckCircle2, RotateCcw, Zap, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';

interface Mission3Props {
  onComplete: () => void;
  onNextMission: () => void;
}

export const Mission3FoodWeb: React.FC<Mission3Props> = ({ onComplete, onNextMission }) => {
  // Step 1: Chain builder state
  const [placedChain, setPlacedChain] = useState<FoodChainNode[]>([]);
  const [availableNodes, setAvailableNodes] = useState<FoodChainNode[]>([...FOOD_CHAIN_NODES].sort(() => Math.random() - 0.5));
  const [isChainComplete, setIsChainComplete] = useState<boolean>(false);
  const [chainError, setChainError] = useState<string | null>(null);

  // Step 2: Population shock simulator state
  const [snakeShock, setSnakeShock] = useState<'NORMAL' | 'HUNTED' | 'OVERPROTECTED'>('NORMAL');
  const [pesticideShock, setPesticideShock] = useState<boolean>(false);
  const [simulationTested, setSimulationTested] = useState<boolean>(false);
  const [allCleared, setAllCleared] = useState<boolean>(false);

  // Handle clicking a card to place into chain
  const handleSelectNode = (node: FoodChainNode) => {
    soundEngine.playClick();
    setChainError(null);

    // Verify next expected trophic level
    const nextIndex = placedChain.length;
    const expectedNode = FOOD_CHAIN_NODES[nextIndex];

    if (node.id === expectedNode.id) {
      soundEngine.playSuccess();
      const nextChain = [...placedChain, node];
      setPlacedChain(nextChain);
      setAvailableNodes(availableNodes.filter((n) => n.id !== node.id));

      if (nextChain.length === FOOD_CHAIN_NODES.length) {
        setIsChainComplete(true);
        soundEngine.playVictoryFanfare();
      }
    } else {
      soundEngine.playWrong();
      setChainError(`Belum tepat! Perhatikan arah aliran energi dari produsen ke konsumen berikutnya.`);
    }
  };

  const handleResetChain = () => {
    soundEngine.playClick();
    setPlacedChain([]);
    setAvailableNodes([...FOOD_CHAIN_NODES].sort(() => Math.random() - 0.5));
    setIsChainComplete(false);
    setChainError(null);
  };

  // Population values calculated based on shock states
  let ratPop = 40;
  let riceYield = 90;
  let frogPop = 50;
  let snakePop = 30;
  let eaglePop = 15;

  if (snakeShock === 'HUNTED') {
    snakePop = 2;
    ratPop = 95; // rat explosion!
    riceYield = 18; // padi ruined!
    frogPop = 75;
    eaglePop = 4; // eagles starve
  } else if (snakeShock === 'OVERPROTECTED') {
    snakePop = 70;
    ratPop = 10;
    frogPop = 15;
    riceYield = 98;
    eaglePop = 28;
  }

  if (pesticideShock) {
    frogPop = Math.max(5, Math.round(frogPop * 0.2));
    riceYield = Math.max(25, Math.round(riceYield * 0.6));
  }

  const handleTestShock = (shock: 'NORMAL' | 'HUNTED' | 'OVERPROTECTED') => {
    soundEngine.playClick();
    setSnakeShock(shock);
    setSimulationTested(true);

    if (shock === 'HUNTED' && !allCleared) {
      soundEngine.playEnergyFlow();
      if (isChainComplete) {
        setAllCleared(true);
        soundEngine.playVictoryFanfare();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        onComplete();
      }
    }
  };

  return (
    <div className="w-full min-h-screen pt-16 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-6 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Misi 3 · Materi 3.3
            </span>
            <span className="text-xs text-slate-400">· Jaring & Rantai Kehidupan</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white font-['Outfit',sans-serif]">
            Rantai Makanan & Jaring-Jaring Makanan Sawah
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
            Rantai makanan adalah urutan perpindahan energi melalui makan dan dimakan. Tanda panah (→) menunjukkan arah perpindahan energi dari yang dimakan ke pemakannya!
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800 shrink-0">
          <span className="text-xs text-slate-400">Status Rantai:</span>
          <span className={`font-mono tabular-nums font-bold text-sm ${isChainComplete ? 'text-emerald-400' : 'text-amber-400'}`}>
            {placedChain.length} / {FOOD_CHAIN_NODES.length} Tingkat Trofik
          </span>
        </div>
      </div>

      {/* Part 1: Interactive Chain Constructor */}
      <div className="relative bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4 overflow-hidden">
        {/* Subtle Paddy Habitat Background */}
        <img
          src={IMAGES.heroLandscape}
          alt="Latar Sawah Rantai Makanan"
          className="absolute inset-0 w-full h-full object-cover opacity-25 brightness-75 scale-105 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-950/80 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">
                Langkah 1: Susun Rantai Makanan Sawah (Aliran Energi)
              </h2>
            </div>
            <button
              onClick={handleResetChain}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mulai Ulang Susunan</span>
            </button>
          </div>

        {/* Chain Target Slots */}
        <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center gap-2 overflow-x-auto min-h-[110px] scrollbar-none">
          {FOOD_CHAIN_NODES.map((_, idx) => {
            const node = placedChain[idx];
            return (
              <React.Fragment key={idx}>
                <div
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border min-w-[130px] h-24 transition-all ${
                    node
                      ? 'bg-slate-800/90 border-emerald-500/80 shadow-md scale-100'
                      : 'bg-slate-900/40 border-dashed border-slate-700 text-slate-500'
                  }`}
                >
                  {node ? (
                    <>
                      <span className="text-2xl mb-1">{node.icon}</span>
                      <span className="text-xs font-bold text-white truncate max-w-[110px]">
                        {node.name}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono mt-0.5">
                        {node.trophicLevel}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs font-mono text-slate-600">
                      Tingkat {idx + 1}
                    </span>
                  )}
                </div>

                {idx < FOOD_CHAIN_NODES.length - 1 && (
                  <div className="flex flex-col items-center justify-center shrink-0 px-1 text-amber-400">
                    <ArrowRight className="w-5 h-5 animate-pulse" />
                    <span className="text-[9px] text-slate-500 font-mono">Energi</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Error / Feedback Message */}
        {chainError && (
          <div className="p-2.5 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{chainError}</span>
          </div>
        )}

        {/* Available organism cards pool */}
        {!isChainComplete && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">
              Pilih Organisme Berikutnya untuk Mengalirkan Energi:
            </label>
            <div className="flex flex-wrap items-center gap-2.5">
              {availableNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => handleSelectNode(node)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 hover:border-emerald-500 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  <span className="text-xl">{node.icon}</span>
                  <div className="text-left">
                    <div className="text-white font-bold">{node.name}</div>
                    <div className="text-[10px] text-slate-400">{node.roleText}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

          {isChainComplete && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-700 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong>Hebat! Rantai Makanan Sawah Lengkap:</strong> Matahari ➔ Padi (Produsen) ➔ Belalang (Konsumen I) ➔ Katak (Konsumen II) ➔ Ular (Konsumen III) ➔ Elang (Konsumen Puncak).
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Part 2: Food Web & Ecosystem Ripple Effect Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Web Visual & Organisms (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Jaring-jaring Makanan Sawah Kompleks</span>
              </h3>
              <span className="text-xs text-slate-400">
                Saling terhubung & multi-mangsa
              </span>
            </div>

            {/* Visual illustration of organisms - PANORAMIC 16:9 EDGE-TO-EDGE (NO EMPTY AREA) */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 mb-4 shadow-lg group">
              <img
                src={IMAGES.foodWebPanoramic}
                alt="Ilustrasi Lengkap Panoramik Jaring Makanan Sawah"
                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-3 right-3 text-xs font-semibold text-slate-100 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 flex items-center justify-between">
                <span>🌾 Padi ➔ 🦗 Belalang / 🐀 Tikus ➔ 🐸 Katak ➔ 🐍 Ular ➔ 🦅 Elang</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/60">
                  Lengkap 100%
                </span>
              </div>
            </div>

            {/* Explanation box */}
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <p>
                <strong>Jaring-Jaring Makanan:</strong> Di sawah, padi tidak hanya dimakan belalang, tapi juga <strong>biji padi dimakan tikus dan burung pipit</strong>. Katak dan burung memangsa belalang; tikus dan katak dimakan ular; lalu ular dimakan elang.
              </p>
              <p className="text-emerald-300 font-semibold">
                Jika salah satu populasi berubah drastis, seluruh jaring makanan akan ikut terguncang!
              </p>
            </div>
          </div>

          {/* Action Simulation Triggers */}
          <div className="mt-5 pt-4 border-t border-slate-800 space-y-2.5">
            <label className="text-xs font-bold text-slate-300 block">
              Simulasi Guncangan Populasi (Ecosystem Shock):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => handleTestShock('HUNTED')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                  snakeShock === 'HUNTED'
                    ? 'bg-rose-950 border-rose-500 text-rose-200 ring-1 ring-rose-500'
                    : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <span className="block text-base mb-0.5">🏹</span>
                <span>Ular Diburu Masif</span>
                <span className="block text-[10px] font-normal text-rose-300 mt-0.5">Ular lenyap</span>
              </button>

              <button
                onClick={() => handleTestShock('NORMAL')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                  snakeShock === 'NORMAL' && !pesticideShock
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                    : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <span className="block text-base mb-0.5">⚖️</span>
                <span>Ekosistem Seimbang</span>
                <span className="block text-[10px] font-normal text-emerald-300 mt-0.5">Kondisi Alami</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setPesticideShock(!pesticideShock);
                }}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                  pesticideShock
                    ? 'bg-amber-950 border-amber-500 text-amber-200 ring-1 ring-amber-500'
                    : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <span className="block text-base mb-0.5">🧪</span>
                <span>Pestisida Berlebihan</span>
                <span className="block text-[10px] font-normal text-amber-300 mt-0.5">{pesticideShock ? 'Aktif' : 'Non-Aktif'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Live Population Meter & Impact Readout (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Dampak Populasi Nyata</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Data Dinamika
              </span>
            </div>

            {/* Dynamic Population Bars */}
            <div className="space-y-3.5 mb-5">
              {/* Rice Yield */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300 flex items-center gap-1">🌾 Hasil Panen Padi</span>
                  <span className={`font-mono tabular-nums ${riceYield < 40 ? 'text-rose-400 font-bold' : 'text-emerald-400'}`}>
                    {riceYield}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${riceYield < 40 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: `${riceYield}%` }}
                  />
                </div>
              </div>

              {/* Rats */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300 flex items-center gap-1">🐀 Populasi Tikus Sawah</span>
                  <span className={`font-mono tabular-nums ${ratPop > 70 ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
                    {ratPop} ekor
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${ratPop > 70 ? 'bg-rose-500' : 'bg-amber-500'}`}
                    style={{ width: `${ratPop}%` }}
                  />
                </div>
              </div>

              {/* Frogs */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300 flex items-center gap-1">🐸 Populasi Katak</span>
                  <span className="font-mono tabular-nums text-slate-300">{frogPop} ekor</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${frogPop}%` }} />
                </div>
              </div>

              {/* Snakes */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300 flex items-center gap-1">🐍 Populasi Ular</span>
                  <span className={`font-mono tabular-nums ${snakePop < 5 ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
                    {snakePop} ekor
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${snakePop < 5 ? 'bg-rose-500' : 'bg-orange-500'}`}
                    style={{ width: `${snakePop}%` }}
                  />
                </div>
              </div>

              {/* Eagles */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300 flex items-center gap-1">🦅 Burung Elang Puncak</span>
                  <span className="font-mono tabular-nums text-slate-300">{eaglePop} ekor</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${eaglePop * 3}%` }} />
                </div>
              </div>
            </div>

            {/* Ecological Diagnosis */}
            <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
              snakeShock === 'HUNTED'
                ? 'bg-rose-950/50 border-rose-800 text-rose-200'
                : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
            }`}>
              {snakeShock === 'HUNTED' ? (
                <>
                  <strong>⚠️ Terjadi Ledakan Hama Tikus!</strong>
                  <p className="mt-1">
                    Karena ular diburu habis, tidak ada pemangsa alami tikus sawah. Tikus berkembang biak tanpa kendali dan merusak 80% tanaman padi petani!
                  </p>
                </>
              ) : (
                <>
                  <strong>✓ Keseimbangan Ekosistem Terjaga:</strong>
                  <p className="mt-1">
                    Setiap rantai makanan bekerja optimal. Predator alami menjaga agar tidak ada satu jenis hama yang mendominasi dan merugikan panen.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Advance CTA */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            {allCleared ? (
              <button
                onClick={() => {
                  soundEngine.playSuccess();
                  onNextMission();
                }}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Lanjut ke Misi 4: Aliran Energi & Daur Materi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <p className="text-[11px] text-slate-400 text-center">
                Susun rantai makanan lengkap & coba simulasi guncangan ular untuk menyelesaikan Misi 3.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
