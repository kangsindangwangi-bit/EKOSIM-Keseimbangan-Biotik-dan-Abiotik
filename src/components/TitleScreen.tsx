import React, { useEffect } from 'react';
import { Play, Sparkles, BookOpen, Award, Compass } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface TitleScreenProps {
  onStartGame: () => void;
  onSelectMission: () => void;
  stars: number;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStartGame,
  onSelectMission,
  stars,
}) => {
  // Listen for Enter or Space key to start game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        soundEngine.playClick();
        onStartGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStartGame]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between p-6 md:p-10 select-none">
      {/* Ambient floating light rays / particles over BackgroundManager */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 z-0">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl" />
      </div>

      {/* Top Header Bar inside Game Viewport */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/70 border border-emerald-500/30 rounded-full backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">
            IPAS KELAS 6 · KURIKULUM MERDEKA
          </span>
        </div>

        {stars > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/80 border border-amber-600/40 rounded-xl text-xs font-bold text-amber-300 backdrop-blur-md">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{stars}/5 Bintang</span>
          </div>
        )}
      </div>

      {/* Centerpiece: Bespoke Title Lockup */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Bespoke inline SVG emblem */}
        <div className="mb-4">
          <svg className="w-16 h-16 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="url(#paint0_linear)" strokeWidth="2" strokeDasharray="4 2" />
            <path
              d="M32 12C32 12 24 22 24 30C24 34.4183 27.5817 38 32 38C36.4183 38 40 34.4183 40 30C40 22 32 12 32 12Z"
              fill="#10B981"
              fillOpacity="0.85"
            />
            <path
              d="M32 38V52M22 46L32 38L42 46"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="30" r="3" fill="#FEF08A" />
            <defs>
              <linearGradient id="paint0_linear" x1="2" y1="2" x2="62" y2="62" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10B981" />
                <stop offset="0.5" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-3 drop-shadow-lg font-['Outfit',sans-serif]">
          EKOSIM<span className="text-emerald-400">.</span>
        </h1>
        <p className="text-lg sm:text-2xl font-bold text-emerald-300 mb-2 drop-shadow">
          Keseimbangan Biotik & Abiotik
        </p>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed drop-shadow-sm font-medium">
          Jelajahi hubungan dua arah antarmakhluk hidup dan lingkungannya. Kendalikan cahaya, air, dan tanah, selesaikan jaring-jaring makanan, serta buktikan aliran energi di alam!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center">
          <button
            onClick={() => {
              soundEngine.playSuccess();
              onStartGame();
            }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>Mulai Petualangan</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onSelectMission();
            }}
            className="w-full sm:w-auto px-6 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-sm rounded-2xl backdrop-blur-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Pilih Misi (1-4)</span>
          </button>
        </div>
      </div>

      {/* Bottom Flat Control Hint Line */}
      <div className="relative z-10 text-center">
        <p className="text-xs font-medium text-slate-400 tracking-wider">
          Tekan <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-200 rounded font-mono text-[10px]">Spasi</kbd> atau <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-200 rounded font-mono text-[10px]">Enter</kbd> untuk Mulai · Klik untuk Interaksi Lingkungan
        </p>
      </div>
    </div>
  );
};
