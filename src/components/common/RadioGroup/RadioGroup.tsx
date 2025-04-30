import type { ComponentPropsWithoutRef } from 'react';

import * as S from './RadioGroup.styled';

interface RadioGroupProps extends ComponentPropsWithoutRef<'fieldset'> {
  label?: string;
  children: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: number;
  required?: boolean;
}

function RadioGroup({
  label = '',
  children,
  direction = 'row',
  gap = 8,
  required = false,
}: RadioGroupProps) {
  return (
    <S.Container $direction={direction} $gap={gap}>
      <S.Label>
        <span>{label}</span>
        {required && <S.RequiredCircle />}
      </S.Label>
      {children}
    </S.Container>
  );
}

export default RadioGroup;
