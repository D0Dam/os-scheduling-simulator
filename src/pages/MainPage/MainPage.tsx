import { useState } from 'react';

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

interface ProcessType {
  name: string;
  at: number;
  bt: number;
}

function MainPage() {
  const isXXLarge = useMediaQuery(xXLarge);
  const [processList, setProcessList] = useState<ProcessType[]>([]);
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
      <Header />
      <S.ContentContainer>
        <AdderTool
          onAddProcess={handleAddProcess}
          onDeleteProcess={handleDeleteProcess}
          processList={processList}
        />
        <S.MiddleContainer>
          <Processor />
          <Process processList={processList} />
          {isXXLarge && <ResultChart />}
        </S.MiddleContainer>
        {!isXXLarge && <ResultChart />}
        <ReadyQueue />
        <GanttChart />
      </S.ContentContainer>
      <Toast />
    </S.Container>
  );
}

export default MainPage;
