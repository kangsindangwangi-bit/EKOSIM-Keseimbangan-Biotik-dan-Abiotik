import React from 'react';
import { X, Sparkles, Check, Compass } from 'lucide-react';
import { BIOMES, BiomeType } from './BackgroundManager';
import { soundEngine } from '../utils/audio';

interface BiomeSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeBiome: BiomeType;
  onSelectBiome: (biome: BiomeType | null) => void;
  isAuto: boolean;
}

export const BiomeSwitcherModal: React.FC<BiomeSwitcherModalProps> = ({
  isOpen,
  onClose,
  activeBiome,
  onSelectBiome,
  isAuto,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in select-none">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-white tracking-wide">
                Pengelola Latar Lingkungan (Biome Manager)
              </h2>
              <p className="text-xs text-slate-400">
                Ubah visual habitat untuk mengamati perbedaan faktor biotik & abiotik
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auto mode toggle strip */}
        <div className="px-6 py-3 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-300">
            Mode Latar: <strong>{isAuto ? 'Otomatis Sesuai Misi Aktif' : 'Dipilih Manual'}</strong>
          </span>
          <button
            onClick={() => {
              soundEngine.playClick();
              onSelectBiome(null); // Reset to auto
            }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isAuto
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Otomatis (Rekomendasi)</span>
          </button>
        </div>

        {/* Grid of Biomes */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Object.keys(BIOMES) as BiomeType[]).map((biomeKey) => {
            const biome = BIOMES[biomeKey];
            const isSelected = activeBiome === biomeKey;

            return (
              <div
                key={biomeKey}
                onClick={() => {
                  soundEngine.playClick();
                  onSelectBiome(biomeKey);
                }}
                className={`group rounded-xl border p-4 cursor-pointer transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative h-28 w-full rounded-lg overflow-hidden mb-3 border border-slate-800">
                    <img
                      src={biome.image}
                      alt={biome.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm text-xs font-bold text-white flex items-center gap-1">
                      <span>{biome.icon}</span>
                      <span>{biome.name}</span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 p-1 rounded-full bg-emerald-500 text-slate-950 font-bold">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    {biome.brief}
                  </p>

                  <div className="space-y-1 text-[11px]">
                    <div className="text-slate-400">
                      <strong className="text-slate-300">Abiotik Dominan:</strong> {biome.dominantAbiotic}
                    </div>
                    <div className="text-slate-400">
                      <strong className="text-slate-300">Biotik Khas:</strong> {biome.keyBiotik}
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playClick();
                    onSelectBiome(biomeKey);
                  }}
                  className={`w-full py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 group-hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isSelected ? 'Sedang Aktif' : 'Terapkan Habitat Ini'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
