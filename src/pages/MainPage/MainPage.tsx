import { useState } from 'react';

import AdderTool from './AdderTool';
import GanttChart from './GanttChart';
import * as S from './MainPage.styled';
import Process from './Process';
import Processor from './Processor';
// import ReadyQueue from './ReadyQueue';
import ResultChart from './ResultChart';

import Header from '@/components/Header/Header';
import useMediaQuery from '@/hooks/utils/useMediaQuery';
import { xXLarge } from '@/styles/mediaQueries';

interface ProcessType {
  name: string;
  at: number;
  bt: number;
}

function MainPage() {
  const [processList, setProcessList] = useState<ProcessType[]>([]);

  const handleAddProcess = (process: ProcessType) => {
    setProcessList((prev) => [...prev, process]);
  };

  const isXXLarge = useMediaQuery(xXLarge);
  return (
    <S.Container>
      <Header />
      <S.ContentContainer>
        <AdderTool onAddProcess={handleAddProcess} />
        <S.MiddleContainer>
          <Processor />
          <Process processList={processList} />
          {isXXLarge && <ResultChart />}
        </S.MiddleContainer>
        {/* <ReadyQueue /> */}
        {!isXXLarge && <ResultChart />}
        <GanttChart />
      </S.ContentContainer>
    </S.Container>
  );
}

export default MainPage;
