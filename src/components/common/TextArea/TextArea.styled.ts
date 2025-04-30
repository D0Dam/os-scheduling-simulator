import styled, { css } from 'styled-components';

import colors from '@/styles/colors';
import { defaultTransition } from '@/styles/common';
import typo from '@/styles/typo';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Label = styled.label<{ $disabled: boolean }>`
  ${typo['body-4-sb']};
  display: flex;
  gap: 4px;
  align-items: flex-start;
  color: ${colors.blueGray300};

  ${({ $disabled }) =>
    $disabled &&
    css`
      color: ${colors.gray300};
    `}
`;

export const RequiredCircle = styled.span`
  width: 5px;
  height: 5px;
  background: ${colors.green400};
  border-radius: 50%;
`;

export const InputContainer = styled.div<{ $isValidate?: boolean; $disabled: boolean }>`
  ${defaultTransition}
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  background: ${colors.common0};
  border: 1.5px solid ${colors.blueGray25};
  border-radius: 8px;

  ${({ $disabled }) =>
    $disabled
      ? css`
          background: ${colors.gray50};
          border-color: ${colors.blueGray25};
        `
      : css`
          &:hover {
            border-color: ${colors.blueGray100};

            & > input::placeholder {
              color: ${colors.blueGray200};
            }
          }

          &:focus-within {
            border-color: ${colors.primary400};

            & > input::placeholder {
              color: ${colors.blueGray990};
            }
          }
        `}

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
  }

  ${({ $isValidate }) =>
    typeof $isValidate !== 'undefined' &&
    !$isValidate &&
    css`
      border: 1.5px solid ${colors.red500};

      & > span > svg > * {
        fill: ${colors.red500};
      }
    `}
`;

export const TextArea = styled.textarea`
  ${typo['body-3-sb']};
  width: 100%;
  padding: 10px 20px;

  color: ${colors.blueGray990};

  border: none;
  border-radius: 12px;

  &::placeholder {
    color: ${colors.blueGray100};
  }
`;

export const Message = styled.span<{ $isValidate?: boolean; $disabled: boolean }>`
  ${typo['caption-1-m']};
  color: ${colors.blueGray300};

  ${({ $isValidate, $disabled }) =>
    typeof $isValidate !== 'undefined' &&
    !$isValidate &&
    !$disabled &&
    css`
      color: ${colors.red500};
    `}
`;
