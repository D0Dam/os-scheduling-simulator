import { useState } from 'react';

import { useShallow } from 'zustand/shallow';

import { Tracer } from '@/models';

import * as S from './Processor.styled';

import Radio from '@/components/common/Radio';
import RadioGroup from '@/components/common/RadioGroup';
import useSchedulerState from '@/hooks/store/useSchedulerState';
import { useInterval } from '@/hooks/utils/useInterval';

const PROCESSOR = [
  {
    id: 1,
    name: 'Core 1',
  },
  {
    id: 2,
    name: 'Core 2',
  },
  {
    id: 3,
    name: 'Core 3',
  },
  {
    id: 4,
    name: 'Core 4',
  },
];

interface ProcessorProps {
  coreState: Record<string, string>;
  powerUsage: Tracer['powerUsage'] | null;
  changeCoreState: (name: string, value: string) => void;
  efficienciesState: Tracer['efficiencies'] | null;
}

function Processor({ coreState, changeCoreState, powerUsage, efficienciesState }: ProcessorProps) {
  const [count, setCount] = useState(0);
  const schedule = useSchedulerState(
    useShallow(({ state, running, paused }) => ({ state, running, paused }))
  );

  const handleChange = (name: string, value: string) => {
    changeCoreState(name, value);
  };

  const fullCount = powerUsage ? powerUsage[1].length : 0;

  useInterval(
    () => {
      if (powerUsage) {
        setCount((p) => (p < fullCount ? p + 1 : p));
      }
    },
    powerUsage && count <= fullCount && schedule.state !== 'paused' ? 200 : null,
    [powerUsage]
  );

  return (
    <S.Container>
      <S.MainTitleWrapper>
        <S.Title>Processor</S.Title>
        <div>
          <span>Avg Effi: {efficienciesState?.average?.[count - 2]?.toFixed(2) ?? 0}%</span>|
          <span>Total Power: {powerUsage?.total?.[count - 1]?.toFixed(2) ?? 0}W</span>
        </div>
      </S.MainTitleWrapper>
      <S.MainContainer>
        <S.CoreContainer>
          {PROCESSOR.map(({ id, name }) => {
            const radioName = `core${id}`;
            const powerUsageData = powerUsage?.[id]?.[count - 1] || null;
            const efficienciesDate = efficienciesState?.[id]?.[count - 1] || null;

            return (
              <S.CoreItem key={id}>
                <S.CoreItemTitleWrapper>
                  <S.CoreItemTitle>{name}</S.CoreItemTitle>
                  <S.CoreItemValue>
                    <div>효율성: {efficienciesDate?.toFixed(2) || '0.00'} %</div>
                    <div>{powerUsageData?.usage.toFixed(1) || '00.0'} W</div>
                    <div>{powerUsageData?.percentage.toFixed(2) || '0.00'} %</div>
                  </S.CoreItemValue>
                </S.CoreItemTitleWrapper>
                <RadioGroup gap={28}>
                  <Radio
                    label="OFF"
                    name={radioName}
                    value={`OFF${id}`}
                    disabled={schedule.state !== 'finish'}
                    checked={coreState[radioName] === `OFF${id}`}
                    onChange={() => handleChange(radioName, `OFF${id}`)}
                  />
                  <Radio
                    label="P-CORE"
                    name={radioName}
                    value={`P-CORE${id}`}
                    disabled={schedule.state !== 'finish'}
                    checked={coreState[radioName] === `P-CORE${id}`}
                    onChange={() => handleChange(radioName, `P-CORE${id}`)}
                  />
                  <Radio
                    label="E-CORE"
                    name={radioName}
                    value={`E-CORE${id}`}
                    disabled={schedule.state !== 'finish'}
                    checked={coreState[radioName] === `E-CORE${id}`}
                    onChange={() => handleChange(radioName, `E-CORE${id}`)}
                  />
                </RadioGroup>
              </S.CoreItem>
            );
          })}
        </S.CoreContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default Processor;
