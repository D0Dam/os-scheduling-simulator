import { useState } from 'react';

import Select from '../common/Select';
import TextField from '../common/TextField';

import * as S from './Header.styled';

function Header() {
  const [value, setValue] = useState('');

  return (
    <S.Header>
      <S.HeaderTitleWrapper>
        <S.HeaderTitle>
          바지사장 <strong>김혜준</strong>
        </S.HeaderTitle>
        <S.HeaderSubTitle>
          Figurehead <strong>Kim Hyejun</strong>
        </S.HeaderSubTitle>
      </S.HeaderTitleWrapper>
      <S.AlgorithmSettingWrapper>
        <S.SelectorWrapper>
          <S.AlgorithmSelectorTitle>Algorithm :</S.AlgorithmSelectorTitle>
          <Select name="example" placeholder="Select Algorithm" required>
            <Select.Slot value="1">FCFS</Select.Slot>
            <Select.Slot value="2">RR</Select.Slot>
            <Select.Slot value="3">SPN</Select.Slot>
            <Select.Slot value="4">SRTN</Select.Slot>
            <Select.Slot value="5">HRRN</Select.Slot>
          </Select>
        </S.SelectorWrapper>

        <S.AlgorithmSelectorTitle>δ :</S.AlgorithmSelectorTitle>
        <TextField
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          name="δ:"
          required
        />
        <S.StartButton type="button">START</S.StartButton>
      </S.AlgorithmSettingWrapper>
    </S.Header>
  );
}

export default Header;
