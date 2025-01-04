'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import GameLevel from '@/components/GameLevel';
import { levels, GameLevel as GameLevelType } from '@/data/gameLevels';

interface GameProgress {
  currentLevel: number;
  stars: number;
  levelStars: { [key: number]: number };
}

export default function SquidGamePage() {
  const [progress, setProgress] = useState<GameProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('squidGameProgress');
      return saved ? JSON.parse(saved) : {
        currentLevel: 0,
        stars: 0,
        levelStars: {}
      };
    }
    return {
      currentLevel: 0,
      stars: 0,
      levelStars: {}
    };
  });

  useEffect(() => {
    localStorage.setItem('squidGameProgress', JSON.stringify(progress));
  }, [progress]);

  const handleLevelClick = (level: GameLevelType, index: number) => {
    if (index <= progress.currentLevel && progress.stars >= level.minStars) {
      // TODO: 实现关卡导航逻辑
      console.log(`Navigating to level ${level.name}`);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backgroundImage} />
      <div className={styles.content}>
        <div className={styles.totalStars}>总星星数: {progress.stars} ⭐</div>
        <div className={styles.levelGrid}>
          {levels.map((level, index) => (
            <GameLevel
              key={level.id}
              level={level}
              isLocked={index > progress.currentLevel || progress.stars < level.minStars}
              onClick={() => handleLevelClick(level, index)}
              earnedStars={progress.levelStars[level.id] || 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 