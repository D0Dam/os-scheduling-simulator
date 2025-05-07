import styled, { css } from 'styled-components';

import colors from '@/styles/colors';
import { defaultTransition } from '@/styles/common';
import typo from '@/styles/typo';

export const Radio = styled.label<{
  $disabled: boolean;
  $removeTransition: boolean;
}>`
  ${({ $removeTransition }) => !$removeTransition && defaultTransition}
  position: relative;
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;

  & > div:first-child {
    ${({ $removeTransition }) => !$removeTransition && defaultTransition}
    position: absolute;
    z-index: 0;

    width: 24px;
    height: 24px;

    opacity: 0;
    background-color: ${colors.blueGray800};
    border-radius: 8px;
  }

  ${({ $disabled }) =>
    !$disabled &&
    css`
      &:hover > div {
        opacity: 0.05;
        background-color: ${colors.blueGray800};
      }

      &:active > div {
        opacity: 0.15;
        background-color: ${colors.blueGray800};
      }
    `}
`;

export const Input = styled.input<{ $removeTransition: boolean }>`
  position: relative;

  min-width: 17px;
  min-height: 17px;
  margin: 3.5px;

  border: 1.5px solid ${colors.blueGray50};
  border-radius: 50%;

  &[type='radio'] {
    ${({ $removeTransition }) => !$removeTransition && defaultTransition}
    vertical-align: middle;
    appearance: none;
  }

  &[type='radio']:focus-visible {
    outline: 4px solid ${colors.blue50};
    transition: none;
  }

  &[type='radio']:checked {
    border: 6px solid #1f2d5c;
  }

  &[type='radio']:disabled {
    cursor: not-allowed;
    border: 1.5px solid ${colors.blueGray25};
  }

  &[type='radio']:checked:hover {
    border: 6px solid #1f2d5c;
  }

  &[type='radio']:checked:active {
    border: 6px solid #1f2d5c;
  }

  &[type='radio']:checked:disabled {
    cursor: not-allowed;
    background-color: ${colors.gray100};
    border: 6px solid ${colors.gray300};
  }
`;

export const Content = styled.span<{ $size: 'small' | 'large'; $disabled: boolean }>`
  ${typo['body-3-sb']};

  ${({ $size }) =>
    $size === 'small' &&
    css`
      ${typo['body-4-sb']}
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      color: ${colors.gray300};
    `};
`;
