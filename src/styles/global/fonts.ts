import { css } from 'styled-components';

import SUITVariable from '@/assets/fonts/SUIT-Variable.woff2';

export const fontFace = css`
  @font-face {
    font-family: 'SUIT-Variable';
    font-weight: 100 300 900;
    src: url(${SUITVariable}) format('woff2');
  }
`;
