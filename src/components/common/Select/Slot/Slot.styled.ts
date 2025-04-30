import styled, { css } from 'styled-components';

import colors from '@/styles/colors';
import { defaultTransition } from '@/styles/common';
import typo from '@/styles/typo';

export const Li = styled.li<{ $disabled: boolean; $selected: boolean }>`
  ${typo['body-3-sb']}
  display: flex;

  width: 100%;
  padding: 8px 16px;

  color: ${colors.secondary990};

  border: none;
  border-radius: 6px;
  outline: none;

  &:focus {
    /* ${defaultTransition} */
    background-color: rgb(39 40 49 / 5%);
  }

  &:active {
    /* ${defaultTransition} */
    background-color: rgb(39 40 49 / 15%);
  }

  ${({ $selected }) =>
    $selected &&
    css`
      background-color: ${colors.primary5};

      &:focus {
        /* ${defaultTransition} */
        background-color: ${colors.primary25};
      }

      &:active {
        /* ${defaultTransition} */
        background-color: ${colors.primary50};
      }
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: auto;
      color: ${colors.gray300};
    `}
`;
