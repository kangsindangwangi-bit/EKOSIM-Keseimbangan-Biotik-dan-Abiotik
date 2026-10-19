import React from 'react';
import { X, Sun, HeartHandshake, ShieldCheck, Zap, HelpCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { ScreenState, ProgressState } from '../types';
import { soundEngine } from '../utils/audio';

interface MissionSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScreen: (screen: ScreenState) => void;
  progress: ProgressState;
}

export const MissionSelectModal: React.FC<MissionSelectModalProps> = ({
  isOpen,
  onClose,
  onSelectScreen,
  progress,
}) => {
  if (!isOpen) return null;

  const missions = [
    {
      screen: 'MISSION_1' as ScreenState,
      code: 'Misi 1',
      title: 'Simfoni Dua Arah',
      subtitle: '3.1 Hubungan Biotik & Abiotik',
      desc: 'Kendalikan matahari, air, tanah, dan pohon. Saksikan fotosintesis, pencegahan erosi, dan kerja pengurai.',
      icon: Sun,
      color: 'emerald',
      completed: progress.completedMissions.mission1,
    },
    {
      screen: 'MISSION_2' as ScreenState,
      code: 'Misi 2',
      title: 'Arena Interaksi Makhluk Hidup',
      subtitle: '3.2 Predasi, Kompetisi, Mutualisme, Parasitisme',
      desc: 'Hubungkan katak & belalang, lebah & bunga, serta selesaikan duel persaingan tanaman.',
      icon: HeartHandshake,
      color: 'blue',
      completed: progress.completedMissions.mission2,
    },
    {
      screen: 'MISSION_3' as ScreenState,
      code: 'Misi 3',
      title: 'Jaring Kehidupan Sawah',
      subtitle: '3.3 Rantai Makanan & Guncangan Populasi',
      desc: 'Rakit rantai energi sawah dan simulasikan dampak kepunahan ular terhadap ledakan tikus.',
      icon: ShieldCheck,
      color: 'amber',
      completed: progress.completedMissions.mission3,
    },
    {
      screen: 'MISSION_4' as ScreenState,
      code: 'Misi 4',
      title: 'Aliran Energi & Daur Materi',
      subtitle: '3.4 Energi 1 Arah vs Materi Berdaur',
      desc: 'Buktikan mengapa energi dilepas sebagai panas dan materi terus berputar melalui pengurai.',
      icon: Zap,
      color: 'cyan',
      completed: progress.completedMissions.mission4,
    },
    {
      screen: 'QUIZ' as ScreenState,
      code: 'Misi 5',
      title: 'Kuis Penjelajah Ekosistem',
      subtitle: '10 Soal Tantangan IPAS Kelas 6',
      desc: 'Uji kemampuanmu, kumpulkan bintang emas, dan cetak sertifikat penjaga alam.',
      icon: HelpCircle,
      color: 'purple',
      completed: progress.completedMissions.quiz,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              Peta Ekspedisi Ekosistem
            </h2>
            <p className="text-xs text-slate-400">
              Pilih salah satu dari 5 misi eksplorasi IPAS Kelas 6
            </p>
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

        {/* List of Missions */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          {missions.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.code}
                onClick={() => {
                  soundEngine.playClick();
                  onSelectScreen(m.screen);
                  onClose();
                }}
                className="w-full text-left p-4 rounded-xl border border-slate-700/60 hover:border-emerald-500/60 bg-slate-800/40 hover:bg-slate-800/90 transition-all flex items-center justify-between gap-4 group cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        {m.code}
                      </span>
                      <span className="text-xs text-slate-400">· {m.subtitle}</span>
                      {m.completed && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                          <CheckCircle className="w-3 h-3 text-emerald-400" /> Selesai
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {m.desc}
                    </p>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-900/60 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0 text-slate-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
