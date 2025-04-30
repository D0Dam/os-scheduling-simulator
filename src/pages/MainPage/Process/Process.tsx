import * as S from './Process.styled';

import { PROCESS_HEADER } from '@/constants/mock';

interface ProcessProps {
  processList: {
    name: string;
    at: number;
    bt: number;
  }[];
}

function Process({ processList }: ProcessProps) {
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
            {processList.map(({ name, at, bt }) => (
              <S.ProcessItemList key={name}>
                <S.ProcessItem>
                  {/* style={{ backgroundColor: color }} */}
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
