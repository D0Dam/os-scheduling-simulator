import styled, { css } from 'styled-components';

import colors from '@/styles/colors';
import { defaultTransition } from '@/styles/common';
import opacity from '@/styles/opacity';

const iconButtonSizes = {
  small: css`
    padding: 4px;
    border-radius: 40px;
  `,
  medium: css`
    padding: 8px;
    border-radius: 40px;
  `,
  large: css`
    padding: 12px;
    border-radius: 40px;
  `,
};

const iconButtonVariants = {
  standard: {
    default: css`
      background: none;
      border: 1.5px solid rgb(0 0 0 / 0%);

      & > svg > * {
        fill: ${colors.blueGray800};
      }
    `,
    hover: css`
      background: ${colors.blueGray800}${opacity.hexOpacity5};
      border: 1.5px solid rgb(0 0 0 / 0%);

      & > svg > * {
        fill: ${colors.blueGray850};
      }
    `,
    focused: css`
      color: ${colors.gray900};
      background: ${colors.blueGray800}${opacity.hexOpacity10};
      outline: 4px solid ${colors.blue50};

      & > svg > * {
        fill: ${colors.blueGray850};
      }
    `,
    pressed: css`
      color: ${colors.gray900};
      background: ${colors.blueGray25};
      border: 1.5px solid rgb(0 0 0 / 0%);

      & > svg > * {
        fill: ${colors.blueGray990};
      }
    `,
    disabled: css`
      color: ${colors.gray300};
      background: ${colors.common0};
      border: 1.5px solid rgb(0 0 0 / 0%);

      & > svg > * {
        fill: ${colors.gray300};
      }
    `,
  },
  background: {
    default: css`
      background: ${colors.blueGray800}${opacity.hexOpacity5};
      border: 1.5px solid rgb(0 0 0 / 0%);

      & > svg > * {
        fill: ${colors.blueGray800};
      }
    `,
    hover: css`
      background: ${colors.blueGray800}${opacity.hexOpacity10};
      border: 1.5px solid rgb(0 0 0 / 0%);

      & > svg > * {
        fill: ${colors.blueGray850};
      }
    `,
    focused: css`
      background: ${colors.blueGray800}${opacity.hexOpacity15};
      border: 1.5px solid rgb(0 0 0 / 0%);
      outline: 4px solid ${colors.blue50};

      & > svg > * {
        fill: ${colors.blueGray900};
      }
    `,
    pressed: css`
      background: ${colors.blueGray800}${opacity.hexOpacity20};
      border: 1.5px solid rgb(0 0 0 / 0%);

      & > svg > * {
        fill: ${colors.blueGray990};
      }
    `,
    disabled: css`
      background: none;
      border: 1.5px solid rgb(0 0 0 / 0%);

      & > svg > * {
        fill: ${colors.gray300};
      }
    `,
  },
  outlined: {
    default: css`
      background: ${colors.common0};
      border: 1.5px solid ${colors.blueGray25};

      & > svg > * {
        fill: ${colors.blueGray800};
      }
    `,
    hover: css`
      background: ${colors.blueGray5};
      border: 1.5px solid ${colors.blueGray25};

      & > svg > * {
        fill: ${colors.blueGray850};
      }
    `,
    focused: css`
      background: ${colors.blueGray15};
      border: 1.5px solid ${colors.blueGray25};
      outline: 4px solid ${colors.blue50};

      & > svg > * {
        fill: ${colors.blueGray900};
      }
    `,
    pressed: css`
      background: ${colors.blueGray25};
      border: 1.5px solid ${colors.blueGray25};

      & > svg > * {
        fill: ${colors.blueGray990};
      }
    `,
    disabled: css`
      color: ${colors.gray300};
      background: ${colors.common0};
      border: 1.5px solid ${colors.blueGray25};
    `,
  },
  filled: {
    default: css`
      background: ${colors.blue400};
      border: 1.5px solid rgb(0 0 0 / 0%);

      & > svg > * {
        fill: ${colors.common0};
      }
    `,
    hover: css`
      background: ${colors.blue500};
      border: 1.5px solid rgb(0 0 0 / 0%);

      & > svg > * {
        fill: ${colors.blueGray5};
      }
    `,
    focused: css`
      background: ${colors.blue600};
      border: 1.5px solid rgb(0 0 0 / 0%);
      outline: 4px solid ${colors.blue50};

      & > svg > * {
        fill: ${colors.blueGray15};
      }
    `,
    pressed: css`
      background: ${colors.blue700};
      border: 1.5px solid rgb(0 0 0 / 0%);

      & > svg > * {
        fill: ${colors.blueGray25};
      }
    `,
    disabled: css`
      background: ${colors.gray50};
      border: 1.5px solid rgb(0 0 0 / 0%);

      & > svg > * {
        fill: ${colors.gray300};
      }
    `,
  },
};

export const IconButton = styled.button<{
  $size: 'small' | 'medium' | 'large';
  $variant: 'standard' | 'background' | 'outlined' | 'filled';
  $selected: boolean;
}>`
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;

  & > svg {
    width: 24px;
    height: 24px;
  }

  ${({ $size }) => iconButtonSizes[$size]};
  ${({ $variant }) => iconButtonVariants[$variant].default};

  &:hover {
    ${defaultTransition};
    ${({ $variant }) => iconButtonVariants[$variant].hover};
  }

  &:active {
    ${defaultTransition};
    ${({ $variant }) => iconButtonVariants[$variant].pressed};
  }

  &:focus-visible {
    ${({ $variant }) => iconButtonVariants[$variant].focused};
  }

  &:disabled {
    ${defaultTransition};
    ${({ $variant }) => iconButtonVariants[$variant].disabled};
    cursor: not-allowed;
  }

  ${({ $selected }) =>
    $selected &&
    css`
      &,
      &:hover {
        ${defaultTransition};
        background: var(--button-background-default-select, #ebebff);
        border: 1.5px solid rgb(0 0 0 / 0%);

        & > svg > path {
          fill: var(--button-text-default-primary-500, #262efc);
        }
      }
    `};
`;
