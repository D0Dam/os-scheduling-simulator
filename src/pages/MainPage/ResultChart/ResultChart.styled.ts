import styled from 'styled-components';

import typo from '@/styles/typo';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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
  display: flex;
  padding: 16px;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);
  min-height: 352px;
  max-height: 352px;
  min-width: 650px;
`;

export const ResultChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e8ebef;
  background: #fcfcfc;
  border-radius: 4px;
  max-height: 100%;
  overflow-x: hidden;
  width: 100%;
`;

export const ResultChartHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #e8ebef;
  min-height: 31px;
  width: 100%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  & + & {
    border-left: 1px solid var(--Indigo-25, #e8ebef);
  }

  & > span {
    color: #222;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
  }
`;

export const ResultListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  width: 100%;

  scrollbar-width: none;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ResultItemList = styled.div`
  display: flex;
`;

export const ResultItem = styled.div`
  display: flex;
  flex: 1;
  height: 31px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  & + & {
    border-left: 1px solid var(--Indigo-25, #e8ebef);
  }

  border-bottom: 1px solid var(--Indigo-25, #e8ebef);

  & > span {
    color: #222;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
  }
`;
