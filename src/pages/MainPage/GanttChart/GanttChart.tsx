import { useRef, useState } from 'react';

import { Tracer } from '@/models';

import * as S from './GanttChart.styled';

import MinusIcon from '@/assets/svg/minus.svg?react';
import PlusIcon from '@/assets/svg/plus.svg?react';
import LineBlock from '@/components/LineBlock';
import Ruler from '@/components/Ruler';
import IconButton from '@/components/common/IconButton';
import useDragScroll from '@/hooks/utils/useDragScroll';

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

interface ProcessType {
  name: string;
  at: number;
  bt: number;
  color: string;
}

interface GanttChartProps {
  result: Tracer['ganttCharts'] | null;
  processList: ProcessType[];
  startCoreId: number;
}

function GanttChart({ result, processList, startCoreId }: GanttChartProps) {
  const [scaleLevel, setScaleLevel] = useState(32);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { onMouseDown, onMouseMove, onMouseUp, inActive } = useDragScroll();

  const plusLevel = () => {
    setScaleLevel((prev) => prev + 4);
  };

  const minusLevel = () => {
    setScaleLevel((prev) => prev - 4);
  };

  const colorMap = processList.reduce(
    (acc, process) => {
      acc[process.name] = process.color;
      return acc;
    },
    {} as Record<string, string>
  );

  const handleScrollOnTick = (current: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const renderedWidth = current * scaleLevel;
    const halfVisibleWidth = container.clientWidth / 2;

    if (renderedWidth > halfVisibleWidth) {
      const targetScrollLeft = renderedWidth - halfVisibleWidth;
      scrollToLinear(container, targetScrollLeft, 200);
    }
  };

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
          <S.LineBlockContainer
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={inActive}
          >
            <S.LineBlockWrapper>
              {processList.map((proc) => {
                const left = proc.at * scaleLevel;

                return (
                  <S.Block
                    key={`${proc.name}${proc.at}${proc.bt}`}
                    style={{
                      left,
                      width: scaleLevel,
                    }}
                    $bgColor={colorMap[proc.name]}
                    $afterColor={colorMap[proc.name]}
                  >
                    {proc.name}
                  </S.Block>
                );
              })}
            </S.LineBlockWrapper>
            <S.LineBlockWrapper>
              <LineBlock
                processes={result ? result[1] || [] : []}
                xScale={scaleLevel}
                colorMap={colorMap}
                onTick={startCoreId === 1 ? handleScrollOnTick : undefined}
              />
            </S.LineBlockWrapper>
            <S.LineBlockWrapper>
              <LineBlock
                processes={result ? result[2] || [] : []}
                xScale={scaleLevel}
                colorMap={colorMap}
                onTick={startCoreId === 2 ? handleScrollOnTick : undefined}
              />
            </S.LineBlockWrapper>
            <S.LineBlockWrapper>
              <LineBlock
                processes={result ? result[3] || [] : []}
                xScale={scaleLevel}
                colorMap={colorMap}
                onTick={startCoreId === 3 ? handleScrollOnTick : undefined}
              />
            </S.LineBlockWrapper>
            <S.LineBlockWrapper>
              <LineBlock
                processes={result ? result[4] || [] : []}
                xScale={scaleLevel}
                colorMap={colorMap}
                onTick={startCoreId === 4 ? handleScrollOnTick : undefined}
              />
            </S.LineBlockWrapper>
            <S.LineBlockWrapper>
              <Ruler count={result?.maxEnd || 100} scale={scaleLevel} />
            </S.LineBlockWrapper>
          </S.LineBlockContainer>
        </S.LineBlockContainerWrapper>
      </S.MainContainer>
    </S.Container>
  );
}

export default GanttChart;
