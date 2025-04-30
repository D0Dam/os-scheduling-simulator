import styled from 'styled-components';

import typo from '@/styles/typo';

export const Container = styled.div`
  flex: 1;
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
  padding: 12px 20px;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);
  min-height: 320px;
  max-height: 320px;
`;

export const CoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CoreItem = styled.div`
  display: flex;
  width: 100%;
  max-height: 62px;
  padding: 6px 10px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  background: #fcfcfc;
`;

export const CoreItemTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CoreItemTitle = styled.h3`
  color: #021730;
  font-family: 'SUIT Variable';
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

export const CoreItemValue = styled.h3`
  display: flex;
  color: #021730;
  text-align: center;

  font-family: 'SUIT Variable';
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;
