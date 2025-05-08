import styled from 'styled-components';

export const Header = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  padding: 12px 20px;
  height: 60px;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
`;

export const HeaderTitleWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.h1`
  color: #154978;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;

  & > strong {
    color: #fcb036;
  }
`;

export const HeaderSubTitle = styled.h2`
  color: #154978;
  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
  margin-top: 3px;

  & > strong {
    color: #fcb036;
  }
`;

export const SelectorWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  min-width: 252px;
`;

export const AlgorithmSettingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 36px;
`;

export const AlgorithmSelectorTitle = styled.div`
  color: #222;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
`;

export const StartButton = styled.button`
  min-width: 112px;
  min-height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #202020;
  color: #f9f9f9;
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
  border: none;

  &:disabled {
    background: #f0f0f0;
    color: #b0b0b0;
  }
`;
