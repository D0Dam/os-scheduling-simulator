import { useState } from 'react';

import { Tracer } from '@/models';

import * as S from './ReadyQueue.styled';

import useSchedulerState from '@/hooks/store/useSchedulerState';
import { useInterval } from '@/hooks/utils/useInterval';

interface ProcessType {
  name: string;
  at: number;
  bt: number;
  color: string;
}

interface ReadyQueueProps {
  result: Tracer['readyQueue'] | null;
  processList: ProcessType[];
}

function ReadyQueue({ result, processList }: ReadyQueueProps) {
  const [step, setStep] = useState(0);
  const schedulerState = useSchedulerState(({ state }) => state);

  const colorMap = processList.reduce(
    (acc, process) => {
      acc[process.name] = process.color;
      return acc;
    },
    {} as Record<string, string>
  );

  useInterval(
    () => {
      if (result && step < result.length - 1) {
        setStep((prev) => prev + 1);
      }
    },
    result && step < result.length - 1 && schedulerState !== 'paused' ? 100 : null,
    [step, result]
  );

  return (
    <S.Container>
      <S.Title>ReadyQueue</S.Title>
      <S.MainContainer>
        <S.LineBlockContainer>
          {result?.[step]?.map((item, idx) => (
            <S.Block key={idx} style={{ background: colorMap[item] ?? '#ccc' }}>
              {item}
            </S.Block>
          ))}
        </S.LineBlockContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default ReadyQueue;
