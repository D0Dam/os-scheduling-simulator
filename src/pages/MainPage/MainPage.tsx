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
  { name: 'P2', at: 2, bt: 10, color: '#B3BCDE' },
  { name: 'P3', at: 5, bt: 8, color: '#ABB5DB' },
  { name: 'P4', at: 15, bt: 16, color: '#A3AED7' },
  { name: 'P5', at: 17, bt: 6, color: '#a7a5e5' },
  { name: 'P6', at: 27, bt: 18, color: '#9896D0' },
  { name: 'P7', at: 30, bt: 9, color: '#8A88BD' },
  { name: 'P8', at: 31, bt: 13, color: '#7D7CAC' },
  { name: 'P9', at: 33, bt: 11, color: '#72719C' },
  { name: 'P10', at: 48, bt: 7, color: '#68678E' },
  { name: 'P11', at: 52, bt: 13, color: '#BAC2E1' },
  { name: 'P12', at: 55, bt: 11, color: '#B3BCDE' },
  { name: 'P13', at: 57, bt: 15, color: '#ABB5DB' },
  { name: 'P14', at: 59, bt: 10, color: '#A3AED7' },
  { name: 'P15', at: 60, bt: 17, color: '#a7a5e5' },
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

function MainPage() {
  const isXXLarge = useMediaQuery(xXLarge);
  const openToast = useToastState((state) => state.open);
  const [result, setResult] = useState<Tracer | null>(null);
  const [processList, setProcessList] = useState<ProcessType[]>([]);
  const [coreState, setCoreState] = useState<Record<string, string>>({
    core1: 'OFF1',
    core2: 'OFF2',
    core3: 'OFF3',
    core4: 'OFF4',
  });

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

  const addMockProcess = () => {
    setProcessList(mockProcesses);
  };

  useEffect(() => {
    if (!result) return;
    console.log('11', result);
  }, [result]);

  return (
    <S.Container>
      <Header
        result={result}
        setResult={(r) => setResult(r)}
        processList={processList}
        coreList={makeCoreList(coreState)}
      />
      <S.ContentContainer>
        <AdderTool
          onAddProcess={handleAddProcess}
          onDeleteProcess={handleDeleteProcess}
          processList={processList}
          addMockProcess={addMockProcess}
        />
        <S.MiddleContainer>
          <Processor
            key={JSON.stringify(result?.powerUsage)}
            powerUsage={result ? result.powerUsage : null}
            coreState={coreState}
            changeCoreState={(name, value) => setCoreState((prev) => ({ ...prev, [name]: value }))}
            efficienciesState={result ? result.efficiencies : null}
          />
          <Process processList={processList} />
          {isXXLarge && (
            <ResultChart
              efficienciesState={result ? result.efficiencies : null}
              key={JSON.stringify(result?.endProcesses)}
              result={result ? result.endProcesses : null}
              nttAverage={result ? result.nttAverage : null}
              powerUsage={result ? result.powerUsage : null}
            />
          )}
        </S.MiddleContainer>
        {!isXXLarge && (
          <ResultChart
            efficienciesState={result ? result.efficiencies : null}
            key={JSON.stringify(result?.endProcesses)}
            result={result ? result.endProcesses : null}
            nttAverage={result ? result.nttAverage : null}
            powerUsage={result ? result.powerUsage : null}
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
