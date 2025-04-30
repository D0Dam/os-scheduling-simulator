import styled from 'styled-components';

export const RulerTrack = styled.div`
  display: flex;
  height: 50px;
  position: relative;

  transition: all 0.3s linear;
`;

export const TickWrapper = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 0.3s linear;
`;

export const TickLine = styled.div<{ isMajor: boolean }>`
  width: 1px;
  height: ${({ isMajor }) => (isMajor ? '20px' : '10px')};
  background-color: black;
`;

export const TickLabel = styled.div`
  font-size: 10px;
  translate: 4px -8px;
  color: #444;
`;
