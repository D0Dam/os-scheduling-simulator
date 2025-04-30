import { forwardRef } from 'react';
import type { ChangeEventHandler, ComponentPropsWithRef, ForwardedRef, ReactNode } from 'react';

import * as S from './TextField.styled';

interface TextFieldProps extends ComponentPropsWithRef<'input'> {
  leftItem?: ReactNode;
  rightItem?: ReactNode;
  label?: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  message?: string;
  isValidate?: boolean;
}

function TextField(
  {
    leftItem,
    rightItem,
    label,
    name,
    onChange,
    message,
    isValidate,
    required,
    disabled,
    ...props
  }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <S.Container>
      {label && (
        <S.Label htmlFor={name} $disabled={!!disabled}>
          <span>{label}</span>
          {required && <S.RequiredCircle />}
        </S.Label>
      )}
      <S.InputContainer $isValidate={isValidate} $disabled={!!disabled}>
        {leftItem && <span>{leftItem}</span>}
        <S.Input
          ref={ref}
          onChange={onChange}
          name={name}
          required={required}
          disabled={disabled}
          $hasLeft={!!leftItem}
          $hasRight={!!rightItem}
          {...props}
        />
        {rightItem && <span>{rightItem}</span>}
      </S.InputContainer>
      {message && (
        <S.Message $isValidate={isValidate} $disabled={!!disabled}>
          {message}
        </S.Message>
      )}
    </S.Container>
  );
}

export default forwardRef(TextField);
