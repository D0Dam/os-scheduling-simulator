import React from 'react';

import * as S from './SlotGroup.styled';

interface SlotGroupProps {
  children: React.ReactElement[];
  label: string;
}

function SlotGroup({ children, label }: SlotGroupProps) {
  return (
    <S.Container role="group">
      <S.Label htmlFor={label}>{label}</S.Label>
      <ul tabIndex={-1} id={label} role="listbox">
        {React.Children.map(children, (child) => React.cloneElement(child, { groupLabel: label }))}
      </ul>
    </S.Container>
  );
}

export default SlotGroup;
