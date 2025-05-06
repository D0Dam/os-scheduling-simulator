import { useEffect, useRef, useState } from 'react';

import { Tracer } from '@/models';

import * as S from './GanttChart.styled';
import { mock1 } from './mock';

import MinusIcon from '@/assets/svg/minus.svg?react';
import PlusIcon from '@/assets/svg/plus.svg?react';
import LineBlock from '@/components/LineBlock';
import Ruler from '@/components/Ruler';
import IconButton from '@/components/common/IconButton';

const scrollToLinear = (element: HTMLElement, target: number, duration = 300) => {
  const start = element.scrollLeft;
  const change = target - start;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const position = start + change * progress;

    // eslint-disable-next-line no-param-reassign
    element.scrollLeft = position;

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

interface GanttChartProps {
  result: Tracer['ganttCharts'] | null;
}

function GanttChart({ result }: GanttChartProps) {
  const [scaleLevel, setScaleLevel] = useState(24);
  const scrollRef = useRef<HTMLDivElement>(null);

  const plusLevel = () => {
    setScaleLevel((prev) => prev + 4);
  };

  const minusLevel = () => {
    setScaleLevel((prev) => prev - 4);
  };

  const handleScrollOnTick = (current: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const renderedWidth = current * scaleLevel;
    const halfVisibleWidth = container.clientWidth / 2;

    if (renderedWidth > halfVisibleWidth) {
      const targetScrollLeft = renderedWidth - halfVisibleWidth;
      scrollToLinear(container, targetScrollLeft, 100);
    }
  };

  useEffect(() => {
    if (result) {
      console.log(result);
    }
  }, [result]);

  return (
    <S.Container>
      <S.HeaderWrapper>
        <S.Title>Gantt Chart</S.Title>
        <S.ScaleLevelWrapper>
          <IconButton
            size="small"
            icon={MinusIcon}
            onClick={minusLevel}
            disabled={scaleLevel <= 4}
          />
          <S.ScaleLevel>Scale Level: {scaleLevel / 4}</S.ScaleLevel>
          <IconButton size="small" icon={PlusIcon} onClick={plusLevel} />
        </S.ScaleLevelWrapper>
      </S.HeaderWrapper>

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
          <S.Divider $top={36} />
          <S.Divider $top={72} />
          <S.Divider $top={108} />
          <S.Divider $top={144} />
          <S.LineBlockContainer ref={scrollRef}>
            <S.LineBlockWrapper>
              {mock1.map((proc) => {
                const left = proc.start * scaleLevel;

                return (
                  <S.Block
                    key={`${proc.name}${proc.start}${proc.end}`}
                    style={{
                      backgroundColor: 'pink',
                      left,
                      width: scaleLevel,
                    }}
                  >
                    {proc.name}
                  </S.Block>
                );
              })}
            </S.LineBlockWrapper>
            <S.LineBlockWrapper>
              <LineBlock
                processes={result ? result[1] : []}
                xScale={scaleLevel}
                onTick={handleScrollOnTick}
              />
            </S.LineBlockWrapper>
            <S.LineBlockWrapper>
              <LineBlock processes={result ? result[2] || [] : []} xScale={scaleLevel} />
            </S.LineBlockWrapper>
            <S.LineBlockWrapper>
              <LineBlock processes={result ? result[3] || [] : []} xScale={scaleLevel} />
            </S.LineBlockWrapper>
            <S.LineBlockWrapper>
              <LineBlock processes={result ? result[4] || [] : []} xScale={scaleLevel} />
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
