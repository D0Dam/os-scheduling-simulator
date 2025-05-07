import { useState } from 'react';

import * as S from './LineBlock.styled';

import useSchedulerState from '@/hooks/store/useSchedulerState';
import { useInterval } from '@/hooks/utils/useInterval';

interface ProcessBlock {
  name: string;
  start: number; // 시작 시간 (단위: 칸)
  end: number; // 종료 시간 (단위: 칸)
}

interface LineBlockProps {
  processes: ProcessBlock[];
  interval?: number;
  xScale?: number;
  onTick?: (currentTime: number) => void;
  colorMap?: Record<string, string>;
}

const getRandomPastelColor = (): string => {
  const r = Math.round(Math.random() * 127 + 127);
  const g = Math.round(Math.random() * 127 + 127);
  const b = Math.round(Math.random() * 127 + 127);
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`.padEnd(7, '0');
};

function LineBlock({ processes, onTick, interval = 100, xScale = 24, colorMap }: LineBlockProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [colors] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    processes.forEach((p) => {
      if (!map[p.name]) map[p.name] = getRandomPastelColor();
    });
    return map;
  });
  const schedulerState = useSchedulerState(({ state }) => state);

  const maxEnd = Math.max(...processes.map((p) => p.end));

  useInterval(
    () => {
      setCurrentTime((prev) => {
        const next = prev >= maxEnd ? prev : prev + 1;
        onTick?.(next);
        return next;
      });
    },
    currentTime >= maxEnd || schedulerState === 'paused' ? null : interval,
    [currentTime, maxEnd]
  );

  return (
    <>
      {processes.map((proc) => {
        const shownUntil = Math.min(proc.end, currentTime);
        const shownWidth = Math.max(0, shownUntil - proc.start) * xScale;
        const left = proc.start * xScale;

        return (
          <S.Block
            key={`${proc.name}${proc.start}${proc.end}`}
            style={{
              backgroundColor: colorMap?.[proc.name] ?? colors[proc.name],
              left,
              width: shownWidth,
              visibility: shownWidth > 0 ? 'visible' : 'hidden',
            }}
          >
            {proc.name}
          </S.Block>
        );
      })}
    </>
  );
}
export default LineBlock;
