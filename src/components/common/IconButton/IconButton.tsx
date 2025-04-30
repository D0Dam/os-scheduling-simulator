import { forwardRef } from 'react';
import type { ComponentPropsWithRef, ForwardedRef } from 'react';

import * as S from './IconButton.styled';

interface IconButtonProps extends ComponentPropsWithRef<'button'> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'standard' | 'background' | 'outlined' | 'filled';
  type?: 'button' | 'submit' | 'reset';
  selected?: boolean;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

function IconButton(
  {
    size = 'medium',
    variant = 'standard',
    type = 'button',
    selected = false,
    icon: Icon,
    ...props
  }: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <S.IconButton
      type={type}
      ref={ref}
      $size={size}
      $variant={variant}
      $selected={selected}
      {...props}
    >
      <Icon />
    </S.IconButton>
  );
}

export default forwardRef(IconButton);
