import { useState } from 'react';

import { PCore, Process } from '@/models';
import { FCFS } from '@/scheduler';

import Select from '../common/Select';
import TextField from '../common/TextField';

import * as S from './Header.styled';

import KoreatechIcon from '@/assets/svg/koreatech.svg?react';

function Header() {
  const [timeQuantum, setTimeQuantum] = useState('');
  const [algorithm, setAlgorithm] = useState('');

  const handleStart = () => {
    console.log('start', algorithm, timeQuantum);

    const scheduler = new FCFS();
    console.log('111');
    const c1 = new PCore({ id: 1, name: 'core1' });
    const c2 = new PCore({ id: 1, name: 'core1' });
    const c3 = new PCore({ id: 1, name: 'core1' });
    console.log('222');
    scheduler.setCores([c1, c2, c3]);
    console.log('333');
    const process = new Process({ name: 'p0', at: 0, bt: 10 });
    const process2 = new Process({ name: 'p1', at: 2, bt: 10 });
    const process3 = new Process({ name: 'p2', at: 3, bt: 10 });
    const process4 = new Process({ name: 'p3', at: 4, bt: 10 });
    console.log('444');
    scheduler.addProcess([process, process2, process3, process4]);
    console.log('555');
    const a = scheduler.result;
    console.log('666');

    console.log(a);
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
