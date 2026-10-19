/**
 * Game state and curriculum data types for EKOSIM - IPAS Kelas 6
 */

export type ScreenState = 
  | 'TITLE'
  | 'MISSION_SELECT'
  | 'MISSION_1' // 3.1 Hubungan Dua Arah (Biotik ⇄ Abiotik)
  | 'MISSION_2' // 3.2 Interaksi Antarmakhluk Hidup (Predasi, Kompetisi, Mutualisme, Parasitisme)
  | 'MISSION_3' // 3.3 Rantai Makanan & Jaring-jaring Makanan
  | 'MISSION_4' // 3.4 Aliran Energi & Daur Materi
  | 'QUIZ'      // Kuis Penjelajah Ekosistem
  | 'VICTORY';

export interface ProgressState {
  completedMissions: {
    mission1: boolean;
    mission2: boolean;
    mission3: boolean;
    mission4: boolean;
    quiz: boolean;
  };
  score: number;
  stars: number;
  quizHighScore: number;
}

export interface QuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  practicalExample: string;
}

export interface SymbiosisItem {
  id: string;
  title: string;
  type: 'PREDASI' | 'KOMPETISI' | 'MUTUALISME' | 'PARASITISME';
  speciesA: {
    name: string;
    role: string;
    icon: string;
    status: '+ (Untung)' | '- (Rugi)' | 'Netral' | '- (Rugi/Tertekan)';
  };
  speciesB: {
    name: string;
    role: string;
    icon: string;
    status: '+ (Untung)' | '- (Rugi)' | 'Netral' | '- (Rugi/Tertekan)';
  };
  description: string;
  example: string;
  consequence: string;
}

export interface FoodChainNode {
  id: string;
  name: string;
  roleText: string;
  trophicLevel: 'Matahari' | 'Produsen' | 'Konsumen I' | 'Konsumen II' | 'Konsumen Puncak';
  icon: string;
  color: string;
  eatsIds?: string[];
}
