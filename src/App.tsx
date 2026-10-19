/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ScreenState, ProgressState } from './types';
import { TitleScreen } from './components/TitleScreen';
import { Mission1TwoWay } from './components/Mission1TwoWay';
import { Mission2Interactions } from './components/Mission2Interactions';
import { Mission3FoodWeb } from './components/Mission3FoodWeb';
import { Mission4EnergyAndMatter } from './components/Mission4EnergyAndMatter';
import { QuizExpedition } from './components/QuizExpedition';
import { CodexModal } from './components/CodexModal';
import { MissionSelectModal } from './components/MissionSelectModal';
import { VictoryModal } from './components/VictoryModal';
import { AudioControls } from './components/AudioControls';
import { BackgroundManager, BIOMES, BiomeType } from './components/BackgroundManager';
import { BiomeSwitcherModal } from './components/BiomeSwitcherModal';
import { soundEngine } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('TITLE');
  const [isCodexOpen, setIsCodexOpen] = useState<boolean>(false);
  const [isMissionSelectOpen, setIsMissionSelectOpen] = useState<boolean>(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState<boolean>(false);
  const [isBiomeModalOpen, setIsBiomeModalOpen] = useState<boolean>(false);
  const [overrideBiome, setOverrideBiome] = useState<BiomeType | null>(null);

  const [progress, setProgress] = useState<ProgressState>({
    completedMissions: {
      mission1: false,
      mission2: false,
      mission3: false,
      mission4: false,
      quiz: false,
    },
    score: 0,
    stars: 0,
    quizHighScore: 0,
  });

  // Calculate effective active biome
  const currentBiomeKey: BiomeType = useMemo(() => {
    if (overrideBiome) return overrideBiome;
    switch (currentScreen) {
      case 'TITLE':
        return 'paddy';
      case 'MISSION_1':
        return 'river';
      case 'MISSION_2':
        return 'forest';
      case 'MISSION_3':
        return 'paddy';
      case 'MISSION_4':
        return 'forest';
      case 'QUIZ':
        return 'pond';
      default:
        return 'paddy';
    }
  }, [currentScreen, overrideBiome]);

  const activeBiomeInfo = BIOMES[currentBiomeKey];

  const getScreenTitle = (screen: ScreenState): string => {
    switch (screen) {
      case 'MISSION_1':
        return 'Misi 1: Hubungan Dua Arah (3.1)';
      case 'MISSION_2':
        return 'Misi 2: Arena Simbiosis (3.2)';
      case 'MISSION_3':
        return 'Misi 3: Jaring Makanan Sawah (3.3)';
      case 'MISSION_4':
        return 'Misi 4: Aliran Energi & Materi (3.4)';
      case 'QUIZ':
        return 'Misi 5: Kuis Ekosistem IPAS 6';
      default:
        return '';
    }
  };

  const handleCompleteMission = (missionKey: keyof ProgressState['completedMissions'], points: number) => {
    setProgress((prev) => {
      const alreadyDone = prev.completedMissions[missionKey];
      const newCompleted = { ...prev.completedMissions, [missionKey]: true };
      const completedCount = Object.values(newCompleted).filter(Boolean).length;
      return {
        ...prev,
        completedMissions: newCompleted,
        score: alreadyDone ? prev.score : prev.score + points,
        stars: completedCount,
      };
    });
  };

  const handleQuizFinished = (quizScore: number) => {
    handleCompleteMission('quiz', quizScore);
    setIsVictoryOpen(true);
  };

  const handleRestartMission = () => {
    // Force re-render of current mission
    const current = currentScreen;
    setCurrentScreen('TITLE');
    setTimeout(() => setCurrentScreen(current), 10);
  };

  return (
    <BackgroundManager currentScreen={currentScreen} overrideBiome={overrideBiome}>
      {/* Top HUD Controls (Audio, Biome, Codex, Back, Scores) */}
      <AudioControls
        onOpenCodex={() => setIsCodexOpen(true)}
        onOpenBiome={() => setIsBiomeModalOpen(true)}
        currentBiomeName={activeBiomeInfo.name}
        currentBiomeIcon={activeBiomeInfo.icon}
        onGoHome={currentScreen !== 'TITLE' ? () => setCurrentScreen('TITLE') : undefined}
        onRestartCurrent={currentScreen !== 'TITLE' ? handleRestartMission : undefined}
        currentScreenTitle={getScreenTitle(currentScreen)}
        score={currentScreen !== 'TITLE' ? progress.score : undefined}
        stars={currentScreen !== 'TITLE' ? progress.stars : undefined}
      />

      {/* Screen Router with animated transitions */}
      <main key={currentScreen} className="flex-1 w-full animate-screen-enter">
        {currentScreen === 'TITLE' && (
          <TitleScreen
            onStartGame={() => setCurrentScreen('MISSION_1')}
            onSelectMission={() => setIsMissionSelectOpen(true)}
            stars={progress.stars}
          />
        )}

        {currentScreen === 'MISSION_1' && (
          <Mission1TwoWay
            onComplete={() => handleCompleteMission('mission1', 150)}
            onNextMission={() => {
              soundEngine.playClick();
              setCurrentScreen('MISSION_2');
            }}
          />
        )}

        {currentScreen === 'MISSION_2' && (
          <Mission2Interactions
            onComplete={() => handleCompleteMission('mission2', 150)}
            onNextMission={() => {
              soundEngine.playClick();
              setCurrentScreen('MISSION_3');
            }}
          />
        )}

        {currentScreen === 'MISSION_3' && (
          <Mission3FoodWeb
            onComplete={() => handleCompleteMission('mission3', 150)}
            onNextMission={() => {
              soundEngine.playClick();
              setCurrentScreen('MISSION_4');
            }}
          />
        )}

        {currentScreen === 'MISSION_4' && (
          <Mission4EnergyAndMatter
            onComplete={() => handleCompleteMission('mission4', 150)}
            onGoToQuiz={() => {
              soundEngine.playClick();
              setCurrentScreen('QUIZ');
            }}
          />
        )}

        {currentScreen === 'QUIZ' && (
          <QuizExpedition
            onCompleteQuiz={handleQuizFinished}
            onGoHome={() => setCurrentScreen('TITLE')}
          />
        )}
      </main>

      {/* Modals & Overlays */}
      <CodexModal
        isOpen={isCodexOpen}
        onClose={() => setIsCodexOpen(false)}
      />

      <BiomeSwitcherModal
        isOpen={isBiomeModalOpen}
        onClose={() => setIsBiomeModalOpen(false)}
        activeBiome={currentBiomeKey}
        onSelectBiome={(biome) => {
          setOverrideBiome(biome);
          setIsBiomeModalOpen(false);
        }}
        isAuto={overrideBiome === null}
      />

      <MissionSelectModal
        isOpen={isMissionSelectOpen}
        onClose={() => setIsMissionSelectOpen(false)}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
        progress={progress}
      />

      <VictoryModal
        isOpen={isVictoryOpen}
        onClose={() => {
          setIsVictoryOpen(false);
          setCurrentScreen('TITLE');
        }}
        onPlayAgain={() => {
          setIsVictoryOpen(false);
          setCurrentScreen('MISSION_1');
        }}
        onOpenCodex={() => {
          setIsVictoryOpen(false);
          setIsCodexOpen(true);
        }}
        score={progress.score}
        stars={progress.stars}
      />
    </BackgroundManager>
  );
}
