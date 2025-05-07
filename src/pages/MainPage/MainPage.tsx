import { useEffect, useState } from 'react';

import { Tracer } from '@/models';

import AdderTool from './AdderTool';
import GanttChart from './GanttChart';
import * as S from './MainPage.styled';
import Process from './Process';
import Processor from './Processor';
import ReadyQueue from './ReadyQueue';
import ResultChart from './ResultChart';

import Header from '@/components/Header/Header';
import Toast from '@/components/common/Toast';
import useToastState from '@/hooks/store/useToastState';
import useBooleanState from '@/hooks/utils/useBooleanState';
import useMediaQuery from '@/hooks/utils/useMediaQuery';
import { xXLarge } from '@/styles/mediaQueries';

export interface ProcessType {
  name: string;
  at: number;
  bt: number;
  color: string;
}

const mockProcesses = [
  { name: 'P1', at: 0, bt: 14, color: '#BAC2E1' },
  { name: 'P2', at: 1, bt: 15, color: '#B3BCDE' },
  { name: 'P3', at: 2, bt: 18, color: '#ABB5DB' },
  { name: 'P4', at: 3, bt: 13, color: '#A3AED7' },
  { name: 'P5', at: 4, bt: 16, color: '#a7a5e5' },
  { name: 'P6', at: 6, bt: 12, color: '#9896D0' },
  { name: 'P7', at: 7, bt: 17, color: '#8A88BD' },
  { name: 'P8', at: 9, bt: 14, color: '#7D7CAC' },
  { name: 'P9', at: 10, bt: 15, color: '#72719C' },
  { name: 'P10', at: 12, bt: 13, color: '#68678E' },
  { name: 'P11', at: 13, bt: 16, color: '#BAC2E1' },
  { name: 'P12', at: 14, bt: 12, color: '#B3BCDE' },
  { name: 'P13', at: 15, bt: 15, color: '#ABB5DB' },
  { name: 'P14', at: 16, bt: 14, color: '#A3AED7' },
  { name: 'P15', at: 17, bt: 13, color: '#a7a5e5' },
];

const makeCoreList = (
  coreState: Record<string, string>
): { id: number; name: string; type: 'P' | 'E' }[] =>
  Object.entries(coreState)
    .filter(([, value]) => value.startsWith('P-CORE') || value.startsWith('E-CORE'))
    .map(([key, value]) => {
      const id = Number(key.replace('core', ''));
      const type = value.startsWith('P-CORE') ? 'P' : 'E';

      return {
        id,
        name: key,
        type,
      };
    });

const TICK_INTERVAL = 100;

function MainPage() {
  const isXXLarge = useMediaQuery(xXLarge);
  const openToast = useToastState((state) => state.open);
  const [result, setResult] = useState<Tracer | null>(null);
  const [processList, setProcessList] = useState<ProcessType[]>(mockProcesses);
  const {
    value: isStarted,
    setTrue: setIsStarted,
    setFalse: setIsStopped,
  } = useBooleanState(false);
  const [coreState, setCoreState] = useState<Record<string, string>>({
    core1: 'OFF1',
    core2: 'OFF2',
    core3: 'OFF3',
    core4: 'OFF4',
  });

  const endTime = result?.ganttCharts.maxEnd || 0;
  const endTimeMillis = endTime * TICK_INTERVAL;

  const handleAddProcess = (process: ProcessType) => {
    if (processList.some((p) => p.name === process.name)) {
      openToast(`"${process.name}" 프로세스는 이미 존재합니다.`, 'warning');
      return;
    }

    setProcessList((prev) => [...prev, process]);
  };

  const handleDeleteProcess = (name: string) => {
    const exists = processList.some((process) => process.name === name);

    if (!exists) {
      openToast(`"${name}" 프로세스를 찾을 수 없습니다.`, 'warning');
      return;
    }

    setProcessList((prev) => prev.filter((process) => process.name !== name));
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isStarted) {
      const timer = setTimeout(() => {
        setIsStopped();
      }, endTimeMillis + TICK_INTERVAL);

      return () => clearTimeout(timer);
    }
  }, [isStarted, endTime]);

  useEffect(() => {
    if (!result) return;
    console.log('11', result);
  }, [result]);

  return (
    <S.Container>
      <Header
        setResult={(r) => setResult(r)}
        processList={processList}
        coreList={makeCoreList(coreState)}
        setIsStarted={setIsStarted}
      />
      <S.ContentContainer>
        <AdderTool
          onAddProcess={handleAddProcess}
          onDeleteProcess={handleDeleteProcess}
          processList={processList}
          isStarted={isStarted}
        />
        <S.MiddleContainer>
          <Processor
            isStarted={isStarted}
            coreState={coreState}
            changeCoreState={(name, value) => setCoreState((prev) => ({ ...prev, [name]: value }))}
          />
          <Process processList={processList} />
          {isXXLarge && (
            <ResultChart
              key={JSON.stringify(result?.endProcesses)}
              result={result ? result.endProcesses : null}
            />
          )}
        </S.MiddleContainer>
        {!isXXLarge && (
          <ResultChart
            key={JSON.stringify(result?.endProcesses)}
            result={result ? result.endProcesses : null}
          />
        )}
        <ReadyQueue
          key={JSON.stringify(result?.readyQueue)}
          result={result ? result.readyQueue : null}
          processList={processList}
        />
        <GanttChart
          key={JSON.stringify(result?.ganttCharts)}
          result={result ? result.ganttCharts : null}
          processList={processList}
          startCoreId={makeCoreList(coreState)[0] ? makeCoreList(coreState)[0].id : 0}
        />
      </S.ContentContainer>
      <Toast />
    </S.Container>
  );
}

export default MainPage;
