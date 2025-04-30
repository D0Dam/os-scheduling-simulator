import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fafafa;
  min-width: 900px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  width: 100%;
  min-height: calc(100vh - 60px);
  height: 100%;
`;

export const MiddleContainer = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  align-items: center;
`;
