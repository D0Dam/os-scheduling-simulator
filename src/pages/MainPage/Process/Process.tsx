import * as S from './Process.styled';

const PROCESS_HEADER = [
  { id: 1, name: 'Process Name' },
  { id: 2, name: 'AT' },
  { id: 3, name: 'BT' },
];

const PROCESS_ITEM = [
  { id: 1, name: 'p1', at: 0, bt: 5, color: '#A7A5E5' },
  { id: 2, name: 'p2', at: 1, bt: 3, color: '#A3AED7' },
  { id: 3, name: 'p3', at: 2, bt: 8, color: '#D0C5EC' },
  { id: 4, name: 'p4', at: 3, bt: 6, color: '#D3E2E1' },
  { id: 5, name: 'p5', at: 4, bt: 2, color: '#F1E1E9' },
  { id: 6, name: 'p6', at: 5, bt: 4, color: '#E7CBCD' },
  { id: 7, name: 'p7', at: 6, bt: 7, color: '#A7A5E5' },
  { id: 8, name: 'p8', at: 7, bt: 3, color: '#A3AED7' },
  { id: 9, name: 'p9', at: 8, bt: 8, color: '#D0C5EC' },
  { id: 10, name: 'p10', at: 9, bt: 6, color: '#D3E2E1' },
  { id: 11, name: 'p11', at: 10, bt: 2, color: '#F1E1E9' },
  { id: 12, name: 'p12', at: 11, bt: 4, color: '#E7CBCD' },
  { id: 13, name: 'p13', at: 12, bt: 7, color: '#A7A5E5' },
  { id: 14, name: 'p14', at: 13, bt: 3, color: '#A3AED7' },
  { id: 15, name: 'p15', at: 14, bt: 8, color: '#D0C5EC' },
  { id: 16, name: 'p16', at: 15, bt: 6, color: '#D3E2E1' },
  { id: 17, name: 'p17', at: 16, bt: 2, color: '#F1E1E9' },
  { id: 18, name: 'p18', at: 17, bt: 4, color: '#E7CBCD' },
  { id: 19, name: 'p19', at: 18, bt: 7, color: '#A7A5E5' },
  { id: 20, name: 'p20', at: 19, bt: 3, color: '#A3AED7' },
];

function Process() {
  return (
    <S.Container>
      <S.Title>Process</S.Title>
      <S.MainContainer>
        <S.ProcessItemContainer>
          <S.ProcessContainerHeader>
            {PROCESS_HEADER.map(({ id, name }) => (
              <S.TitleWrapper key={id}>
                <span>{name}</span>
              </S.TitleWrapper>
            ))}
          </S.ProcessContainerHeader>
          <S.ProcessWrapper>
            {PROCESS_ITEM.map(({ id, name, at, bt, color }) => (
              <S.ProcessItemList key={id}>
                <S.ProcessItem style={{ backgroundColor: color }}>
                  <span>{name}</span>
                </S.ProcessItem>
                <S.ProcessItem>
                  <span>{at}</span>
                </S.ProcessItem>
                <S.ProcessItem>
                  <span>{bt}</span>
                </S.ProcessItem>
              </S.ProcessItemList>
            ))}
          </S.ProcessWrapper>
        </S.ProcessItemContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default Process;
