import { useState } from 'react';

import * as S from './ReadyQueue.styled';

import { useInterval } from '@/hooks/utils/useInterval';

const MOCK_DATA = [
  ['p1', 'p2'],
  ['p1', 'p4'],
  ['p1', 'p2', 'p3'],
  ['p2'],
  ['p1'],
  ['p1'],
  ['p1', 'p2'],
  ['p1', 'p4'],
  ['p1', 'p2', 'p3'],
  ['p2'],
  ['p1'],
  ['p1'],
  ['p1', 'p2'],
  ['p1', 'p4'],
  ['p1', 'p2', 'p3'],
  ['p2'],
  ['p1'],
  ['p1'],
  ['p1', 'p2'],
  ['p1', 'p4'],
  ['p1', 'p2', 'p3'],
  ['p2'],
  ['p1'],
  ['p1'],
  ['p1', 'p2'],
];

function ReadyQueue() {
  const [step, setStep] = useState(0);

  useInterval(
    () => {
      setStep((prev) => prev + 1);
    },
    step < MOCK_DATA.length - 1 ? 1000 : null,
    [step]
  );

  return (
    <S.Container>
      <S.Title>ReadyQueue</S.Title>
      <S.MainContainer>
        <S.LineBlockContainer>
          {MOCK_DATA[step].map((item, idx) => (
            <S.Block key={idx}>{item}</S.Block>
          ))}
        </S.LineBlockContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default ReadyQueue;
