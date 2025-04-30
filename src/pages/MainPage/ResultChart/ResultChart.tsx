import * as S from './ResultChart.styled';

const RESULT_HEADER = [
  { id: 1, name: 'process' },
  { id: 2, name: 'AT' },
  { id: 3, name: 'BT' },
  { id: 4, name: 'WT' },
  { id: 5, name: 'TT' },
  { id: 6, name: 'NTT' },
];

const PROCESS_ITEM = [
  { id: 1, name: 'P1', at: 0, bt: 4, wt: 0, tt: 4, ntt: 0, color: '#A7A5E5' },
  { id: 2, name: 'P2', at: 1, bt: 3, wt: 1, tt: 4, ntt: 0.33, color: '#A3AED7' },
  { id: 3, name: 'P3', at: 2, bt: 1, wt: 1, tt: 2, ntt: 0.5, color: '#D0C5EC' },
  { id: 4, name: 'P4', at: 3, bt: 2, wt: 1.5, tt: 3.5, ntt: 0.75, color: '#D3E2E1' },
  { id: 5, name: 'P5', at: 4, bt: 5, wt: 2, tt: 7, ntt: 0.4, color: '#F1E1E9' },
  { id: 6, name: 'P6', at: 5, bt: 4, wt: 2.5, tt: 6.5, ntt: 0.625, color: '#E7CBCD' },
  { id: 7, name: 'P7', at: 6, bt: 3, wt: 2.5, tt: 5.5, ntt: 0.833, color: '#A7A5E5' },
  { id: 8, name: 'P8', at: 7, bt: 2, wt: 2.75, tt: 4.75, ntt: 1.375, color: '#A3AED7' },
  { id: 9, name: 'P9', at: 8, bt: 6, wt: 4.25, tt: 10.25, ntt: 0.7083, color: '#D0C5EC' },
  { id: 10, name: 'P10', at: 9, bt: 4, wt: 4.5, tt: 8.5, ntt: 0.5625, color: '#D3E2E1' },
  { id: 11, name: 'P11', at: 10, bt: 3, wt: 4.5, tt: 7.5, ntt: 0.6667, color: '#F1E1E9' },
  { id: 12, name: 'P12', at: 11, bt: 5, wt: 5.25, tt: 10.25, ntt: 0.5, color: '#E7CBCD' },
  { id: 13, name: 'P13', at: 12, bt: 2, wt: 5.5, tt: 7.5, ntt: 0.8333, color: '#A7A5E5' },
  { id: 14, name: 'P14', at: 13, bt: 4, wt: 6.25, tt: 10.25, ntt: 0.625, color: '#A3AED7' },
  { id: 15, name: 'P15', at: 14, bt: 3, wt: 6.5, tt: 9.5, ntt: 0.6667, color: '#D0C5EC' },
  { id: 16, name: 'P16', at: 15, bt: 5, wt: 7.25, tt: 12.25, ntt: 0.5833, color: '#D3E2E1' },
  { id: 17, name: 'P17', at: 16, bt: 4, wt: 7.5, tt: 11.5, ntt: 0.625, color: '#F1E1E9' },
  { id: 18, name: 'P18', at: 17, bt: 3, wt: 7.5, tt: 10.5, ntt: 0.7143, color: '#E7CBCD' },
];

function ResultChart() {
  return (
    <S.Container>
      <S.Title>ResultChart</S.Title>
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
            {PROCESS_ITEM.map(({ id, name, at, bt, wt, tt, ntt, color }) => (
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
