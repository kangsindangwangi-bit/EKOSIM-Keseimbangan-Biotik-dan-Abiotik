import React, { useState } from 'react';
import { X, BookOpen, Sun, ArrowRight, ShieldCheck, HeartHandshake, Zap, RefreshCw, ZoomIn } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { IMAGES } from '../assets/images';

interface CodexModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ImagePreviewState {
  src: string;
  alt: string;
  caption: string;
}

export const CodexModal: React.FC<CodexModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'3.1' | '3.2' | '3.3' | '3.4'>('3.1');
  const [previewImage, setPreviewImage] = useState<ImagePreviewState | null>(null);

  if (!isOpen) return null;

  const handleOpenPreview = (src: string, alt: string, caption: string) => {
    soundEngine.playClick();
    setPreviewImage({ src, alt, caption });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-5xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Buku Panduan Ekosistem (IPAS Kelas 6)
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Kurikulum Merdeka
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Materi Lengkap Bergambar: Hubungan Biotik & Abiotik, Simbiosis, Jaring Makanan, Aliran Energi & Materi
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 bg-slate-950/40 border-b border-slate-800/80 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('3.1');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === '3.1'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-300" />
            <span>3.1 Hubungan Dua Arah</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('3.2');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === '3.2'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5 text-rose-300" />
            <span>3.2 Interaksi Antarmakhluk Hidup</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('3.3');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === '3.3'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
            <span>3.3 Rantai & Jaring Makanan</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('3.4');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === '3.4'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>3.4 Aliran Energi & Daur Materi</span>
          </button>
        </div>

        {/* Content Body with Illustrated Cards */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm text-slate-300">
          {/* TAB 3.1: HUBUNGAN DUA ARAH */}
          {activeTab === '3.1' && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-950/40 border border-emerald-800/50 rounded-xl">
                <h3 className="text-base font-bold text-emerald-400 mb-1.5 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  Prinsip Utama: Hubungan Dua Arah (Sebab dan Akibat)
                </h3>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                  Komponen <strong>biotik (makhluk hidup)</strong> dipengaruhi oleh komponen{' '}
                  <strong>abiotik (benda tak hidup: cahaya, air, tanah, oksigen, suhu)</strong>, dan sebaliknya organisme juga dapat mengubah kondisi abiotik di sekitarnya. Hubungan ini berlangsung terus-menerus dalam siklus dinamis.
                </p>
              </div>

              {/* 6 Illustrated Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Tumbuhan - Cahaya */}
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/60 flex flex-col justify-between">
                  <div>
                    <div 
                      onClick={() => handleOpenPreview(
                        IMAGES.plantLightPhotosynthesis,
                        'Tumbuhan – Cahaya',
                        'Tumbuhan menangkap foton cahaya matahari untuk mengolah air dan CO₂ menjadi glukosa serta melepaskan oksigen segar.'
                      )}
                      className="relative w-full h-44 mb-3 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer group"
                    >
                      <img
                        src={IMAGES.plantLightPhotosynthesis}
                        alt="Tumbuhan – Cahaya"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-2">
                        <span className="px-2 py-1 bg-slate-950/80 text-[10px] text-slate-200 rounded flex items-center gap-1 backdrop-blur-sm">
                          <ZoomIn className="w-3 h-3 text-amber-400" /> Klik untuk Perbesar
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      1. Tumbuhan – Cahaya
                    </span>
                    <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                      <strong>Bagaimana prosesnya?</strong> Tumbuhan menggunakan energi cahaya matahari untuk fotosintesis (membuat makanan sendiri).
                    </p>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-lg text-xs text-slate-300 border border-slate-800">
                    <strong className="text-amber-300">Contoh Diamati:</strong> Rumput di tempat cukup cahaya tumbuh hijau lebat, sedangkan rumput di tempat sangat teduh tumbuh kurus dan pucat.
                  </div>
                </div>

                {/* 2. Tumbuhan - Air dan Tanah */}
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/60 flex flex-col justify-between">
                  <div>
                    <div 
                      onClick={() => handleOpenPreview(
                        IMAGES.plantWaterSoil,
                        'Tumbuhan – Air dan Tanah',
                        'Akar menyerap butiran molekul air dan unsur hara mineral dari pori-pori tanah yang kaya bahan organik.'
                      )}
                      className="relative w-full h-44 mb-3 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer group"
                    >
                      <img
                        src={IMAGES.plantWaterSoil}
                        alt="Tumbuhan – Air dan Tanah"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-2">
                        <span className="px-2 py-1 bg-slate-950/80 text-[10px] text-slate-200 rounded flex items-center gap-1 backdrop-blur-sm">
                          <ZoomIn className="w-3 h-3 text-cyan-400" /> Klik untuk Perbesar
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                      2. Tumbuhan – Air dan Tanah
                    </span>
                    <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                      <strong>Bagaimana prosesnya?</strong> Rambut akar menyerap molekul air dan unsur hara mineral dari partikel tanah untuk metabolisme sel.
                    </p>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-lg text-xs text-slate-300 border border-slate-800">
                    <strong className="text-cyan-300">Contoh Diamati:</strong> Tanaman pot cepat layu terkulai saat tanah mengering total, dan segera tegak segar kembali setelah disiram air.
                  </div>
                </div>

                {/* 3. Hewan - Air dan Oksigen */}
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/60 flex flex-col justify-between">
                  <div>
                    <div 
                      onClick={() => handleOpenPreview(
                        IMAGES.animalWaterOxygen,
                        'Hewan – Air dan Oksigen',
                        'Ikan air tawar bernapas dengan insang yang menyerap oksigen terlarut (dissolved oxygen) dalam air jernih.'
                      )}
                      className="relative w-full h-44 mb-3 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer group"
                    >
                      <img
                        src={IMAGES.animalWaterOxygen}
                        alt="Hewan – Air dan Oksigen"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-2">
                        <span className="px-2 py-1 bg-slate-950/80 text-[10px] text-slate-200 rounded flex items-center gap-1 backdrop-blur-sm">
                          <ZoomIn className="w-3 h-3 text-blue-400" /> Klik untuk Perbesar
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                      3. Hewan – Air dan Oksigen
                    </span>
                    <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                      <strong>Bagaimana prosesnya?</strong> Semua hewan memerlukan cairan tubuh; hewan perairan (ikan, udang) memerlukan oksigen terlarut dalam air.
                    </p>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-lg text-xs text-slate-300 border border-slate-800">
                    <strong className="text-blue-300">Contoh Diamati:</strong> Ikan dapat stres, berenang lesu, dan megap-megap di permukaan air saat kolam keruh kotor serta oksigen terlarut minim.
                  </div>
                </div>

                {/* 4. Pengurai - Tanah */}
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/60 flex flex-col justify-between">
                  <div>
                    <div 
                      onClick={() => handleOpenPreview(
                        IMAGES.decomposerSoilHumus,
                        'Pengurai – Tanah',
                        'Cacing tanah, mikroba tanah, dan jamur membusukkan daun gugur dan bangkai menjadi partikel humus yang sangat subur.'
                      )}
                      className="relative w-full h-44 mb-3 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer group"
                    >
                      <img
                        src={IMAGES.decomposerSoilHumus}
                        alt="Pengurai – Tanah"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-2">
                        <span className="px-2 py-1 bg-slate-950/80 text-[10px] text-slate-200 rounded flex items-center gap-1 backdrop-blur-sm">
                          <ZoomIn className="w-3 h-3 text-emerald-400" /> Klik untuk Perbesar
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                      4. Pengurai – Tanah
                    </span>
                    <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                      <strong>Bagaimana prosesnya?</strong> Pengurai (bakteri, jamur, cacing tanah) memecah bahan organik sisa organisme agar unsur hara kembali ke tanah.
                    </p>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-lg text-xs text-slate-300 border border-slate-800">
                    <strong className="text-emerald-300">Contoh Diamati:</strong> Daun kering yang gugur lama-kelamaan mencokelat, membusuk, dan membentuk lapisan humus hitam yang membuat tanah sangat subur.
                  </div>
                </div>

                {/* 5. Tumbuhan - Tanah dan Suhu */}
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/60 flex flex-col justify-between">
                  <div>
                    <div 
                      onClick={() => handleOpenPreview(
                        IMAGES.treeSoilTemp,
                        'Tumbuhan – Tanah dan Suhu',
                        'Tajuk rimbun pohon menepis terik matahari, menciptakan iklim mikro sejuk (22°C vs 31°C) dan menjaga kelembapan tanah.'
                      )}
                      className="relative w-full h-44 mb-3 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer group"
                    >
                      <img
                        src={IMAGES.treeSoilTemp}
                        alt="Tumbuhan – Tanah dan Suhu"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-2">
                        <span className="px-2 py-1 bg-slate-950/80 text-[10px] text-slate-200 rounded flex items-center gap-1 backdrop-blur-sm">
                          <ZoomIn className="w-3 h-3 text-teal-400" /> Klik untuk Perbesar
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">
                      5. Tumbuhan – Tanah & Suhu (Biotik Mengubah Abiotik)
                    </span>
                    <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                      <strong>Bagaimana prosesnya?</strong> Akar mengikat partikel tanah agar tidak hanyut; tajuk dedaunan pohon memberi naungan dan menjaga kelembapan mikro.
                    </p>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-lg text-xs text-slate-300 border border-slate-800">
                    <strong className="text-teal-300">Contoh Diamati:</strong> Area taman berpohon rindang terasa jauh lebih sejuk dan nyaman daripada lapangan aspal/tanah terbuka tanpa pohon di siang terik.
                  </div>
                </div>

                {/* 6. Organisme - Air */}
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/60 flex flex-col justify-between">
                  <div>
                    <div 
                      onClick={() => handleOpenPreview(
                        IMAGES.riverbankVegetationRoots,
                        'Organisme – Air (Aliran & Erosi)',
                        'Jalinan akar tanaman di tebing sungai menahan struktur tanah dan menyerap arus deras sehingga tidak terjadi longsor erosi.'
                      )}
                      className="relative w-full h-44 mb-3 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer group"
                    >
                      <img
                        src={IMAGES.riverbankVegetationRoots}
                        alt="Organisme – Air (Aliran & Erosi)"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-2">
                        <span className="px-2 py-1 bg-slate-950/80 text-[10px] text-slate-200 rounded flex items-center gap-1 backdrop-blur-sm">
                          <ZoomIn className="w-3 h-3 text-indigo-400" /> Klik untuk Perbesar
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                      6. Organisme – Air (Aliran & Pencegah Erosi)
                    </span>
                    <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                      <strong>Bagaimana prosesnya?</strong> Tumbuhan di bantaran sungai memperlambat laju aliran permukaan air hujan dan mencengkeram tanah tepian sungai.
                    </p>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-lg text-xs text-slate-300 border border-slate-800">
                    <strong className="text-indigo-300">Contoh Diamati:</strong> Tepi sungai yang ditanami rumput vetiver atau pohon bambu terlindungi kuat dari longsor, sementara tebing gundul cepat amblas tergerus banjir.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3.2: INTERAKSI ANTARMAKHLUK HIDUP */}
          {activeTab === '3.2' && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-950/40 border border-blue-800/50 rounded-xl">
                <h3 className="text-base font-bold text-blue-400 mb-1.5 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-rose-400" />
                  Interaksi Antarmakhluk Hidup Membentuk Ekosistem
                </h3>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                  Selain berhubungan dengan unsur abiotik, makhluk hidup berinteraksi satu sama lain. Interaksi ini menjelaskan mengapa perubahan jumlah populasi satu jenis organisme dapat langsung memengaruhi jenis lainnya.
                </p>
              </div>

              {/* 4 Illustrated Symbiosis Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Predasi */}
                <div className="p-4 bg-slate-800/60 rounded-xl border border-rose-900/40 flex flex-col justify-between">
                  <div>
                    <div 
                      onClick={() => handleOpenPreview(
                        IMAGES.predationFrog,
                        'Predasi (Pemangsaan)',
                        'Katak sawah menangkap belalang dengan lidah cepatnya; predator mendapatkan mangsa sedangkan populasi hama terkendali.'
                      )}
                      className="relative w-full h-44 mb-3 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer group"
                    >
                      <img
                        src={IMAGES.predationFrog}
                        alt="Predasi"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-2">
                        <span className="px-2 py-1 bg-slate-950/80 text-[10px] text-slate-200 rounded flex items-center gap-1 backdrop-blur-sm">
                          <ZoomIn className="w-3 h-3 text-rose-400" /> Klik untuk Perbesar
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-rose-400 text-sm">1. Predasi</h4>
                      <span className="text-[11px] px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded font-semibold">
                        Satu Mangsa (+), Satu Mati (-)
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                      Satu organisme (predator) menangkap dan memakan organisme lain (prey / mangsa) untuk memperoleh energi.
                    </p>
                  </div>
                  <div className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 space-y-1">
                    <div><strong className="text-rose-300">Contoh Nyata:</strong> Katak memakan belalang; Ular memangsa tikus sawah; Elang menyambar ular.</div>
                    <div className="text-slate-400 text-[11px]">Predasi menjaga populasi hewan tidak membludak melebihi daya dukung alam.</div>
                  </div>
                </div>

                {/* 2. Kompetisi */}
                <div className="p-4 bg-slate-800/60 rounded-xl border border-amber-900/40 flex flex-col justify-between">
                  <div>
                    <div 
                      onClick={() => handleOpenPreview(
                        IMAGES.competitionPlants,
                        'Kompetisi (Persaingan)',
                        'Dua tanaman berdekatan bersaing memperebutkan sinar matahari di atas dan air serta nutrisi di bawah tanah.'
                      )}
                      className="relative w-full h-44 mb-3 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer group"
                    >
                      <img
                        src={IMAGES.competitionPlants}
                        alt="Kompetisi"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-2">
                        <span className="px-2 py-1 bg-slate-950/80 text-[10px] text-slate-200 rounded flex items-center gap-1 backdrop-blur-sm">
                          <ZoomIn className="w-3 h-3 text-amber-400" /> Klik untuk Perbesar
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-amber-400 text-sm">2. Kompetisi</h4>
                      <span className="text-[11px] px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded font-semibold">
                        Saling Bersaing (- & -)
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                      Dua atau lebih organisme bersaing untuk memperoleh sumber daya alam yang jumlahnya terbatas dalam habitat.
                    </p>
                  </div>
                  <div className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 space-y-1">
                    <div><strong className="text-amber-300">Contoh Nyata:</strong> Tanaman padi dengan rumput liar (gulma) bersaing merebut cahaya matahari, air, dan pupuk tanah.</div>
                    <div className="text-slate-400 text-[11px]">Jika tidak disiangi petani, tanaman padi bisa kerdil akibat kalah bersaing.</div>
                  </div>
                </div>

                {/* 3. Mutualisme */}
                <div className="p-4 bg-slate-800/60 rounded-xl border border-emerald-900/40 flex flex-col justify-between">
                  <div>
                    <div 
                      onClick={() => handleOpenPreview(
                        IMAGES.mutualismBee,
                        'Mutualisme (Saling Menguntungkan)',
                        'Lebah madu mengambil nektar manis bunga, sambil membawa serbuk sari ke putik bunga lain untuk membantu pembuahan.'
                      )}
                      className="relative w-full h-44 mb-3 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer group"
                    >
                      <img
                        src={IMAGES.mutualismBee}
                        alt="Mutualisme"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-2">
                        <span className="px-2 py-1 bg-slate-950/80 text-[10px] text-slate-200 rounded flex items-center gap-1 backdrop-blur-sm">
                          <ZoomIn className="w-3 h-3 text-emerald-400" /> Klik untuk Perbesar
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-emerald-400 text-sm">3. Mutualisme</h4>
                      <span className="text-[11px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-semibold">
                        Saling Untung (+ & +)
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                      Hubungan antar dua jenis organisme di mana kedua pihak sama-sama memperoleh manfaat nyata bagi hidupnya.
                    </p>
                  </div>
                  <div className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 space-y-1">
                    <div><strong className="text-emerald-300">Contoh Nyata:</strong> Lebah madu memperoleh nektar manis sebagai bahan makanan, sedangkan bunga terbantu proses penyerbukannya.</div>
                    <div className="text-slate-400 text-[11px]">Sangat penting untuk reproduksi tanaman pangan dan buah-buahan di bumi.</div>
                  </div>
                </div>

                {/* 4. Parasitisme */}
                <div className="p-4 bg-slate-800/60 rounded-xl border border-purple-900/40 flex flex-col justify-between">
                  <div>
                    <div 
                      onClick={() => handleOpenPreview(
                        IMAGES.parasiteHost,
                        'Parasitisme (Satu Untung, Satu Dirugikan)',
                        'Kutu parasit mengisap darah hewan inang; dan benalu menancapkan akarnya ke dahan pohon untuk menyerap nutrisi inang.'
                      )}
                      className="relative w-full h-44 mb-3 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer group"
                    >
                      <img
                        src={IMAGES.parasiteHost}
                        alt="Parasitisme"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-2">
                        <span className="px-2 py-1 bg-slate-950/80 text-[10px] text-slate-200 rounded flex items-center gap-1 backdrop-blur-sm">
                          <ZoomIn className="w-3 h-3 text-purple-400" /> Klik untuk Perbesar
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-purple-400 text-sm">4. Parasitisme</h4>
                      <span className="text-[11px] px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded font-semibold">
                        Satu Untung (+), Inang Rugi (-)
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                      Satu organisme (parasit) memperoleh keuntungan nutrisi, sedangkan organisme inang (tempat ia tinggal) dirugikan.
                    </p>
                  </div>
                  <div className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 space-y-1">
                    <div><strong className="text-purple-300">Contoh Nyata:</strong> Kutu pada tubuh anjing/kucing (inang gatal dan anemia), atau tanaman benalu pada dahan pohon mangga.</div>
                    <div className="text-slate-400 text-[11px]">Parasit biasanya berukuran lebih kecil dari inang dan jarang membunuh inang seketika.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3.3: RANTAI & JARING MAKANAN */}
          {activeTab === '3.3' && (
            <div className="space-y-6">
              <div className="p-4 bg-amber-950/40 border border-amber-800/50 rounded-xl">
                <h3 className="text-base font-bold text-amber-400 mb-1.5 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Rantai Makanan dan Jaring-Jaring Makanan
                </h3>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                  <strong>Rantai makanan</strong> adalah urutan perpindahan energi melalui kegiatan makan dan dimakan. <strong>Tanda panah (→)</strong> menunjukkan arah perpindahan energi, yaitu dari organisme yang dimakan menuju ke organisme yang memakannya.
                </p>
              </div>

              {/* Poin 1: Rantai Makanan Sawah dengan Gambar */}
              <div className="p-5 bg-slate-800/60 rounded-xl border border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Contoh Rantai Makanan di Sawah
                  </h4>
                  <span className="text-xs text-emerald-300 font-medium bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-700/50">
                    Arah Panah = Aliran Energi
                  </span>
                </div>

                <div 
                  onClick={() => handleOpenPreview(
                    IMAGES.riceFoodChain,
                    'Rantai Makanan Sawah',
                    'Aliran energi berawal dari Matahari → Padi (Produsen) → Belalang (Konsumen I) → Katak (Konsumen II) → Ular (Konsumen III) → Elang (Konsumen Puncak).'
                  )}
                  className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 cursor-pointer group shadow-lg"
                >
                  <img
                    src={IMAGES.riceFoodChain}
                    alt="Rantai Makanan Sawah"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-3">
                    <span className="px-2.5 py-1 bg-slate-950/80 text-xs text-slate-200 rounded-lg flex items-center gap-1.5 backdrop-blur-md">
                      <ZoomIn className="w-3.5 h-3.5 text-amber-400" /> Perbesar Bagan Rantai Makanan
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-950/80 rounded-xl text-xs font-semibold border border-slate-800">
                  <span className="text-amber-400">☀️ Matahari</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">🌾 Padi (Produsen)</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  <span className="text-lime-400">🦗 Belalang (Konsumen I)</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  <span className="text-cyan-400">🐸 Katak (Konsumen II)</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  <span className="text-orange-400">🐍 Ular (Konsumen III)</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  <span className="text-purple-400">🦅 Elang (Konsumen Puncak)</span>
                </div>
              </div>

              {/* Poin 2: Jaring-jaring Makanan Sawah dengan Gambar */}
              <div className="p-5 bg-slate-800/60 rounded-xl border border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    Mengapa Terbentuk Jaring-Jaring Makanan?
                  </h4>
                  <span className="text-xs text-cyan-300 font-medium bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-700/50">
                    Interkoneksi Kompleks
                  </span>
                </div>

                <div 
                  onClick={() => handleOpenPreview(
                    IMAGES.foodWebPanoramic,
                    'Jaring-Jaring Makanan Sawah',
                    'Beberapa rantai makanan yang saling terhubung membentuk jaring-jaring makanan: tikus, burung pipit, belalang, katak, ular, dan elang.'
                  )}
                  className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 cursor-pointer group shadow-lg"
                >
                  <img
                    src={IMAGES.foodWebPanoramic}
                    alt="Jaring-jaring Makanan Sawah"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-3">
                    <span className="px-2.5 py-1 bg-slate-950/80 text-xs text-slate-200 rounded-lg flex items-center gap-1.5 backdrop-blur-md">
                      <ZoomIn className="w-3.5 h-3.5 text-cyan-400" /> Perbesar Ilustrasi Jaring Makanan
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Di alam bebas, satu organisme biasanya memiliki lebih dari satu jenis makanan atau pemangsa. Kumpulan rantai makanan yang saling bertaut inilah yang disebut <strong>jaring-jaring makanan</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1.5">
                    <div className="font-semibold text-emerald-300">Hubungan Makan di Sawah:</div>
                    <ul className="text-slate-400 space-y-1 list-disc pl-4 text-[11px]">
                      <li>Biji padi dimakan oleh <strong>tikus</strong> dan <strong>burung pipit</strong>.</li>
                      <li>Daun padi dimakan oleh <strong>belalang</strong>.</li>
                      <li>Belalang dimakan oleh <strong>katak</strong> atau <strong>burung</strong>.</li>
                      <li>Tikus dan katak dimakan oleh <strong>ular</strong>.</li>
                      <li>Ular dimakan oleh <strong>burung elang</strong>.</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-rose-950/40 border border-rose-800/50 rounded-lg text-rose-200 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-rose-300">Hukum Keseimbangan Ekosistem:</div>
                      <p className="text-[11px] leading-relaxed mt-1">
                        Jika satu populasi berubah drastis (misal: <em>ular sawah diburu habis</em>), hubungan rantai yang terhubung ikut rusak: populasi <strong>tikus melonjak pesat</strong> dan merusak seluruh hasil panen padi petani!
                      </p>
                    </div>
                    <div className="text-[10px] text-rose-300/80 italic">
                      Ekosistem yang beragam dan seimbang akan jauh lebih tangguh menghadapi gangguan.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3.4: ALIRAN ENERGI & DAUR MATERI */}
          {activeTab === '3.4' && (
            <div className="space-y-6">
              <div className="p-4 bg-cyan-950/40 border border-cyan-800/50 rounded-xl">
                <h3 className="text-base font-bold text-cyan-400 mb-1.5 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-emerald-400" />
                  Aliran Energi dan Daur Materi
                </h3>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                  Dua pilar penopang kehidupan biosfer: <strong>Energi mengalir satu arah</strong> dari matahari dan terdisipasi ke alam, sedangkan <strong>Materi berputar dalam daur tak berujung</strong> melalui siklus pengurai.
                </p>
              </div>

              {/* 2 Big Illustrated Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Aliran Energi Satu Arah */}
                <div className="p-4 bg-slate-800/60 rounded-xl border border-amber-800/40 flex flex-col justify-between">
                  <div>
                    <div 
                      onClick={() => handleOpenPreview(
                        IMAGES.energyPyramidHeat,
                        'Aliran Energi (Satu Arah)',
                        'Energi matahari masuk ke produsen lalu ke konsumen. Pada setiap tingkat trofik, 90% energi dilepaskan sebagai energi panas ke lingkungan.'
                      )}
                      className="relative w-full h-52 mb-3 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer group"
                    >
                      <img
                        src={IMAGES.energyPyramidHeat}
                        alt="Aliran Energi Satu Arah"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-2">
                        <span className="px-2 py-1 bg-slate-950/80 text-[10px] text-slate-200 rounded flex items-center gap-1 backdrop-blur-sm">
                          <ZoomIn className="w-3 h-3 text-amber-400" /> Klik untuk Perbesar
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1.5">
                      <Zap className="w-4 h-4" />
                      <h4>Aliran Energi (Satu Arah)</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      Energi masuk ke bumi melalui radiasi <strong>cahaya matahari</strong>, ditangkap klorofil produsen, lalu berpindah ke konsumen saat dimakan.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/80 rounded-lg text-xs text-amber-200 border border-slate-800 space-y-1">
                    <strong className="text-amber-300">Pelepasan Panas (~90%):</strong>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Pada setiap perpindahan tingkat makanan, sebagian besar energi dipakai bernapas, bergerak, dan dilepaskan ke lingkungan sebagai <em>energi panas</em>. Energi <strong>tidak berputar kembali</strong> ke matahari!
                    </p>
                  </div>
                </div>

                {/* 2. Daur Materi Berulang */}
                <div className="p-4 bg-slate-800/60 rounded-xl border border-emerald-800/40 flex flex-col justify-between">
                  <div>
                    <div 
                      onClick={() => handleOpenPreview(
                        IMAGES.nutrientEnergyCycle,
                        'Daur Materi (Berputar Terus-menerus)',
                        'Air, karbon, dan mineral bergerak terus menerus antara lingkungan abiotik dan organisme hidup melalui jasa pengurai tanah.'
                      )}
                      className="relative w-full h-52 mb-3 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer group"
                    >
                      <img
                        src={IMAGES.nutrientEnergyCycle}
                        alt="Daur Materi Berulang"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-2">
                        <span className="px-2 py-1 bg-slate-950/80 text-[10px] text-slate-200 rounded flex items-center gap-1 backdrop-blur-sm">
                          <ZoomIn className="w-3 h-3 text-emerald-400" /> Klik untuk Perbesar
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1.5">
                      <RefreshCw className="w-4 h-4" />
                      <h4>Daur Materi (Berputar Terus-Menerus)</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      Materi seperti <strong>air, karbon, nitrogen, dan unsur hara</strong> bergerak secara berulang melalui lingkungan fisik dan organisme hidup.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/80 rounded-lg text-xs text-emerald-200 border border-slate-800 space-y-1">
                    <strong className="text-emerald-300">Jasa Pengurai (Dekomposer):</strong>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Pengurai mengembalikan unsur hara dari sisa bangkai dan daun gugur kembali ke tanah, sehingga dapat diserap lagi oleh akar tumbuhan generasi berikutnya!
                    </p>
                  </div>
                </div>
              </div>

              {/* Rangkuman Perbedaan Utama */}
              <div className="p-4 bg-slate-800/70 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-lg border border-emerald-500/30">
                  ✓
                </div>
                <div className="space-y-0.5">
                  <strong className="text-emerald-300 text-sm">Kesimpulan Inti IPAS Kelas 6:</strong>
                  <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                    <strong>Energi mengalir SATU ARAH</strong> (masuk dari matahari, diteruskan antar makhluk hidup, dan terlepas sebagai panas). Sedangkan <strong>Materi MENGALAMI DAUR BERPUTAR</strong> berulang-ulang tanpa henti di bumi. Keduanya penting untuk keberlangsungan ekosistem!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Tips: Klik pada gambar apa saja untuk memperbesar detail ilustrasi sains.
          </p>
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer ml-auto"
          >
            Tutup Buku Panduan
          </button>
        </div>
      </div>

      {/* Lightbox Modal for Full Image Zoom */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col cursor-default"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                {previewImage.alt}
              </h3>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 bg-slate-950 flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img
                src={previewImage.src}
                alt={previewImage.alt}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-md"
              />
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong className="text-emerald-400 block mb-1">Penjelasan Ilmiah:</strong>
              {previewImage.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
