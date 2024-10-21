import { useEffect, useRef, useState } from 'react';
import type { Level } from '../loaders';
import GameOverModal from './GameOverModal';
import type { CharactersToFind } from './LevelPage';

type TimerProps = {
  charactersToFind: CharactersToFind;
  levelId: Level['_id'];
  hintsUsed: boolean;
};

export default function Timer({
  charactersToFind,
  levelId,
  hintsUsed,
}: TimerProps) {
  const [timer, setTimer] = useState(0);
  const startDateRef = useRef(0);

  // Update timer every 10 ms as long as there are characters to find
  // Set start date
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (charactersToFind.length) {
      interval = setInterval(() => {
        setTimer(timer + 0.01);
        if (!startDateRef.current) {
          startDateRef.current = Date.now();
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [charactersToFind, timer]);

  return (
    <>
      <div>
        <p>Time:</p>
        <span>{timer.toFixed(2)}</span>
      </div>
      {!charactersToFind.length && (
        <GameOverModal
          levelId={levelId}
          startDateRef={startDateRef}
          timer={timer}
          hintsUsed={hintsUsed}
        />
      )}
    </>
  );
}
