import { useState } from 'react';

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
}

const mockProcesses = [
  { name: 'P1', at: 0, bt: 14 },
  { name: 'P2', at: 1, bt: 15 },
  { name: 'P3', at: 2, bt: 18 },
  { name: 'P4', at: 3, bt: 13 },
  { name: 'P5', at: 4, bt: 16 },
  { name: 'P6', at: 6, bt: 12 },
  { name: 'P7', at: 7, bt: 17 },
  { name: 'P8', at: 9, bt: 14 },
  { name: 'P9', at: 10, bt: 15 },
  { name: 'P10', at: 12, bt: 13 },
  { name: 'P11', at: 13, bt: 16 },
  { name: 'P12', at: 14, bt: 12 },
  { name: 'P13', at: 15, bt: 15 },
  { name: 'P14', at: 16, bt: 14 },
  { name: 'P15', at: 17, bt: 13 },
];

const makeCoreList = (
  coreState: Record<string, string>
): { id: number; name: string; type: 'P' | 'E' }[] =>
  Object.entries(coreState)
    .filter(([, value]) => value.startsWith('P-CORE') || value.startsWith('E-CORE'))
    .map(([key, value]) => {
      const id = Number(key.replace('core', '')); // core1 → 1
      const type = value.startsWith('P-CORE') ? 'P' : 'E';

      return {
        id,
        name: key,
        type,
      };
    });

function MainPage() {
  const isXXLarge = useMediaQuery(xXLarge);
  const [coreState, setCoreState] = useState<Record<string, string>>({
    core1: 'OFF1',
    core2: 'OFF2',
    core3: 'OFF3',
    core4: 'OFF4',
  });
  const [processList, setProcessList] = useState<ProcessType[]>(mockProcesses);
  const [result, setResult] = useState<Tracer | null>(null);
  const openToast = useToastState((state) => state.open);

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

  return (
    <S.Container>
      <Header
        setResult={(r) => setResult(r)}
        processList={processList}
        coreList={makeCoreList(coreState)}
      />
      <S.ContentContainer>
        <AdderTool
          onAddProcess={handleAddProcess}
          onDeleteProcess={handleDeleteProcess}
          processList={processList}
        />
        <S.MiddleContainer>
          <Processor
            coreState={coreState}
            changeCoreState={(name, value) => setCoreState((prev) => ({ ...prev, [name]: value }))}
          />
          <Process processList={processList} />
          {isXXLarge && <ResultChart />}
        </S.MiddleContainer>
        {!isXXLarge && <ResultChart />}
        <ReadyQueue />
        <GanttChart result={result ? result.ganttCharts : null} />
      </S.ContentContainer>
      <Toast />
    </S.Container>
  );
}

export default MainPage;
