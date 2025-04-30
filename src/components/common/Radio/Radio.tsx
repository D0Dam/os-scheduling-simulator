import type { CSSProperties, ChangeEvent, ComponentPropsWithRef, ForwardedRef } from 'react';
import { forwardRef } from 'react';

import * as S from './Radio.styled';

interface RadioProps extends ComponentPropsWithRef<'input'> {
  id?: string;
  label?: string;
  labelStyle?: CSSProperties;
  boxSize?: 'large' | 'small';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  removeTransition?: boolean;
}

function Radio(
  {
    id,
    label,
    defaultChecked = false,
    disabled = false,
    boxSize = 'large',
    labelStyle,
    removeTransition = false,
    ...props
  }: RadioProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <S.Radio htmlFor={id} $disabled={disabled} $removeTransition={removeTransition}>
      <div />
      <S.Input
        id={id}
        ref={ref}
        type="radio"
        defaultChecked={defaultChecked}
        disabled={disabled}
        $removeTransition={removeTransition}
        {...props}
      />
      {label && (
        <S.Content style={labelStyle} $size={boxSize} $disabled={disabled}>
          {label}
        </S.Content>
      )}
    </S.Radio>
  );
}

export default forwardRef(Radio);
