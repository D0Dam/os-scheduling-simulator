import AdderTool from './AdderTool';
import GanttChart from './GanttChart';
import * as S from './MainPage.styled';
import Process from './Process';
import Processor from './Processor';
import ReadyQueue from './ReadyQueue';
import ResultChart from './ResultChart';

import Header from '@/components/Header/Header';

function MainPage() {
  return (
    <S.Container>
      <Header />
      <S.ContentContainer>
        <AdderTool />
        <S.MiddleContainer>
          <Processor />
          <Process />
          <ResultChart />
        </S.MiddleContainer>
        <ReadyQueue />
        <GanttChart />
      </S.ContentContainer>
    </S.Container>
  );
}

export default MainPage;
