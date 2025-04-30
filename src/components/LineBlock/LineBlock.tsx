import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import * as S from './LineBlock.styled';

interface ProcessBlock {
  name: string;
  start: number; // 시작 시간 (단위: 칸)
  end: number; // 종료 시간 (단위: 칸)
}

interface LineBlockProps {
  processes: ProcessBlock[];
  interval?: number;
  xScale?: number;
}

const getRandomPastelColor = (): string => {
  const r = Math.round(Math.random() * 127 + 127);
  const g = Math.round(Math.random() * 127 + 127);
  const b = Math.round(Math.random() * 127 + 127);
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`.padEnd(7, '0');
};

function useInterval(callback: VoidFunction, delay: number | null, dependencies: unknown[] = []) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || delay === 0) {
      return () => {};
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay, ...dependencies]);
}

function LineBlock({ processes, interval = 100, xScale = 24 }: LineBlockProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [intervalNumber, setIntervalNumber] = useState<number | null>(interval);
  const [colors] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    processes.forEach((p) => {
      if (!map[p.name]) map[p.name] = getRandomPastelColor();
    });
    return map;
  });

  const maxEnd = Math.max(...processes.map((p) => p.end));

  useInterval(
    () => {
      setCurrentTime((prev) => (prev >= maxEnd ? prev : prev + 1));
    },
    interval,
    [currentTime, maxEnd]
  );

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setCurrentTime((prev) => (prev >= maxEnd ? prev : prev + 1));
  //   }, 300);

  //   return () => clearInterval(id);
  // }, [maxEnd]);

  return (
    <>
      {processes.map((proc) => {
        const shownUntil = Math.min(proc.end, currentTime);
        const shownWidth = Math.max(0, shownUntil - proc.start) * xScale;
        const left = proc.start * xScale;

        return (
          <S.Block
            key={`${proc.name}${proc.start}${proc.end}`}
            // left={left}
            // width={shownWidth}
            // color={colors[proc.name]}
            style={{
              backgroundColor: colors[proc.name],
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
