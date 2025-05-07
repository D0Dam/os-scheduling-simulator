import * as S from './Process.styled';

import { PROCESS_HEADER } from '@/constants/mock';

interface ProcessProps {
  processList: {
    name: string;
    at: number;
    bt: number;
    color?: string;
  }[];
}

function Process({ processList }: ProcessProps) {
  const sortedProcessList = [...processList].sort((a, b) => a.at - b.at);

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
            {sortedProcessList.map(({ name, at, bt, color }) => (
              <S.ProcessItemList key={name}>
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
