import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';

import * as S from './Select.styled';
import groupSlotByLabel from './utils/groupSlotByLabel';

import useBooleanState from '@/hooks/utils/useBooleanState';
import useOnClickOutside from '@/hooks/utils/useOnClickOutside';
import useWrappingContext from '@/hooks/utils/useWrappingContext';

interface SelectContextState {
  close: VoidFunction;
  currentValue: string;
  slotMapRef: React.MutableRefObject<SlotMap>;
  selectButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
  onChangeCurrentValue: (value: string) => void;
}

interface SelectProps {
  name: string;
  children: React.ReactNode;
  defaultValue?: string;
  defaultOption?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  onChangeValue?: (value: string) => void;
}

export interface SlotMapValue {
  ref: React.RefObject<HTMLLIElement>;
  value: string;
  option: string;
  groupLabel?: string;
}

type SlotMap = Map<React.RefObject<HTMLLIElement>, SlotMapValue>;

const SelectContext = createContext<SelectContextState | null>(null);

export const useSelectContext = () => useWrappingContext(SelectContext);

export default function Select({
  label,
  required = false,
  disabled = false,
  name,
  children,
  defaultValue = '',
  defaultOption = '',
  placeholder = '',
  onChangeValue,
}: SelectProps) {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const selectButtonRef = useRef<HTMLButtonElement | null>(null);
  const slotMapRef = useRef<SlotMap>(new Map());
  const { value: isOpen, setFalse: close, setTrue: open, toggle } = useBooleanState(false);
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const onChangeCurrentValue = (value: string) => {
    setCurrentValue(value);
    onChangeValue?.(value);
  };

  const moveFocus = (count = 1) => {
    const slotRefArray = Array.from(slotMapRef.current.values());
    const currentIndex = slotRefArray.findIndex(
      ({ ref }) => ref.current === document.activeElement
    );

    slotRefArray[currentIndex + count]?.ref.current?.focus();
  };

  const contextValue = useMemo(
    () => ({
      close,
      currentValue,
      onChangeCurrentValue,
      slotMapRef,
      selectButtonRef,
    }),
    [close, currentValue, onChangeCurrentValue, slotMapRef, selectButtonRef]
  );

  const handleSelectButtonKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'ArrowDown' && !isOpen) {
      open();
    }
  };

  const handleOptionListKeyDown: React.KeyboardEventHandler<HTMLUListElement> = (e) => {
    // 이미 이벤트가 실행되는 중이라면 아무 동작도 하지 않습니다.
    if (e.defaultPrevented) return;

    switch (e.key) {
      case 'Down':
      case 'ArrowDown':
        moveFocus(1);
        break;
      case 'Up':
      case 'ArrowUp':
        moveFocus(-1);
        break;
      case ' ':
      case 'Enter':
        onChangeCurrentValue(document.activeElement?.getAttribute('value') || '');
        selectButtonRef.current?.focus();
        close();
        break;
      case 'Esc':
      case 'Escape':
        close();
        selectButtonRef.current?.focus();
        break;
      default:
        return;
    }

    e.preventDefault();
  };

  useEffect(() => {
    if (isOpen) {
      const slotRefArray = Array.from(slotMapRef.current.values());
      const selectedSlot = slotRefArray.find(({ value }) => value === currentValue);

      if (selectedSlot) {
        selectedSlot.ref.current?.focus();
      } else {
        slotRefArray[0].ref.current?.focus();
      }
    }
  }, [isOpen]);

  useOnClickOutside(selectRef, () => {
    if (isOpen) {
      close();
      selectButtonRef.current?.focus();
    }
  });

  return (
    <SelectContext.Provider value={contextValue}>
      <S.SelectContainer ref={selectRef}>
        {label && (
          <S.Label htmlFor={name} $disabled={!!disabled}>
            <span>{label}</span>
            {required && <S.RequiredCircle />}
          </S.Label>
        )}
        <S.SelectButton
          id={name}
          ref={selectButtonRef}
          value={currentValue}
          role="combobox"
          tabIndex={0}
          aria-label={label}
          aria-controls="select"
          aria-haspopup="true"
          aria-required={required}
          aria-expanded={isOpen}
          onClick={toggle}
          type="button"
          $isOpen={isOpen}
          onKeyDown={handleSelectButtonKeyDown}
          disabled={disabled}
        >
          {Array.from(slotMapRef.current.values()).find(({ value }) => value === currentValue)
            ?.option ||
            defaultOption ||
            placeholder}
          <S.ChevronDownIcon $isOpen={isOpen} />
        </S.SelectButton>

        <S.OptionList
          role="listbox"
          aria-labelledby="select-button"
          id="select"
          $isOpen={isOpen}
          $hasLabel={!!label}
          onKeyDown={handleOptionListKeyDown}
        >
          {children}
        </S.OptionList>
      </S.SelectContainer>

      <S.HiddenSelect>
        <select
          name={name}
          tabIndex={-1}
          value={currentValue}
          required={required}
          disabled={disabled}
          onChange={(e) => {
            setCurrentValue(e.target.value);
          }}
        >
          {groupSlotByLabel(Array.from(slotMapRef.current.values())).map((item) => {
            if ('label' in item) {
              return (
                <optgroup label={item.label} key={item.label}>
                  {item.element.map(({ value, option }) => (
                    <option value={value} key={`${value}-hidden`}>
                      {option}
                    </option>
                  ))}
                </optgroup>
              );
            }

            return (
              <option value={item.value} key={`${item.value}-hidden`}>
                {item.option}
              </option>
            );
          })}
        </select>
      </S.HiddenSelect>
    </SelectContext.Provider>
  );
}
