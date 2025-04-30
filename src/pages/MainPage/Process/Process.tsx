import * as S from './Process.styled';

import { PROCESS_HEADER, RESULT_PROCESS_ITEM } from '@/constants/mock';

function Process() {
  return (
    <S.Container>
      <S.Title>Processes</S.Title>
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
            {RESULT_PROCESS_ITEM.map(({ id, name, at, bt, color }) => (
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
