import styled, { css, keyframes } from 'styled-components';

import Blank from '@/assets/svg/blank.svg?react';
import Error from '@/assets/svg/caution.svg?react';
import Success from '@/assets/svg/check.svg?react';
import Close from '@/assets/svg/close.svg?react';
import Info from '@/assets/svg/info.svg?react';
import colors from '@/styles/colors';
import { onNotLarge } from '@/styles/mediaQueries';
import opacity from '@/styles/opacity';
import shadow from '@/styles/shadow';
import typo from '@/styles/typo';
import zIndex from '@/styles/zIndex';

const slideInLeft = keyframes`
  0% {
    transform: translateX(120%);
    opacity: ${opacity.opacity50};
    animation-timing-function: ease;
  }
  
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInRight = keyframes`  
  0% {
    transform: translateX(0);
    opacity: 1;
    animation-timing-function: ease;
  }

  100% {
    transform: translateX(120%);
    opacity: ${opacity.opacity50};
    display: none;
  }
`;

const slideInBottom = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
    animation-timing-function: ease;
  }

  100% {
    transform: translateY(80%);
    opacity: 0;
    display: none;
  }
`;

const slideInUp = keyframes`
  0% {
    transform: translateY(120%);
    opacity: 0.5;
    animation-timing-function: ease;
  }
  
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ToastList = styled.div`
  position: fixed;
  right: 16px;
  bottom: 12px;

  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;

  ${onNotLarge} {
    right: auto;
    bottom: 12px;

    align-items: center;
    justify-content: center;

    width: 100%;
  }
`;

export const ToastContainer = styled.div<{ $type: string }>`
  ${shadow.box2}
  z-index: ${zIndex.toast};

  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;

  width: 518px;
  padding: 6px 6px 6px 16px;

  border-radius: var(--radius-l, 8px);

  animation:
    ${slideInLeft} 0.5s,
    ${slideInRight} 0.5s forwards;
  animation-delay: 0s, 2.5s;

  ${({ $type }) => {
    switch ($type) {
      case 'success':
        return css`
          background-color: ${colors.green500};
        `;
      case 'error':
        return css`
          background-color: ${colors.red400};
        `;
      case 'info':
        return css`
          background-color: ${colors.blue500};
        `;
      case 'warning':
        return css`
          background-color: ${colors.yellow500};
        `;
      default:
        return css`
          background-color: ${colors.secondary600};
        `;
    }
  }}

  ${onNotLarge} {
    gap: 10px;

    max-width: 320px;
    padding: 6px 6px 6px 16px;

    border-radius: 6px;

    animation:
      ${slideInUp} 0.5s,
      ${slideInBottom} 0.5s forwards;
    animation-delay: 0s, 2.5s;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Content = styled.span`
  ${typo['body-1-m']}
  color: ${colors.common0};

  ${onNotLarge} {
    ${typo['body-3-m']}
  }
`;

export const BlankIcon = styled(Blank)`
  & > path {
    fill: ${colors.common0};
  }
`;

export const CloseIcon = styled(Close)`
  & > path {
    fill: ${colors.common0};
  }
`;

export const InfoIcon = styled(Info)`
  & > path {
    fill: ${colors.common0};
  }
`;

export const SuccessIcon = styled(Success)`
  & > path {
    fill: ${colors.common0};
  }
`;

export const ErrorIcon = styled(Error)`
  & > path {
    fill: ${colors.common0};
  }
`;
