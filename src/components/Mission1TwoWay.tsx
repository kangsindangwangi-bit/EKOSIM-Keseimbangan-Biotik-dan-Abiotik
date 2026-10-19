import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sun, CloudRain, TreePine, Droplets, Sparkles, CheckCircle2, ArrowRight, Info, AlertTriangle } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { IMAGES } from '../assets/images';

interface Mission1Props {
  onComplete: () => void;
  onNextMission: () => void;
}

export const Mission1TwoWay: React.FC<Mission1Props> = ({ onComplete, onNextMission }) => {
  // Abiotic & Biotic parameters
  const [sunlight, setSunlight] = useState<number>(65); // 0-100%
  const [waterMoisture, setWaterMoisture] = useState<number>(60); // 0-100%
  const [treeCount, setTreeCount] = useState<number>(3); // 0-6 trees
  const [pondOxygen, setPondOxygen] = useState<number>(55); // 0-100%
  const [decomposers, setDecomposers] = useState<number>(2); // 0-5 decomposer colonies
  const [leavesFallen, setLeavesFallen] = useState<number>(4);

  // Objectives completed flags
  const [quest1Done, setQuest1Done] = useState<boolean>(false);
  const [quest2Done, setQuest2Done] = useState<boolean>(false);
  const [quest3Done, setQuest3Done] = useState<boolean>(false);
  const [allCleared, setAllCleared] = useState<boolean>(false);

  // Active highlighted scientific card
  const [activeConcept, setActiveConcept] = useState<string>('light');

  // Computed Biotic & Abiotic consequences
  // 1. Photosynthesis state
  const isPhotosynthesisActive = sunlight >= 35 && sunlight <= 85 && waterMoisture >= 30;
  
  // 2. Local temperature (influenced by sun and tree canopy!)
  // Base 36°C with 100% sun, drops by 2°C per tree canopy shade!
  const localTemp = Math.round(22 + (sunlight * 0.16) - (treeCount * 1.8));

  // 3. Soil fertility: rises with decomposers and fallen leaves
  const soilFertility = Math.min(100, Math.round(decomposers * 18 + leavesFallen * 3));

  // 4. River bank stability: erosion drops as tree roots bind soil
  const riverErosionRisk = Math.max(5, Math.round(85 - treeCount * 13));
  const isWaterTurbid = riverErosionRisk > 50;

  // 5. Fish stress state: stress if pond oxygen < 40 or water too dirty
  const isFishStressed = pondOxygen < 45 || isWaterTurbid;

  // 6. Grass and plant condition
  let plantHealthText = 'Subur & Segar';
  let plantColor = 'text-emerald-400';
  if (waterMoisture < 25) {
    plantHealthText = 'Layu Kering (Kurang Air)';
    plantColor = 'text-amber-500';
  } else if (sunlight < 25) {
    plantHealthText = 'Pucat & Kerdil (Kurang Cahaya)';
    plantColor = 'text-yellow-600';
  } else if (sunlight > 90 && waterMoisture < 45) {
    plantHealthText = 'Kering Terbakar Panas';
    plantColor = 'text-orange-600';
  }

  // Check quest completion
  useEffect(() => {
    // Quest 1: Sejukkan Suhu & Tahan Erosi (Trees >= 4, localTemp <= 27, waterMoisture >= 50)
    if (treeCount >= 4 && localTemp <= 27 && waterMoisture >= 50 && !quest1Done) {
      setQuest1Done(true);
      soundEngine.playSuccess();
    }

    // Quest 2: Pulihkan Kolam Ikan (Pond oxygen >= 75 and not turbid)
    if (pondOxygen >= 75 && !isWaterTurbid && !quest2Done) {
      setQuest2Done(true);
      soundEngine.playSuccess();
    }

    // Quest 3: Daur Kesuburan Tanah (Decomposers >= 4, soilFertility >= 70)
    if (decomposers >= 4 && soilFertility >= 70 && !quest3Done) {
      setQuest3Done(true);
      soundEngine.playSuccess();
    }
  }, [treeCount, localTemp, waterMoisture, pondOxygen, isWaterTurbid, decomposers, soilFertility, quest1Done, quest2Done, quest3Done]);

  // Overall completion trigger
  useEffect(() => {
    if (quest1Done && quest2Done && quest3Done && !allCleared) {
      setAllCleared(true);
      soundEngine.playVictoryFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onComplete();
    }
  }, [quest1Done, quest2Done, quest3Done, allCleared, onComplete]);

  return (
    <div className="w-full min-h-screen pt-16 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-6 select-none">
      {/* Top Mission Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Misi 1 · Materi 3.1
            </span>
            <span className="text-xs text-slate-400">· Simfoni Sebab & Akibat</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white font-['Outfit',sans-serif]">
            Hubungan Dua Arah: Biotik ⇄ Abiotik
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
            Komponen biotik dipengaruhi faktor abiotik, dan organisme juga dapat mengubah kondisi abiotik di sekitarnya. Geser parameter dan amati perubahannya!
          </p>
        </div>

        {/* Quests Summary Checklist */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800 shrink-0">
          <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${quest1Done ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50' : 'bg-slate-900 text-slate-400'}`}>
            <CheckCircle2 className={`w-3.5 h-3.5 ${quest1Done ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>Tantangan 1: Naungan & Erosi</span>
          </div>
          <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${quest2Done ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50' : 'bg-slate-900 text-slate-400'}`}>
            <CheckCircle2 className={`w-3.5 h-3.5 ${quest2Done ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>Tantangan 2: Kolam Oksigen</span>
          </div>
          <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${quest3Done ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50' : 'bg-slate-900 text-slate-400'}`}>
            <CheckCircle2 className={`w-3.5 h-3.5 ${quest3Done ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>Tantangan 3: Daur Hara</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Stage & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Zone: Live Simulation Interactive Viewport (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-xl">
          {/* Viewport Top Bar Indicators */}
          <div className="bg-slate-950/80 border-b border-slate-800/80 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <span className="text-slate-400">
                Suhu Lokal: <strong className={`tabular-nums font-mono ${localTemp > 30 ? 'text-rose-400' : 'text-emerald-400'}`}>{localTemp}°C</strong>
              </span>
              <span className="text-slate-400">
                Risiko Erosi Sempadan: <strong className={`tabular-nums font-mono ${riverErosionRisk > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>{riverErosionRisk}%</strong>
              </span>
              <span className="text-slate-400">
                Kesuburan Tanah: <strong className="tabular-nums font-mono text-emerald-400">{soilFertility}%</strong>
              </span>
            </div>
            <div className="text-slate-300 font-medium">
              Status Tumbuhan: <span className={`font-bold ${plantColor}`}>{plantHealthText}</span>
            </div>
          </div>

          {/* Living Ecosystem Canvas / Interactive Graphic Stage */}
          <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-xl flex flex-col justify-between p-4 shadow-inner">
            {/* Real Habitat River Bank Image Layer */}
            <img
              src={IMAGES.envRiverBank}
              alt="Habitat Bantaran Sungai"
              className="absolute inset-0 w-full h-full object-cover opacity-45 brightness-90 scale-105 pointer-events-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-sky-950/60 via-slate-950/40 to-slate-950/80 pointer-events-none" />

            {/* Dynamic Sky & Sun */}
            <div className="relative z-10 self-end flex flex-col items-center pointer-events-none">
              <div
                className="rounded-full transition-all duration-700 flex items-center justify-center shadow-lg"
                style={{
                  width: `${36 + sunlight * 0.4}px`,
                  height: `${36 + sunlight * 0.4}px`,
                  backgroundColor: sunlight > 80 ? '#F97316' : '#FBBF24',
                  boxShadow: `0 0 ${sunlight * 0.6}px rgba(251, 191, 36, 0.8)`,
                }}
              >
                <Sun className="w-6 h-6 text-amber-950 animate-spin duration-[20000ms]" />
              </div>
              <span className="text-[10px] text-amber-200/90 font-mono font-bold mt-1 bg-slate-950/60 px-1.5 rounded">
                Cahaya: {sunlight}%
              </span>
            </div>

            {/* Rain visualization if waterMoisture > 50 */}
            {waterMoisture > 45 && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 z-10">
                <div className="w-full h-full bg-[radial-gradient(circle,_#38bdf8_1px,_transparent_1px)] [background-size:20px_20px] animate-pulse" />
              </div>
            )}

            {/* Photosynthesis Particle Emitters if active */}
            {isPhotosynthesisActive && (
              <div className="absolute top-1/3 left-1/4 pointer-events-none flex items-center gap-1.5 px-2 py-1 bg-emerald-950/70 border border-emerald-500/40 rounded-full text-[10px] text-emerald-300 backdrop-blur-sm animate-bounce">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Fotosintesis Aktif: Menghasilkan Glukosa & O₂</span>
              </div>
            )}

            {/* Midground: Terraced Rice Field, Trees, and River */}
            <div className="relative z-10 mt-auto w-full">
              {/* Planted trees along river bank */}
              <div className="flex items-end justify-start gap-3 mb-2 pl-4">
                {Array.from({ length: treeCount }).map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                    <TreePine className="w-12 h-14 text-emerald-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                    <span className="text-[9px] text-emerald-200 bg-slate-950/70 px-1 rounded font-mono">
                      Akar Ikat Tanah
                    </span>
                  </div>
                ))}
                {treeCount === 0 && (
                  <div className="text-xs text-rose-300 bg-rose-950/80 px-2 py-1 rounded border border-rose-800">
                    ⚠️ Bantaran Gundul! Belum ada pohon penahan erosi tanah.
                  </div>
                )}
              </div>

              {/* River Bed & Pond */}
              <div className={`h-24 w-full rounded-xl p-3 flex items-center justify-between transition-colors duration-500 border ${
                isWaterTurbid
                  ? 'bg-amber-950/80 border-amber-800'
                  : 'bg-cyan-900/80 border-cyan-700/60'
              }`}>
                {/* River water state */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <Droplets className={`w-4 h-4 ${isWaterTurbid ? 'text-amber-400' : 'text-cyan-300'}`} />
                    <span className="text-xs font-bold text-white">
                      {isWaterTurbid ? 'Sungai Keruh (Tergerus Erosi)' : 'Aliran Sungai Jernih & Terlindungi'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-300">
                    {treeCount >= 3 ? 'Akar pohon memperlambat limpasan air hujan.' : 'Bantaran tanpa pohon membuat tanah runtuh ke sungai.'}
                  </span>
                </div>

                {/* Pond Fish & Oxygen */}
                <div className="flex items-center gap-3 bg-slate-950/60 p-2.5 rounded-lg border border-slate-700/60">
                  <div className="text-2xl transition-transform">
                    {isFishStressed ? '🐟 💨' : '🐠 ✨'}
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">
                      {isFishStressed ? (
                        <span className="text-rose-400 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Ikan Megap-Megap Stres
                        </span>
                      ) : (
                        <span className="text-emerald-400">Ikan Lincah Sehat</span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      O₂ Terlarut: <strong className="text-cyan-300 font-mono">{pondOxygen}%</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ground & Soil Layer with Decomposers */}
              <div className="h-16 bg-gradient-to-b from-amber-950 to-stone-950 border-t-2 border-amber-900/60 px-4 py-2 flex items-center justify-between text-xs text-amber-200">
                <div className="flex items-center gap-2">
                  <span className="text-base">🍂</span>
                  <span>{leavesFallen} Daun Gugur</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-base">🪱 🍄</span>
                  <span>{decomposers} Koloni Pengurai (Cacing & Jamur)</span>
                </div>
                <div className="text-[11px] text-amber-300 font-semibold">
                  Memecah materi organik ➔ Hara kembali ke tanah
                </div>
              </div>
            </div>
          </div>

          {/* Action Sandbox Sliders & Interactive Controllers */}
          <div className="p-5 bg-slate-950/90 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Control 1: Sunlight */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <label className="text-slate-300 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Intensitas Cahaya Matahari (Abiotik)</span>
                </label>
                <span className="font-mono text-amber-400 tabular-nums">{sunlight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={sunlight}
                onChange={(e) => {
                  soundEngine.playClick();
                  setSunlight(Number(e.target.value));
                }}
                className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Cahaya memicu fotosintesis daun padi. Terlalu rendah = kerdil; optimal = subur.
              </p>
            </div>

            {/* Control 2: Water & Soil Moisture */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <label className="text-slate-300 flex items-center gap-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Kelembapan Air & Tanah (Abiotik)</span>
                </label>
                <span className="font-mono text-cyan-400 tabular-nums">{waterMoisture}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={waterMoisture}
                onChange={(e) => {
                  soundEngine.playWaterSplash();
                  setWaterMoisture(Number(e.target.value));
                }}
                className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Akar menyerap air & mineral. Kurang dari 25% membuat tanaman pot layu.
              </p>
            </div>

            {/* Control 3: River Bank Trees (Biotik changes Abiotik!) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <label className="text-slate-300 flex items-center gap-1.5">
                  <TreePine className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pohon Tepi Sungai & Kanopi (Biotik)</span>
                </label>
                <span className="font-mono text-emerald-400 tabular-nums">{treeCount} Pohon</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setTreeCount(Math.max(0, treeCount - 1));
                  }}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold"
                >
                  - Tebang
                </button>
                <button
                  onClick={() => {
                    soundEngine.playPhotosynthesis();
                    setTreeCount(Math.min(6, treeCount + 1));
                  }}
                  className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-xs font-bold"
                >
                  + Tanam Pohon
                </button>
                <span className="text-[11px] text-slate-400">
                  Akar ikat tanah & tajuk mendinginkan suhu ({localTemp}°C).
                </span>
              </div>
            </div>

            {/* Control 4: Pond Aeration & Oxygen */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <label className="text-slate-300 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-400" />
                  <span>Aerasi & O₂ Terlarut Kolam (Abiotik)</span>
                </label>
                <span className="font-mono text-blue-400 tabular-nums">{pondOxygen}%</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundEngine.playWaterSplash();
                    setPondOxygen(Math.min(100, pondOxygen + 25));
                  }}
                  className="px-3 py-1 bg-cyan-700 hover:bg-cyan-600 text-white rounded text-xs font-bold"
                >
                  Pompa Aerator (Oksigen)
                </button>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setPondOxygen(Math.max(20, pondOxygen - 25));
                  }}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs"
                >
                  Kurangi
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Ikan memerlukan oksigen terlarut melalui insang; stres jika kotor & rendah.
              </p>
            </div>

            {/* Control 5: Decomposers */}
            <div className="space-y-1.5 md:col-span-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <label className="text-slate-300 flex items-center gap-1.5">
                  <span className="text-sm">🪱</span>
                  <span>Pengurai Tanah: Cacing & Jamur (Biotik Daur Hara)</span>
                </label>
                <span className="font-mono text-amber-400 tabular-nums">{decomposers} Koloni</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setDecomposers(Math.min(5, decomposers + 1));
                    setLeavesFallen(Math.max(1, leavesFallen - 1));
                  }}
                  className="px-3 py-1 bg-amber-800 hover:bg-amber-700 text-white rounded text-xs font-bold"
                >
                  + Tambah Pengurai
                </button>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setLeavesFallen(leavesFallen + 2);
                  }}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs"
                >
                  + Jatuhkan Daun Kering
                </button>
                <span className="text-[11px] text-slate-400">
                  Pengurai memecah bahan organik daun menjadi humus subur.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Zone: Tantangan Misi & Konsep Pembelajaran (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Mission Progress Card */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-md">
            <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-400" />
              <span>Target Tantangan Misi 1</span>
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Penuhi kondisi lingkungan di bawah ini untuk menstabilkan ekosistem:
            </p>

            <div className="space-y-3">
              {/* Target 1 */}
              <div className={`p-3 rounded-xl border transition-all ${
                quest1Done
                  ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300'
              }`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>1. Naungan & Pencegahan Erosi</span>
                      {quest1Done && <span className="text-[10px] text-emerald-400 font-bold">✓ TERCAPAI</span>}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Tanam minimal <strong>4 pohon</strong> dan jaga kelembapan air agar suhu lokal sejuk (≤ 27°C) dan risiko erosi tebing menurun.
                    </p>
                  </div>
                </div>
              </div>

              {/* Target 2 */}
              <div className={`p-3 rounded-xl border transition-all ${
                quest2Done
                  ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300'
              }`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>2. Kolam Ikan Sehat</span>
                      {quest2Done && <span className="text-[10px] text-emerald-400 font-bold">✓ TERCAPAI</span>}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Pompa aerator hingga oksigen terlarut ≥ <strong>75%</strong> dan pastikan air sungai tidak keruh dari erosi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Target 3 */}
              <div className={`p-3 rounded-xl border transition-all ${
                quest3Done
                  ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300'
              }`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>3. Daur Hara Tanah Subur</span>
                      {quest3Done && <span className="text-[10px] text-emerald-400 font-bold">✓ TERCAPAI</span>}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Tambahkan pengurai cacing/jamur hingga minimal <strong>4 koloni</strong> agar kesuburan tanah mencapai ≥ 70%.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Completion Banner */}
            {allCleared && (
              <div className="mt-4 p-4 bg-emerald-950/80 border border-emerald-600 rounded-xl text-center space-y-2 animate-fade-in">
                <div className="text-emerald-300 font-bold text-sm">
                  🎉 Misi 1 Berhasil Diselesaikan!
                </div>
                <p className="text-xs text-emerald-200/90">
                  Kamu telah membuktikan hubungan dua arah antara komponen biotik dan abiotik.
                </p>
                <button
                  onClick={() => {
                    soundEngine.playSuccess();
                    onNextMission();
                  }}
                  className="w-full mt-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Lanjut ke Misi 2: Arena Simbiosis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Quick Concept Explanations */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Telusuri Sebab & Akibat (Materi 3.1)
            </h3>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setActiveConcept('light');
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                  activeConcept === 'light' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Cahaya
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setActiveConcept('soil');
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                  activeConcept === 'soil' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Air & Tanah
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setActiveConcept('trees');
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                  activeConcept === 'trees' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Pohon & Suhu
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setActiveConcept('river');
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                  activeConcept === 'river' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Tepian Sungai
              </button>
            </div>

            <div className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              {activeConcept === 'light' && (
                <p>
                  <strong>Tumbuhan – Cahaya:</strong> Tumbuhan menggunakan energi cahaya untuk fotosintesis. Rumput di tempat cukup cahaya tumbuh jauh lebih lebat daripada di tempat sangat teduh.
                </p>
              )}
              {activeConcept === 'soil' && (
                <p>
                  <strong>Tumbuhan – Air & Tanah:</strong> Akar menyerap air dan mineral dari tanah. Tanaman pot akan layu jika tanah kering kehabisan air.
                </p>
              )}
              {activeConcept === 'trees' && (
                <p>
                  <strong>Tumbuhan – Tanah & Suhu (Biotik Ubah Abiotik):</strong> Akar pohon mengikat tanah agar tidak tergerus, sedangkan tajuk daunnya menaungi area sehingga suhu lingkungan lebih teduh dan sejuk!
                </p>
              )}
              {activeConcept === 'river' && (
                <p>
                  <strong>Organisme – Air (Aliran & Erosi):</strong> Tumbuhan di tepi sungai memperlambat aliran permukaan dan membantu mengurangi erosi tebing air.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
