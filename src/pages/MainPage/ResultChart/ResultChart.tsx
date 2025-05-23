import { useState } from 'react';

import { useShallow } from 'zustand/shallow';

import { Tracer } from '@/models';

import * as S from './ResultChart.styled';

import { RESULT_HEADER } from '@/constants/mock';
import useSchedulerState from '@/hooks/store/useSchedulerState';
import { useInterval } from '@/hooks/utils/useInterval';

interface ResultChartProps {
  result: Tracer['endProcesses'] | null;
  nttAverage: Tracer['nttAverage'] | null;
}

function ResultChart({ result, nttAverage }: ResultChartProps) {
  const [count, setCount] = useState(0);
  const finish = useSchedulerState((state) => state.finish);
  const { state: schedulerState, interval } = useSchedulerState(
    useShallow((state) => ({ state: state.state, interval: state.interval }))
  );

  useInterval(
    () => {
      if (result) {
        setCount((p) => (p < result.length ? p + 1 : p));
        if (count === result.length) {
          finish();
        }
      }
    },
    result && count <= result.length && schedulerState !== 'paused' ? interval : null,
    [result]
  );

  return (
    <S.Container>
      <S.MainTitleWrapper>
        <S.Title>Result</S.Title>
        <div>
          <span>Running Time : {count}s</span>|
          <span>Average NTT: {nttAverage?.[count - 1]?.toFixed(3) ?? 0}</span>
        </div>
      </S.MainTitleWrapper>
      <S.MainContainer>
        <S.ResultChartContainer>
          <S.ResultChartHeader>
            {RESULT_HEADER.map(({ id, name }) => (
              <S.TitleWrapper key={id}>
                <span>{name}</span>
              </S.TitleWrapper>
            ))}
          </S.ResultChartHeader>
          <S.ResultListWrapper>
            {result &&
              result?.[count - 1]?.map(({ name, at, bt, wt, tt, ntt, color }) => (
                <S.ResultItemList key={name}>
                  <S.ResultItem style={{ backgroundColor: color }}>
                    <span>{name}</span>
                  </S.ResultItem>
                  <S.ResultItem>
                    <span>{at}</span>
                  </S.ResultItem>
                  <S.ResultItem>
                    <span>{bt}</span>
                  </S.ResultItem>
                  <S.ResultItem>
                    <span>{wt}</span>
                  </S.ResultItem>
                  <S.ResultItem>
                    <span>{tt}</span>
                  </S.ResultItem>
                  <S.ResultItem>
                    <span>{ntt.toFixed(3)}</span>
                  </S.ResultItem>
                </S.ResultItemList>
              ))}
          </S.ResultListWrapper>
        </S.ResultChartContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default ResultChart;
