import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  padding: 12px 20px;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
`;

export const HeaderTitleWrapper = styled.h1`
  display: flex;
  gap: 4px;
`;

export const HeaderTitle = styled.h1`
  color: #154978;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  font-family: 'SUIT', sans-serif;

  & > strong {
    color: #fcb036;
  }
`;

export const HeaderSubTitle = styled.h2`
  color: #154978;
  text-align: right;
  font-family: 'SUIT Variable';
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  margin-top: 14px;

  & > strong {
    color: #fcb036;
  }
`;

export const AlgorithmSettingWrapper = styled.div`
  display: flex;
`;

export const AlgorithmSelectorWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const AlgorithmSelectorLabel = styled.label`
  color: #222;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;
