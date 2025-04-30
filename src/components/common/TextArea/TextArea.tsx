import { forwardRef } from 'react';
import type { ChangeEventHandler, ComponentPropsWithRef, ForwardedRef } from 'react';

import * as S from './TextArea.styled';

interface TextAreaProps extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  message?: string;
  isValidate?: boolean;
}

function TextArea(
  { label, name, onChange, message, isValidate, required, disabled, ...props }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
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
        <S.TextArea
          ref={ref}
          onChange={onChange}
          name={name}
          required={required}
          disabled={disabled}
          style={{ resize: 'vertical' }}
          {...props}
        />
      </S.InputContainer>
      {message && (
        <S.Message $isValidate={isValidate} $disabled={!!disabled}>
          {message}
        </S.Message>
      )}
    </S.Container>
  );
}

export default forwardRef(TextArea);
