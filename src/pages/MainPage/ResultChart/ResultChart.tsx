import * as S from './ResultChart.styled';

import { RESULT_HEADER, RESULT_PROCESS_ITEM } from '@/constants/mock';

function ResultChart() {
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
            {RESULT_PROCESS_ITEM.map(({ id, name, at, bt, wt, tt, ntt, color }) => (
              <S.ResultItemList key={id}>
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
                  <span>{ntt}</span>
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
