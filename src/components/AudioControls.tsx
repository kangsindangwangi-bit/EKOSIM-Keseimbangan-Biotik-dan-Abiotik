import React from 'react';
import { Volume2, VolumeX, BookOpen, RotateCcw, Home } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface AudioControlsProps {
  onOpenCodex: () => void;
  onOpenBiome?: () => void;
  currentBiomeName?: string;
  currentBiomeIcon?: string;
  onGoHome?: () => void;
  onRestartCurrent?: () => void;
  currentScreenTitle?: string;
  score?: number;
  stars?: number;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  onOpenCodex,
  onOpenBiome,
  currentBiomeName,
  currentBiomeIcon,
  onGoHome,
  onRestartCurrent,
  currentScreenTitle,
  score,
  stars,
}) => {
  const [isMuted, setIsMuted] = React.useState(soundEngine.getMuted());

  const handleToggleSound = () => {
    const nextState = soundEngine.toggleMute();
    setIsMuted(nextState);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between pointer-events-none select-none">
      {/* Left zone: Brand or Current Mission title */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {onGoHome && (
          <button
            onClick={() => {
              soundEngine.playClick();
              onGoHome();
            }}
            title="Kembali ke Beranda"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 rounded-lg text-xs font-medium backdrop-blur-md transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span>Menu Utama</span>
          </button>
        )}

        {currentScreenTitle && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-700/60 rounded-lg text-xs font-semibold text-slate-200 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="whitespace-nowrap">{currentScreenTitle}</span>
          </div>
        )}
      </div>

      {/* Center zone: Status scores if in active play */}
      {(score !== undefined || stars !== undefined) && (
        <div className="flex items-center gap-4 px-4 py-1.5 bg-slate-950/80 border border-slate-800 rounded-full backdrop-blur-md pointer-events-auto shadow-md">
          {score !== undefined && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <span className="text-slate-400">Poin:</span>
              <span className="font-mono tabular-nums text-amber-400 font-bold text-sm">{score}</span>
            </div>
          )}
          {stars !== undefined && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 border-l border-slate-800 pl-3">
              <span className="text-amber-400">★</span>
              <span className="font-mono tabular-nums text-emerald-400 font-bold text-sm">{stars}/5 Bintang</span>
            </div>
          )}
        </div>
      )}

      {/* Right zone: Action tools */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {onRestartCurrent && (
          <button
            onClick={() => {
              soundEngine.playClick();
              onRestartCurrent();
            }}
            title="Mulai Ulang Misi Ini"
            className="p-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 rounded-lg backdrop-blur-md transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}

        {onOpenBiome && currentBiomeName && (
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenBiome();
            }}
            title="Ganti Visual Habitat / Lingkungan"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 rounded-lg text-xs font-semibold backdrop-blur-md transition-all active:scale-95 shadow-sm whitespace-nowrap shrink-0"
          >
            <span>{currentBiomeIcon || '🌍'}</span>
            <span className="hidden sm:inline">{currentBiomeName}</span>
          </button>
        )}

        <button
          onClick={() => {
            soundEngine.playClick();
            onOpenCodex();
          }}
          title="Buku Panduan Materi (IPAS 6)"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60 rounded-lg text-xs font-semibold backdrop-blur-md transition-all active:scale-95 shadow-sm whitespace-nowrap shrink-0"
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Materi IPAS</span>
        </button>

        <button
          onClick={handleToggleSound}
          title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          className={`p-2 border rounded-lg backdrop-blur-md transition-all active:scale-95 ${
            isMuted
              ? 'bg-rose-950/80 text-rose-300 border-rose-800/60'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700/60'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
