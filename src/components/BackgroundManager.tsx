import React, { useMemo } from 'react';
import { ScreenState } from '../types';
import { IMAGES } from '../assets/images';

export type BiomeType = 'paddy' | 'forest' | 'river' | 'pond';

export interface BiomeInfo {
  id: BiomeType;
  name: string;
  icon: string;
  image: string;
  accentColor: string;
  dominantAbiotic: string;
  keyBiotik: string;
  brief: string;
}

export const BIOMES: Record<BiomeType, BiomeInfo> = {
  paddy: {
    id: 'paddy',
    name: 'Sawah Terasering',
    icon: '🌾',
    image: IMAGES.heroLandscape,
    accentColor: '#10B981',
    dominantAbiotic: 'Lumpur basah, limpahan sinar surya, saluran irigasi buatan',
    keyBiotik: 'Padi, belalang, katak sawah, tikus, ular, burung pipit',
    brief: 'Ekosistem semi-alami tempat padi berperan sebagai produsen utama penopang jaring makanan kompleks.',
  },
  forest: {
    id: 'forest',
    name: 'Hutan Hujan Tropis',
    icon: '🌲',
    image: IMAGES.envTropicalForest,
    accentColor: '#059669',
    dominantAbiotic: 'Kelembapan tinggi, naungan tajuk kanopi, tanah kaya humus gelap',
    keyBiotik: 'Pohon raksasa, lumut, epifit, serangga, jamur pengurai, cacing',
    brief: 'Kanopi pohon lebat menaungi lantai hutan, menjaga kelembapan mikro dan memacu siklus daur materi tercepat.',
  },
  river: {
    id: 'river',
    name: 'Bantaran & Aliran Sungai',
    icon: '🌊',
    image: IMAGES.envRiverBank,
    accentColor: '#0284C7',
    dominantAbiotic: 'Arus air beroksigen, kerikil halus, batuan sempadan, mineral terlarut',
    keyBiotik: 'Vegetasi tepi sungai, akar penahan tebing, ikan arus deras, burung pemancing',
    brief: 'Akar vegetasi bantaran sungai bekerja menahan erosi tebing agar aliran air tetap jernih dan terlindungi.',
  },
  pond: {
    id: 'pond',
    name: 'Kolam Air Tawar',
    icon: '🪷',
    image: IMAGES.envFreshwaterPond,
    accentColor: '#06B6D4',
    dominantAbiotic: 'Oksigen terlarut, air tenang tembus cahaya, sedimen lumpur dasar',
    keyBiotik: 'Teratai, eceng gondok, ganggang, ikan air tawar, berudu, capung',
    brief: 'Perairan tenang yang sangat dipengaruhi oleh tingkat aerasi oksigen dan kebersihan sedimentasi air.',
  },
};

interface BackgroundManagerProps {
  currentScreen: ScreenState;
  overrideBiome?: BiomeType | null;
  children: React.ReactNode;
}

export const BackgroundManager: React.FC<BackgroundManagerProps> = ({
  currentScreen,
  overrideBiome,
  children,
}) => {
  // Determine natural biome based on active mission if not explicitly overridden
  const activeBiomeKey: BiomeType = useMemo(() => {
    if (overrideBiome) return overrideBiome;

    switch (currentScreen) {
      case 'TITLE':
        return 'paddy';
      case 'MISSION_1': // 3.1 Hubungan dua arah (sungai, pohon kanopi, erosi)
        return 'river';
      case 'MISSION_2': // 3.2 Interaksi antarmakhluk hidup (predasi, mutualisme hutan/taman)
        return 'forest';
      case 'MISSION_3': // 3.3 Jaring makanan sawah
        return 'paddy';
      case 'MISSION_4': // 3.4 Aliran energi & daur materi (kanopi hutan & pengurai)
        return 'forest';
      case 'QUIZ': // Kuis damai di tepian kolam
        return 'pond';
      default:
        return 'paddy';
    }
  }, [currentScreen, overrideBiome]);

  const isTitle = currentScreen === 'TITLE';

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      {/* Background Layer with Crossfade for all 4 environments */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        {(Object.keys(BIOMES) as BiomeType[]).map((biomeKey) => {
          const biome = BIOMES[biomeKey];
          const isActive = biomeKey === activeBiomeKey;
          return (
            <div
              key={biomeKey}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={biome.image}
                alt={biome.name}
                className={`w-full h-full object-cover scale-[1.02] transform transition-transform duration-[15000ms] ease-out ${
                  isTitle ? 'brightness-[0.82] contrast-[1.05]' : 'brightness-[0.52] contrast-[1.1]'
                }`}
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}

        {/* Dynamic Biome Atmosphere Overlays */}
        {activeBiomeKey === 'forest' && (
          <div className="absolute inset-0 bg-emerald-950/20 mix-blend-color pointer-events-none animate-pulse duration-[8000ms]" />
        )}
        {activeBiomeKey === 'river' && (
          <div className="absolute inset-0 bg-cyan-950/20 mix-blend-color pointer-events-none animate-pulse duration-[7000ms]" />
        )}
        {activeBiomeKey === 'pond' && (
          <div className="absolute inset-0 bg-sky-950/20 mix-blend-color pointer-events-none animate-pulse duration-[9000ms]" />
        )}
        {activeBiomeKey === 'paddy' && (
          <div className="absolute inset-0 bg-amber-950/15 mix-blend-color pointer-events-none animate-pulse duration-[10000ms]" />
        )}

        {/* Global Dark Vignette & Readability Scrim */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            isTitle
              ? 'bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-slate-950/20'
              : 'bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80 backdrop-blur-[2px]'
          }`}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};
