import styled from 'styled-components';

import { onNotXXLarge } from '@/styles/mediaQueries';
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
  justify-content: space-between;
  padding: 12px 20px;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);

  ${onNotXXLarge} {
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const ProcessDeleteWrapper = styled.div`
  display: flex;
  width: 372px;
  align-items: center;
  justify-content: center;
`;

export const ProcessInputWrapper = styled.div`
  display: flex;
  min-width: 819px;
  gap: 24px;
`;

export const InputTitle = styled.div`
  color: #222;
  white-space: nowrap;

  font-family: 'SUIT Variable';
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-right: 8px;
`;

export const Button = styled.button`
  display: flex;
  min-width: 112px;
  height: 36px;
  padding: 2px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #202020;
  color: #f9f9f9;
  white-space: nowrap;
  font-family: 'SUIT Variable';
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;

  margin-left: 24px;
  border: none;

  &:disabled {
    background: #f0f0f0;
    color: #b0b0b0;
  }
`;

export const ProcessButton = styled.button`
  display: flex;
  min-width: 112px;
  height: 36px;
  padding: 2px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #202020;
  color: #f9f9f9;
  white-space: nowrap;
  font-family: 'SUIT Variable';
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  border: none;
`;

export const InputWrapper = styled.div`
  display: flex;
  max-width: 223px;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
