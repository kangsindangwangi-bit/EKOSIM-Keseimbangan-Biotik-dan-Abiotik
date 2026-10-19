import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';
import { IMAGES } from '../assets/images';
import { Zap, RefreshCw, CheckCircle2, ArrowRight, Flame, HelpCircle } from 'lucide-react';

interface Mission4Props {
  onComplete: () => void;
  onGoToQuiz: () => void;
}

interface SorterItem {
  id: string;
  text: string;
  category: 'ENERGY' | 'MATTER';
  hint: string;
}

const MASTER_SORTER_ITEMS: SorterItem[] = [
  {
    id: 's1',
    text: 'Berasal dari radiasi cahaya matahari dan tidak pernah dapat kembali lagi ke matahari.',
    category: 'ENERGY',
    hint: 'Energi matahari mengalir masuk satu arah ke biosfer.',
  },
  {
    id: 's2',
    text: 'Bergerak berputar terus-menerus melalui air, karbon, nitrogen, dan mineral tanah.',
    category: 'MATTER',
    hint: 'Materi mengalami siklus atau daur biogeokimia.',
  },
  {
    id: 's3',
    text: 'Pada setiap perpindahan tingkat trofik rantai makanan, sebagian besar dilepaskan ke lingkungan sebagai energi panas.',
    category: 'ENERGY',
    hint: 'Energi panas hilang ke atmosfer saat makhluk hidup bernapas dan beraktivitas.',
  },
  {
    id: 's4',
    text: 'Pengurai (jamur & cacing) memecah sisa daun gugur dan bangkai agar hara dapat diserap kembali oleh akar tumbuhan baru.',
    category: 'MATTER',
    hint: 'Pengurai menjaga ketersediaan materi hara di dalam tanah.',
  },
  {
    id: 's5',
    text: 'Hanya bergerak satu arah (linear) dari produsen ke konsumen tanpa adanya siklus pembalikan.',
    category: 'ENERGY',
    hint: 'Rantai makanan menunjukkan aliran energi linear.',
  },
  {
    id: 's6',
    text: 'Molekul air dan mineral di bumi tidak hilang, melainkan terus didaur ulang melalui lingkungan dan tubuh makhluk hidup.',
    category: 'MATTER',
    hint: 'Materi tidak diciptakan atau dimusnahkan dalam ekosistem, melainkan berputar.',
  },
  {
    id: 's7',
    text: 'Memerlukan pasokan gelombang radiasi baru secara konstan dari luar bumi agar ekosistem tidak mati.',
    category: 'ENERGY',
    hint: 'Tanpa fotosintesis dari sinar surya, cadangan energi makanan akan habis.',
  },
  {
    id: 's8',
    text: 'Membentuk siklus tertutup di mana unsur-unsur kimia organik tidak pernah meninggalkan bumi.',
    category: 'MATTER',
    hint: 'Daur materi berlangsung secara sirkular dan berulang.',
  },
];

export const Mission4EnergyAndMatter: React.FC<Mission4Props> = ({ onComplete, onGoToQuiz }) => {
  // Randomize the order of statements on initial mount so pattern cannot be guessed!
  const [shuffledItems] = useState<SorterItem[]>(() => {
    return [...MASTER_SORTER_ITEMS].sort(() => Math.random() - 0.5);
  });

  const [sortedItems, setSortedItems] = useState<{ [id: string]: 'ENERGY' | 'MATTER' }>({});
  const [feedback, setFeedback] = useState<{ id: string; isCorrect: boolean } | null>(null);
  const [activeStep, setActiveStep] = useState<'ENERGY' | 'MATTER' | 'COMPARISON'>('COMPARISON');
  const [allCleared, setAllCleared] = useState<boolean>(false);

  // Handle sorting a statement
  const handleSortItem = (item: SorterItem, targetCategory: 'ENERGY' | 'MATTER') => {
    soundEngine.playClick();
    const isCorrect = item.category === targetCategory;

    if (isCorrect) {
      soundEngine.playSuccess();
      const updated = { ...sortedItems, [item.id]: targetCategory };
      setSortedItems(updated);
      setFeedback({ id: item.id, isCorrect: true });

      // Check if all sorted
      if (Object.keys(updated).length >= shuffledItems.length && !allCleared) {
        setAllCleared(true);
        soundEngine.playVictoryFanfare();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        onComplete();
      }
    } else {
      soundEngine.playWrong();
      setFeedback({ id: item.id, isCorrect: false });
    }
  };

  const remainingItems = shuffledItems.filter((item) => !sortedItems[item.id]);

  return (
    <div className="w-full min-h-screen pt-16 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-6 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Misi 4 · Materi 3.4
            </span>
            <span className="text-xs text-slate-400">· Hukum Kelangsungan Alam</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white font-['Outfit',sans-serif]">
            Aliran Energi & Daur Materi
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
            Dua prinsip utama: <strong>Energi mengalir satu arah</strong> dan dilepaskan sebagai panas, sedangkan <strong>Materi berputar dalam daur tak terputus</strong> melalui pengurai.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800 shrink-0">
          <span className="text-xs text-slate-400">Tersortir:</span>
          <span className="font-mono tabular-nums font-bold text-cyan-400 text-sm">
            {Object.keys(sortedItems).length} / {shuffledItems.length} Prinsip
          </span>
        </div>
      </div>

      {/* Visual Infographic & Diagram Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-hidden flex flex-col gap-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Diagram Interaktif: Siklus Materi & Aliran Energi</span>
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveStep('ENERGY');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                activeStep === 'ENERGY' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Fokus: Aliran Energi
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveStep('MATTER');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                activeStep === 'MATTER' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Fokus: Daur Materi
            </button>
          </div>
        </div>

        {/* Diagram Image & Annotated Visual Overlay */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 h-64 md:h-80 relative overflow-hidden">
            <img
              src={IMAGES.nutrientEnergyCycle}
              alt="Daur Materi dan Aliran Energi"
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/20 to-slate-950" />
          </div>

          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center gap-4 bg-slate-950/90">
            {/* Box 1: Aliran Energi */}
            <div className={`p-4 rounded-xl border transition-all ${
              activeStep === 'ENERGY' ? 'bg-amber-950/40 border-amber-500 shadow-lg' : 'bg-slate-900/70 border-slate-800'
            }`}>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>1. Aliran Energi: Satu Arah (Linear)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Matahari ➔ Tumbuhan Hijau (Produsen) ➔ Hewan Herbivora ➔ Karnivora. Pada setiap tingkatan, sebagian energi dipakai beraktivitas dan dilepas sebagai <strong>panas</strong>. Energi ini tidak pernah kembali ke matahari!
              </p>
            </div>

            {/* Box 2: Daur Materi */}
            <div className={`p-4 rounded-xl border transition-all ${
              activeStep === 'MATTER' ? 'bg-emerald-950/40 border-emerald-500 shadow-lg' : 'bg-slate-900/70 border-slate-800'
            }`}>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                <RefreshCw className="w-4 h-4 text-emerald-400" />
                <span>2. Daur Materi: Berputar Berulang (Siklus)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Air, karbon, dan unsur hara tanah diserap tanaman, dimakan hewan, lalu bangkai dan daun gugur dipecah oleh <strong>pengurai (cacing & jamur)</strong> kembali ke tanah untuk diserap kembali oleh tumbuhan baru!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Interactive Concept Sorter Arena */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>Tantangan Klasifikasi: Kelompokkan Pernyataan Sains</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tentukan apakah pernyataan berikut merupakan karakteristik dari <strong>Aliran Energi</strong> atau <strong>Daur Materi</strong>!
          </p>
        </div>

        {/* Unsorted Items Pool */}
        {remainingItems.length > 0 ? (
          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 block">
              Pernyataan Sains yang Belum Dikelompokkan:
            </span>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700/80 shadow-md">
              <p className="text-sm font-semibold text-white mb-3">
                "{remainingItems[0].text}"
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleSortItem(remainingItems[0], 'ENERGY')}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 active:scale-95 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Zap className="w-4 h-4" />
                  <span>Ini Aliran Energi (Satu Arah)</span>
                </button>

                <button
                  onClick={() => handleSortItem(remainingItems[0], 'MATTER')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Ini Daur Materi (Berputar Berulang)</span>
                </button>
              </div>

              {feedback && !feedback.isCorrect && (
                <p className="text-xs text-rose-400 font-semibold mt-2.5">
                  ⚠️ Belum tepat. Ingat: Energi berasal dari matahari dan lepas sebagai panas, sedangkan materi (unsur hara & air) terus didaur ulang oleh pengurai!
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-emerald-950/50 border border-emerald-700 rounded-xl flex items-center justify-between gap-4 text-xs text-emerald-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-sm block text-emerald-200">
                  🎉 Semua Prinsip Berhasil Dikelompokkan dengan Sempurna!
                </strong>
                <p className="text-xs text-slate-300 mt-0.5">
                  Kamu telah memahami perbedaan mendasar antara Aliran Energi (satu arah) dan Daur Materi (berputar terus-menerus).
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playSuccess();
                onGoToQuiz();
              }}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md whitespace-nowrap"
            >
              <span>Uji Kemampuan di Kuis Akhir</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Two Classification Bins */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bin A: Aliran Energi */}
          <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Zap className="w-4 h-4" />
              <span>Karakteristik Aliran Energi (Satu Arah)</span>
            </div>
            <div className="space-y-2 min-h-[120px]">
              {shuffledItems.filter((i) => sortedItems[i.id] === 'ENERGY').map((item) => (
                <div key={item.id} className="p-2.5 bg-slate-900/90 border border-amber-700/50 rounded-lg text-xs text-slate-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item.text}</span>
                </div>
              ))}
              {shuffledItems.filter((i) => sortedItems[i.id] === 'ENERGY').length === 0 && (
                <p className="text-xs text-slate-500 italic p-3 text-center">
                  Belum ada pernyataan yang dimasukkan ke kotak ini.
                </p>
              )}
            </div>
          </div>

          {/* Bin B: Daur Materi */}
          <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <RefreshCw className="w-4 h-4" />
              <span>Karakteristik Daur Materi (Berulang)</span>
            </div>
            <div className="space-y-2 min-h-[120px]">
              {shuffledItems.filter((i) => sortedItems[i.id] === 'MATTER').map((item) => (
                <div key={item.id} className="p-2.5 bg-slate-900/90 border border-emerald-700/50 rounded-lg text-xs text-slate-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item.text}</span>
                </div>
              ))}
              {shuffledItems.filter((i) => sortedItems[i.id] === 'MATTER').length === 0 && (
                <p className="text-xs text-slate-500 italic p-3 text-center">
                  Belum ada pernyataan yang dimasukkan ke kotak ini.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
