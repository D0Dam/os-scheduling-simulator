import styled from 'styled-components';

import colors from '@/styles/colors';
import typo from '@/styles/typo';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  ${typo['label-1-sb']}
  padding-left: 16px;
  color: ${colors.secondary200};
`;
