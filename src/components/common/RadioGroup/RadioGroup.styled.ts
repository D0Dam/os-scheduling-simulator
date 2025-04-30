import styled from 'styled-components';

import colors from '@/styles/colors';
import typo from '@/styles/typo';

export const Container = styled.fieldset<{ $direction: string; $gap: number }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ $gap }) => $gap}px;
`;

export const Label = styled.legend`
  ${typo['body-4-sb']};
  display: flex;
  gap: 4px;
  align-items: flex-start;

  margin-bottom: 8px;

  color: ${colors.blueGray300};
`;

export const RequiredCircle = styled.span`
  width: 5px;
  height: 5px;
  background: ${colors.green400};
  border-radius: 50%;
`;
