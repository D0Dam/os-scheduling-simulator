import { ComponentPropsWithoutRef, useEffect, useRef } from 'react';

import { useSelectContext } from '../Select';

import * as S from './Slot.styled';

import Radio from '@/components/common/Radio';

interface SlotProps extends ComponentPropsWithoutRef<'li'> {
  value: string;
  children: string;
  disabled?: boolean;
  groupLabel?: string;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
  type?: 'default' | 'radio';
}

function Slot({
  value,
  children,
  disabled = false,
  groupLabel,
  type = 'default',
  onClick,
}: SlotProps) {
  const slotRef = useRef<HTMLLIElement | null>(null);
  const { currentValue, onChangeCurrentValue, close, slotMapRef, selectButtonRef } =
    useSelectContext();

  const handleClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
    if (disabled) return;

    onChangeCurrentValue(value);
    onClick?.(e);
    close();
    selectButtonRef.current?.focus();
  };

  const handleMouseEnter = () => {
    if (disabled) return;

    slotRef.current?.focus();
  };

  const handleMouseLeave = () => {
    if (disabled) return;

    slotRef.current?.blur();
  };

  useEffect(() => {
    const slotElementMap = slotMapRef.current;

    if (slotElementMap instanceof Map && disabled === false) {
      if (groupLabel) {
        slotElementMap.set(slotRef, { ref: slotRef, value, option: children, groupLabel });
      } else {
        slotElementMap.set(slotRef, { ref: slotRef, value, option: children });
      }
    }
  }, [disabled]);

  return (
    <S.Li
      ref={slotRef}
      key={`${value}-visible`}
      role="option"
      aria-selected={currentValue === value}
      value={value}
      tabIndex={-1}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-disabled={disabled}
      $disabled={disabled}
      $selected={currentValue === value}
    >
      {type === 'default' && children}
      {type === 'radio' && (
        <Radio
          id={value}
          label={children}
          defaultChecked={currentValue === value}
          checked={currentValue === value}
          disabled={disabled}
          removeTransition
        />
      )}
    </S.Li>
  );
}

export default Slot;
