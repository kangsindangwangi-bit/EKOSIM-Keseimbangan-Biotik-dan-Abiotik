import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SYMBIOSIS_DATA } from '../data/curriculumData';
import { SymbiosisItem } from '../types';
import { soundEngine } from '../utils/audio';
import { IMAGES } from '../assets/images';
import { ArrowRight, CheckCircle2, AlertCircle, Play, Sparkles, RefreshCw } from 'lucide-react';

interface Mission2Props {
  onComplete: () => void;
  onNextMission: () => void;
}

export const Mission2Interactions: React.FC<Mission2Props> = ({ onComplete, onNextMission }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [completedItems, setCompletedItems] = useState<{ [id: string]: boolean }>({});
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const [allCleared, setAllCleared] = useState<boolean>(false);

  const currentItem: SymbiosisItem = SYMBIOSIS_DATA[selectedIdx];

  const handleTestInteraction = (chosenType: string) => {
    soundEngine.playClick();
    setSelectedType(chosenType);

    if (chosenType === currentItem.type) {
      soundEngine.playSuccess();
      setIsSimulating(true);

      setTimeout(() => {
        setIsSimulating(false);
        const updated = { ...completedItems, [currentItem.id]: true };
        setCompletedItems(updated);
        setSimulationResult('Benar! Interaksi berhasil dianalisis dengan tepat.');

        // Check if all 4 are completed
        if (Object.keys(updated).length >= SYMBIOSIS_DATA.length && !allCleared) {
          setAllCleared(true);
          soundEngine.playVictoryFanfare();
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
          onComplete();
        }
      }, 1200);
    } else {
      soundEngine.playWrong();
      setSimulationResult('Belum tepat! Coba pelajari keuntungan atau kerugian kedua organisme.');
    }
  };

  const handleNextEncounter = () => {
    soundEngine.playClick();
    const nextIdx = (selectedIdx + 1) % SYMBIOSIS_DATA.length;
    setSelectedIdx(nextIdx);
    setSelectedType(null);
    setSimulationResult(null);
  };

  const ALL_OPTIONS = [
    { type: 'PREDASI', label: 'Predasi', desc: 'Satu makan yang lain' },
    { type: 'KOMPETISI', label: 'Kompetisi', desc: 'Bersaing sumber daya' },
    { type: 'MUTUALISME', label: 'Mutualisme', desc: 'Keduanya untung' },
    { type: 'PARASITISME', label: 'Parasitisme', desc: 'Satu untung, satu rugi' },
  ];

  // Randomize interaction choices per encounter so answer positions are unpredictable
  const randomizedOptions = React.useMemo(() => {
    return [...ALL_OPTIONS].sort(() => Math.random() - 0.5);
  }, [selectedIdx]);

  const isCurrentItemSolved = Boolean(completedItems[currentItem.id]);

  return (
    <div className="w-full min-h-screen pt-16 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-6 select-none">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Misi 2 · Materi 3.2
            </span>
            <span className="text-xs text-slate-400">· Arena Makhluk Hidup</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white font-['Outfit',sans-serif]">
            Interaksi Antarmakhluk Hidup Membentuk Ekosistem
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
            Makhluk hidup berinteraksi satu sama lain melalui predasi, kompetisi, mutualisme, atau parasitisme. Analisis dampaknya bagi keseimbangan populasi!
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800 shrink-0">
          <span className="text-xs text-slate-400">Terselesaikan:</span>
          <span className="font-mono tabular-nums font-bold text-emerald-400 text-sm">
            {Object.keys(completedItems).length} / {SYMBIOSIS_DATA.length}
          </span>
        </div>
      </div>

      {/* Encounter Switcher Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {SYMBIOSIS_DATA.map((item, idx) => {
          const isDone = completedItems[item.id];
          const isCurrent = idx === selectedIdx;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundEngine.playClick();
                setSelectedIdx(idx);
                setSelectedType(null);
                setSimulationResult(null);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                isCurrent
                  ? 'bg-blue-950/70 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{item.speciesA.icon}</span>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {isDone ? item.type : 'Tantangan #' + (idx + 1)}
                  </span>
                </div>
              </div>
              {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Interactive Arena Box (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          {/* Top of Arena */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Kasus Ekologis #{selectedIdx + 1}
              </span>
              <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-200 rounded-full font-mono">
                {currentItem.speciesA.name} ⚔️ {currentItem.speciesB.name}
              </span>
            </div>

            {/* Duel / Symbiosis Visual Showcase with Forest Background */}
            <div className="relative h-56 sm:h-64 rounded-xl border border-slate-800 flex items-center justify-around p-4 overflow-hidden shadow-inner">
              {/* Habitat Forest Image Background */}
              <img
                src={IMAGES.envTropicalForest}
                alt="Habitat Hutan Tropis"
                className="absolute inset-0 w-full h-full object-cover opacity-50 brightness-75 scale-105 pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/70 pointer-events-none" />

              {/* Creature A */}
              <div className={`relative z-10 flex flex-col items-center gap-2 transition-transform duration-500 ${isSimulating ? 'scale-125' : ''}`}>
                <div className="w-20 h-20 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md flex items-center justify-center text-4xl shadow-xl">
                  {currentItem.speciesA.icon}
                </div>
                <span className="text-xs font-bold text-white text-center drop-shadow-sm">
                  {currentItem.speciesA.name}
                </span>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-950/90 text-emerald-400 border border-emerald-900/50 backdrop-blur-sm">
                  Peran: {currentItem.speciesA.role}
                </span>
              </div>

              {/* Center Action Link Icon */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-lg ${
                  isSimulating
                    ? 'bg-amber-500 text-slate-950 animate-spin scale-110'
                    : 'bg-slate-900/90 text-slate-300 border border-slate-700 backdrop-blur-md'
                }`}>
                  {isSimulating ? <Sparkles className="w-5 h-5" /> : <RefreshCw className="w-4 h-4" />}
                </div>
                <span className="text-[10px] text-slate-300 font-mono bg-slate-950/70 px-1.5 py-0.5 rounded">
                  {isSimulating ? 'Berinteraksi...' : 'Hubungan'}
                </span>
              </div>

              {/* Creature B */}
              <div className={`relative z-10 flex flex-col items-center gap-2 transition-transform duration-500 ${isSimulating ? 'scale-90 opacity-80' : ''}`}>
                <div className="w-20 h-20 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md flex items-center justify-center text-4xl shadow-xl">
                  {currentItem.speciesB.icon}
                </div>
                <span className="text-xs font-bold text-white text-center drop-shadow-sm">
                  {currentItem.speciesB.name}
                </span>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-950/90 text-rose-400 border border-rose-900/50 backdrop-blur-sm">
                  Peran: {currentItem.speciesB.role}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Classification Buttons (Randomized Order) */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 block">
                Tentukan Jenis Interaksi Antara Kedua Organisme Ini:
              </label>
              <span className="text-[10px] text-slate-400 italic">Pilihan diacak</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {randomizedOptions.map((opt) => (
                <button
                  key={opt.type}
                  onClick={() => handleTestInteraction(opt.type)}
                  disabled={isSimulating}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer active:scale-95 flex flex-col items-center justify-center gap-1 ${
                    selectedType === opt.type
                      ? opt.type === currentItem.type
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                        : 'bg-rose-600 border-rose-400 text-white'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700/80'
                  }`}
                >
                  <span className="text-xs font-extrabold">{opt.label}</span>
                  <span className="text-[10px] opacity-75">{opt.desc}</span>
                </button>
              ))}
            </div>

            {/* Feedback message */}
            {simulationResult && (
              <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                selectedType === currentItem.type
                  ? 'bg-emerald-950/60 border border-emerald-700 text-emerald-300'
                  : 'bg-rose-950/60 border border-rose-700 text-rose-300'
              }`}>
                {selectedType === currentItem.type ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                )}
                <span>{simulationResult}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Explanation & Ecological Consequence Box (5 cols) - GATED AFTER CORRECT ANSWER */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex-1 flex flex-col justify-between">
            {isCurrentItemSolved ? (
              <div className="animate-fade-in">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Analisis Ekologi Nyata (Terbuka)
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {currentItem.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {currentItem.description}
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
                    <span className="font-bold text-slate-300 block mb-1">
                      🔍 Pengamatan Lapangan:
                    </span>
                    <p className="text-slate-400">{currentItem.example}</p>
                  </div>

                  <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-800/40 text-xs">
                    <span className="font-bold text-amber-300 block mb-1">
                      ⚖️ Akibat Perubahan Populasi:
                    </span>
                    <p className="text-amber-200/90">{currentItem.consequence}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center my-auto py-12 text-center space-y-3 bg-slate-950/50 rounded-xl border border-dashed border-slate-800 p-6">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-xl">
                  🔒
                </div>
                <h4 className="text-sm font-bold text-slate-200">
                  Analisis Ekologi Terkunci
                </h4>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Tentukan jenis interaksi antara <strong>{currentItem.speciesA.name}</strong> dan <strong>{currentItem.speciesB.name}</strong> dengan benar untuk membuka data penelitian sains lengkap!
                </p>
              </div>
            )}

            {/* Next encounter or next mission CTA */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={handleNextEncounter}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Kasus Berikutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {allCleared && (
                <button
                  onClick={() => {
                    soundEngine.playSuccess();
                    onNextMission();
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <span>Lanjut ke Misi 3</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
