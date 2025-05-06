import styled from 'styled-components';

import typo from '@/styles/typo';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h2`
  ${typo['subtitle-3-b']};
  color: #222;
  margin-right: 8px;
`;

export const MainContainer = styled.div`
  display: flex;
  padding: 12px 20px;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);
`;

export const LineBlockTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #000;
  width: 240px;

  & > *:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

export const LineTitle = styled.div`
  ${typo['body-4-b']};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 36px;
`;

export const LineBlockContainerWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 0;
  width: 100%;
  background: #fcfcfc;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
`;

export const LineBlockContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
`;

export const Divider = styled.div<{ $top: number }>`
  position: absolute;
  top: ${({ $top }) => `${$top}px`};
  width: 100%;
  height: 1px;
  background: #f0f0f0;
`;

export const LineBlockWrapper = styled.div`
  position: relative;
  height: 36px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ScaleLevel = styled.div`
  ${typo['subtitle-3-sb']};
`;

export const ScaleLevelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
