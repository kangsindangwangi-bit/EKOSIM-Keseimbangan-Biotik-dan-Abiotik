import React from 'react';
import { Award, RotateCcw, Home, Sparkles, BookOpen } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
  onOpenCodex: () => void;
  score: number;
  stars: number;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onClose,
  onPlayAgain,
  onOpenCodex,
  score,
  stars,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in select-none">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl p-6 md:p-8 shadow-2xl text-center space-y-6 text-slate-100">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center text-4xl shadow-xl animate-bounce">
          🌱
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
            SERTIFIKAT PENGHARGAAN IPAS KELAS 6
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white font-['Outfit',sans-serif]">
            Penjaga Keseimbangan Ekosistem
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-lg mx-auto mt-2 leading-relaxed">
            Selamat! Kamu telah berhasil menelusuri hubungan sebab akibat biotik & abiotik, menjaga rantai makanan sawah, dan membuktikan daur materi di alam.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">Total Poin</span>
            <span className="text-2xl font-black font-mono tabular-nums text-amber-400">
              {score}
            </span>
          </div>
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">Bintang Emas</span>
            <span className="text-2xl font-black font-mono tabular-nums text-emerald-400">
              {stars} / 5 ★
            </span>
          </div>
        </div>

        {/* Unlocked Badges */}
        <div className="space-y-2 text-left bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 text-xs">
          <span className="font-bold text-slate-300 block mb-2 text-center text-xs uppercase tracking-wider">
            Lencana Prestasi Ekologi:
          </span>
          <div className="grid grid-cols-2 gap-2 text-slate-300">
            <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg">
              <span>🌳</span>
              <span>Akar Penahan Erosi (3.1)</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg">
              <span>🐝</span>
              <span>Keseimbangan Simbiosis (3.2)</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg">
              <span>🌾</span>
              <span>Rantai Energi Sawah (3.3)</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg">
              <span>♻️</span>
              <span>Daur Materi Pengurai (3.4)</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              soundEngine.playClick();
              onPlayAgain();
            }}
            className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Main Ulang Petualangan</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenCodex();
            }}
            className="w-full sm:w-auto px-5 py-3 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Baca Ulang Materi IPAS</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Menu Utama</span>
          </button>
        </div>
      </div>
    </div>
  );
};
