import { useState } from 'react';

import { Tracer } from '@/models';

import * as S from './ResultChart.styled';

import { RESULT_HEADER } from '@/constants/mock';
import { useInterval } from '@/hooks/utils/useInterval';

interface ResultChartProps {
  result: Tracer['endProcesses'] | null;
}

function ResultChart({ result }: ResultChartProps) {
  const [count, setCount] = useState(0);

  useInterval(
    () => {
      if (result) {
        setCount((p) => (p < result.length ? p + 1 : p));
      }
    },
    result && count <= result.length ? 100 : null,
    [result]
  );

  return (
    <S.Container>
      <S.Title>Result</S.Title>
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
