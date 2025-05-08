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
`;

export const MainContainer = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);
`;

export const LineBlockContainer = styled.div`
  display: flex;
  color: #000;
  width: 100%;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  background: #fcfcfc;
`;

export const Block = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #222;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  background: #000;
  padding: 0 24px;
`;
