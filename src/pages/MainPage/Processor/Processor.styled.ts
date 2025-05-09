import styled from 'styled-components';

import typo from '@/styles/typo';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  min-width: 480px;
  gap: 4px;
`;

export const MainTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 16px;

  & > div {
    display: flex;
    gap: 8px;
  }
`;

export const Title = styled.h2`
  ${typo['subtitle-3-b']};
  color: #222;
`;

export const MainContainer = styled.div`
  display: grid;
  padding: 16px;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);
  min-height: 352px;
  max-height: 352px;
  min-width: 365px;
`;

export const CoreItem = styled.div`
  display: flex;
  width: 100%;

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
  color: #222;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

export const CoreItemValue = styled.h3`
  ${typo['caption-2-m']};
  display: flex;
  flex-direction: column;
  color: #222;
  margin-top: 8px;
`;
