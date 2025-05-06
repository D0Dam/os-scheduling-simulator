import { useState } from 'react';

import { Tracer } from '@/models';
import { FCFS } from '@/scheduler';

import Select from '../common/Select';
import TextField from '../common/TextField';

import * as S from './Header.styled';

import KoreatechIcon from '@/assets/svg/koreatech.svg?react';
import { ProcessType } from '@/pages/MainPage/MainPage';

interface HeaderProps {
  processList: ProcessType[];
  setResult: (result: Tracer) => void;
}

function Header({ processList, setResult }: HeaderProps) {
  const [timeQuantum, setTimeQuantum] = useState('');
  const [algorithm, setAlgorithm] = useState('');

  const handleStart = () => {
    const scheduler = new FCFS();

    scheduler.setCores([
      { id: 1, name: 'core1', type: 'P' },
      { id: 2, name: 'core2', type: 'E' },
      { id: 3, name: 'core3', type: 'E' },
    ]);
    scheduler.addProcess(processList);
    setResult(scheduler.result);
  };

  return (
    <S.Header>
      <S.HeaderTitleWrapper>
        <KoreatechIcon />
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
          <Select
            name="example"
            placeholder="Select Algorithm"
            required
            onChangeValue={(v) => {
              setTimeQuantum('');
              setAlgorithm(v);
            }}
          >
            <Select.Slot value="FCFS">FCFS</Select.Slot>
            <Select.Slot value="RR">RR</Select.Slot>
            <Select.Slot value="SPN">SPN</Select.Slot>
            <Select.Slot value="SRTN">SRTN</Select.Slot>
            <Select.Slot value="HRRN">HRRN</Select.Slot>
          </Select>
        </S.SelectorWrapper>

        <S.AlgorithmSelectorTitle>δ :</S.AlgorithmSelectorTitle>
        <TextField
          value={timeQuantum}
          onChange={(e) => setTimeQuantum(e.currentTarget.value)}
          name="δ:"
          disabled={algorithm !== 'RR'}
        />
        <S.StartButton type="button" onClick={handleStart}>
          START
        </S.StartButton>
      </S.AlgorithmSettingWrapper>
    </S.Header>
  );
}

export default Header;
