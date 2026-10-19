import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/curriculumData';
import { QuizQuestion } from '../types';
import { soundEngine } from '../utils/audio';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, Award, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizProps {
  onCompleteQuiz: (finalScore: number) => void;
  onGoHome: () => void;
}

interface ShuffledOption {
  text: string;
  isCorrect: boolean;
}

interface UserAnswerRecord {
  questionId: number;
  questionNumber: number;
  questionText: string;
  topic: string;
  chosenText: string;
  correctText: string;
  isCorrect: boolean;
  explanation: string;
  practicalExample: string;
}

export const QuizExpedition: React.FC<QuizProps> = ({ onCompleteQuiz, onGoHome }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswerRecord[]>([]);
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'WRONG' | 'CORRECT'>('ALL');

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx];

  // Dynamically shuffle options for the current question so the correct position is unpredictable (not always A, B, C, or D)
  const shuffledOptions: ShuffledOption[] = React.useMemo(() => {
    return currentQ.options
      .map((text, originalIndex) => ({
        text,
        isCorrect: originalIndex === currentQ.correctAnswer,
      }))
      .sort(() => Math.random() - 0.5);
  }, [currentIdx, currentQ]);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    soundEngine.playClick();
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = shuffledOptions[idx].isCorrect;
    const correctOpt = shuffledOptions.find((o) => o.isCorrect)?.text || '';

    // Record answer for detailed post-quiz analysis
    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        questionNumber: currentIdx + 1,
        questionText: currentQ.question,
        topic: currentQ.topic,
        chosenText: shuffledOptions[idx].text,
        correctText: correctOpt,
        isCorrect,
        explanation: currentQ.explanation,
        practicalExample: currentQ.practicalExample,
      },
    ]);

    if (isCorrect) {
      soundEngine.playSuccess();
      setScore((prev) => prev + 10);
    } else {
      soundEngine.playWrong();
    }
  };

  const handleNextQuestion = () => {
    soundEngine.playClick();
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz finished
      setShowSummary(true);
      soundEngine.playVictoryFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
      onCompleteQuiz(score);
    }
  };

  const handleRestartQuiz = () => {
    soundEngine.playClick();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setUserAnswers([]);
    setShowSummary(false);
    setReviewFilter('ALL');
  };

  if (showSummary) {
    const starCount = score >= 90 ? 5 : score >= 70 ? 4 : score >= 50 ? 3 : 2;
    const correctCount = userAnswers.filter((a) => a.isCorrect).length;
    const wrongCount = userAnswers.length - correctCount;
    const accuracy = userAnswers.length > 0 ? Math.round((correctCount / userAnswers.length) * 100) : 0;

    const filteredAnswers = userAnswers.filter((a) => {
      if (reviewFilter === 'WRONG') return !a.isCorrect;
      if (reviewFilter === 'CORRECT') return a.isCorrect;
      return true;
    });

    return (
      <div className="w-full min-h-screen pt-16 pb-16 px-4 md:px-8 max-w-4xl mx-auto flex flex-col justify-center select-none">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          {/* Header Trophy & Title */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-3xl shadow-lg border border-emerald-500/30">
              🏆
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white font-['Outfit',sans-serif]">
              Hasil & Skor Akhir Uji Kemampuan
            </h1>
            <p className="text-xs md:text-sm text-slate-300">
              Evaluasi Pemahaman Hubungan Biotik & Abiotik · IPAS Kelas 6
            </p>
          </div>

          {/* Detailed Score Dashboard Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Total Skor
              </span>
              <span className="text-3xl font-black font-mono tabular-nums text-emerald-400">
                {score}
              </span>
              <span className="text-xs text-slate-500 block">/ 100 Poin</span>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-emerald-900/40 text-center">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                Jawaban Benar
              </span>
              <span className="text-3xl font-black font-mono tabular-nums text-emerald-300">
                {correctCount}
              </span>
              <span className="text-xs text-slate-500 block">dari 10 Soal</span>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-rose-900/40 text-center">
              <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block mb-1">
                Jawaban Salah
              </span>
              <span className="text-3xl font-black font-mono tabular-nums text-rose-400">
                {wrongCount}
              </span>
              <span className="text-xs text-slate-500 block">dari 10 Soal</span>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-amber-900/40 text-center">
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                Akurasi Sains
              </span>
              <span className="text-3xl font-black font-mono tabular-nums text-amber-400">
                {accuracy}%
              </span>
              <div className="flex justify-center gap-0.5 text-xs text-amber-400 mt-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < starCount ? '★' : '☆'}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Evaluation Message */}
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-center text-xs text-slate-300">
            {score >= 90
              ? '🌟 Sempurna! Kamu telah menguasai seluruh konsep hubungan biotik, abiotik, jaring makanan, dan daur materi!'
              : score >= 70
              ? '👍 Bagus sekali! Kamu sudah memahami sebagian besar materi dengan sangat baik.'
              : '📖 Semangat! Periksa kembali jawaban yang belum tepat di bawah ini untuk belajar lebih mendalam.'}
          </div>

          {/* Section: Analisis Jawaban yang Benar dan Salah */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Analisis Jawaban yang Benar & Salah</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Pelajari ulasan setiap soal untuk memperkuat konsep IPAS
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
                <button
                  onClick={() => setReviewFilter('ALL')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    reviewFilter === 'ALL'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Semua ({userAnswers.length})
                </button>
                <button
                  onClick={() => setReviewFilter('WRONG')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                    reviewFilter === 'WRONG'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800/80 shadow-sm'
                      : 'text-slate-400 hover:text-rose-300'
                  }`}
                >
                  <span>Salah ({wrongCount})</span>
                </button>
                <button
                  onClick={() => setReviewFilter('CORRECT')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                    reviewFilter === 'CORRECT'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80 shadow-sm'
                      : 'text-slate-400 hover:text-emerald-300'
                  }`}
                >
                  <span>Benar ({correctCount})</span>
                </button>
              </div>
            </div>

            {/* List of Answer Records */}
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              {filteredAnswers.map((item) => (
                <div
                  key={item.questionId}
                  className={`p-4 rounded-2xl border transition-all ${
                    item.isCorrect
                      ? 'bg-slate-950/50 border-emerald-900/40'
                      : 'bg-rose-950/20 border-rose-900/50'
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                        Soal #{item.questionNumber}
                      </span>
                      <span className="text-[11px] text-slate-500">· {item.topic}</span>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0 ${
                        item.isCorrect
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {item.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Benar (+10)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span>Salah</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Question Text */}
                  <p className="text-xs sm:text-sm font-semibold text-white mb-3 leading-snug">
                    {item.questionText}
                  </p>

                  {/* Choices comparison */}
                  <div className="space-y-1.5 text-xs mb-3">
                    <div
                      className={`p-2 rounded-lg flex items-start gap-2 ${
                        item.isCorrect
                          ? 'bg-emerald-950/50 border border-emerald-800/40 text-emerald-200'
                          : 'bg-rose-950/40 border border-rose-800/40 text-rose-200'
                      }`}
                    >
                      <span className="font-bold shrink-0">Jawaban Kamu:</span>
                      <span>{item.chosenText}</span>
                    </div>

                    {!item.isCorrect && (
                      <div className="p-2 rounded-lg bg-emerald-950/50 border border-emerald-800/40 text-emerald-200 flex items-start gap-2">
                        <span className="font-bold shrink-0 text-emerald-400">Jawaban yang Benar:</span>
                        <span>{item.correctText}</span>
                      </div>
                    )}
                  </div>

                  {/* Explanation & Observation */}
                  <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                    <div>
                      <strong className="text-emerald-400">Penjelasan Sains:</strong> {item.explanation}
                    </div>
                    <div className="text-slate-400">
                      <strong>Contoh Lapangan:</strong> {item.practicalExample}
                    </div>
                  </div>
                </div>
              ))}

              {filteredAnswers.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-500 italic">
                  Tidak ada soal dalam kategori filter ini.
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Kuis Lagi</span>
            </button>

            <button
              onClick={onGoHome}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Award className="w-4 h-4" />
              <span>Kembali ke Menu Utama</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-16 pb-12 px-4 md:px-8 max-w-4xl mx-auto flex flex-col justify-between gap-6 select-none">
      {/* Quiz Header Bar */}
      <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 p-4 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">
              {currentQ.topic}
            </span>
            <h2 className="text-sm md:text-base font-bold text-white">
              Tantangan Soal #{currentIdx + 1} dari {QUIZ_QUESTIONS.length}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Skor Saat Ini:</span>
            <span className="font-mono tabular-nums text-emerald-400 font-bold text-base">
              {score} Poin
            </span>
          </div>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-purple-500 transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question Card with Freshwater Pond Habitat Backdrop */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl flex-1 overflow-hidden">
        {/* Pond Habitat Backdrop */}
        <img
          src="/src/assets/images/env_freshwater_pond_1792401952257.jpg"
          alt="Habitat Kolam Air Tawar"
          className="absolute inset-0 w-full h-full object-cover opacity-20 brightness-75 scale-105 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-950/80 pointer-events-none" />

        <div className="relative z-10">
          <h3 className="text-base md:text-lg font-bold text-white leading-relaxed mb-6 font-['Outfit',sans-serif]">
            {currentQ.question}
          </h3>

          {/* Options Grid (Randomized) */}
          <div className="space-y-3">
            {shuffledOptions.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = opt.isCorrect;

              let btnStyle = 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-700/80';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-xs md:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-950/60 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-snug">{opt.text}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation Callout when answered */}
        {isAnswered && (
          <div className="relative z-10 mt-6 pt-4 border-t border-slate-800 space-y-3 animate-fade-in">
            <div className={`p-4 rounded-xl text-xs leading-relaxed ${
              selectedOption !== null && shuffledOptions[selectedOption].isCorrect
                ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-200'
                : 'bg-rose-950/60 border border-rose-800 text-rose-200'
            }`}>
              <div className="font-bold mb-1 flex items-center gap-1.5">
                {selectedOption !== null && shuffledOptions[selectedOption].isCorrect ? (
                  <span>✓ Jawaban Kamu Tepat Sekali!</span>
                ) : (
                  <span>✗ Jawaban Kurang Tepat</span>
                )}
              </div>
              <p className="text-slate-300">{currentQ.explanation}</p>
              <div className="mt-2 text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-lg">
                <strong>Contoh Pengamatan Lapangan:</strong> {currentQ.practicalExample}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
