import styled, { css } from 'styled-components';

import ChevronDown from '@/assets/svg/chevron-down.svg?react';
import colors from '@/styles/colors';
import { defaultTransition } from '@/styles/common';
import shadow from '@/styles/shadow';
import typo from '@/styles/typo';

export const SelectContainer = styled.div`
  position: relative;

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

export const SelectButton = styled.button<{ $isOpen: boolean }>`
  ${typo['body-3-sb']}
  ${defaultTransition}
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 10px 10px 10px 20px;

  color: ${colors.secondary200};

  background: ${colors.white};
  border: 1.7px solid ${colors.secondary25};
  border-radius: 6px;

  &:hover {
    background: ${colors.secondary5};
  }

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      color: var(--text-field-icon-default-secondary700, #3b3c47);
      border: 1.7px solid ${colors.primary400};
    `}

  &:focus {
    color: var(--text-field-icon-default-secondary700, #3b3c47);
    border: 1.7px solid ${colors.primary400};
    outline: none;
  }

  &:focus-visible {
    color: var(--text-field-icon-default-secondary700, #3b3c47);
    border: 1.7px solid ${colors.primary400};
    outline: none;
  }

  &:disabled {
    color: var(--state-disable-300, #bababa);
    background: var(--state-disable-50, #f5f5f5);
    border: 1.5px solid var(--select-border-default-secondary25, #e4e4e7);
  }
`;

export const ChevronDownIcon = styled(ChevronDown)<{ $isOpen: boolean }>`
  transform: rotate(${({ $isOpen }) => ($isOpen ? '-180deg' : '0deg')});
  transition: transform 0.3s;
`;

export const HiddenSelect = styled.div`
  position: absolute;

  overflow: hidden;

  width: 1px;
  height: 1px;

  white-space: nowrap;

  clip: 'rect(0 0 0 0)';
  clip-path: inset(50%);
`;

export const OptionList = styled.ul<{ $isOpen: boolean; $hasLabel: boolean }>`
  ${shadow.box2}
  position: absolute;
  top: 52px;
  left: 0;

  display: flex;
  flex-direction: column;

  width: 100%;
  margin: 0;
  padding: 12px 4px;

  list-style-type: none;

  background-color: ${colors.common0};
  border-radius: 6px;

  ${({ $hasLabel }) =>
    $hasLabel &&
    css`
      top: 80px;
    `}

  ${({ $isOpen }) =>
    $isOpen
      ? css`
          visibility: visible;
        `
      : css`
          visibility: hidden;
        `}
`;

export const Li = styled.li`
  &:hover {
    background-color: #7e7e1a;
  }

  &:focus {
    background-color: #cca4a4;
    border: 1px solid #000;
  }

  &:focus-visible {
    background-color: #cca4a4;
    border: 1px solid #000;
  }
`;
