import { useState } from 'react';

import * as S from './GanttChart.styled';
import { mock1, mock2, mock3, mock4, mock5 } from './mock';

import LineBlock from '@/components/LineBlock';
import Ruler from '@/components/Ruler';

function GanttChart() {
  const [scaleLevel, setScaleLevel] = useState(24);

  const plusLevel = () => {
    setScaleLevel((prev) => prev + 4);
  };

  const minusLevel = () => {
    setScaleLevel((prev) => prev - 4);
  };

  return (
    <S.Container>
      <S.Title>Gantt Chart</S.Title>
      <button type="button" onClick={plusLevel}>
        plus
      </button>
      <button type="button" onClick={minusLevel}>
        minus
      </button>
      <S.MainContainer>
        <S.LineBlockContainerWrapper>
          <S.LineBlockTitleContainer>
            <S.LineTitle>Arrival Time</S.LineTitle>
            <S.LineTitle>Core1</S.LineTitle>
            <S.LineTitle>Core2</S.LineTitle>
            <S.LineTitle>Core3</S.LineTitle>
            <S.LineTitle>Core4</S.LineTitle>
            <S.LineTitle>Seconds</S.LineTitle>
          </S.LineBlockTitleContainer>
          <S.LineBlockContainer>
            <S.LineBlockWrapper>
              <LineBlock processes={mock1} xScale={scaleLevel} />
            </S.LineBlockWrapper>
            <S.LineBlockWrapper>
              <LineBlock processes={mock2} xScale={scaleLevel} />
            </S.LineBlockWrapper>
            <S.LineBlockWrapper>
              <LineBlock processes={mock3} xScale={scaleLevel} />
            </S.LineBlockWrapper>
            <S.LineBlockWrapper>
              <LineBlock processes={mock4} xScale={scaleLevel} />
            </S.LineBlockWrapper>
            <S.LineBlockWrapper>
              <LineBlock processes={mock5} xScale={scaleLevel} />
            </S.LineBlockWrapper>
            <S.LineBlockWrapper>
              <Ruler count={100} scale={scaleLevel} />
            </S.LineBlockWrapper>
          </S.LineBlockContainer>
        </S.LineBlockContainerWrapper>
      </S.MainContainer>
    </S.Container>
  );
}

export default GanttChart;
