import { useState } from 'react';

import { useShallow } from 'zustand/shallow';

import { Tracer } from '@/models';
import { FCFS, HRRN, RR, SPN, SRTN } from '@/scheduler';

import Select from '../common/Select';
import TextField from '../common/TextField';

import * as S from './Header.styled';

import KoreatechIcon from '@/assets/svg/koreatech.svg?react';
import PauseIcon from '@/assets/svg/pause.svg?react';
import PlayIcon from '@/assets/svg/play.svg?react';
import ResetIcon from '@/assets/svg/reset.svg?react';
import useSchedulerState from '@/hooks/store/useSchedulerState';
import useToastState from '@/hooks/store/useToastState';
import { ProcessType } from '@/pages/MainPage/MainPage';

interface HeaderProps {
  coreList: { id: number; name: string; type: 'P' | 'E' }[];
  processList: ProcessType[];
  setResult: (result: Tracer | null) => void;
}

const createScheduler = (algorithm: string, timeQuantum?: string) => {
  switch (algorithm) {
    case 'FCFS':
      return new FCFS();
    case 'RR':
      if (!timeQuantum) {
        throw new Error('Time quantum is required for RR algorithm');
      }
      return new RR(Number(timeQuantum));
    case 'SPN':
      return new SPN();
    case 'SRTN':
      return new SRTN();
    case 'HRRN':
      return new HRRN();
    default:
      throw new Error('Invalid algorithm');
  }
};

function Header({ coreList, processList, setResult }: HeaderProps) {
  const [timeQuantum, setTimeQuantum] = useState('');
  const [algorithm, setAlgorithm] = useState('');
  const openToast = useToastState((state) => state.open);
  const schedule = useSchedulerState(
    useShallow(({ state, running, paused, finish }) => ({ state, running, paused, finish }))
  );

  const handleStart = () => {
    if (coreList.length === 0) {
      openToast('모든 코어가 꺼져있습니다. 코어를 켜주세요.', 'warning');
      return;
    }

    if (processList.length === 0) {
      openToast('프로세스가 없습니다. 프로세스를 추가해주세요.', 'warning');
      return;
    }

    if (!algorithm) {
      openToast('알고리즘을 선택해주세요.', 'warning');
      return;
    }

    if (algorithm === 'RR' && !timeQuantum) {
      openToast('Time quantum을 입력해주세요.', 'warning');
      return;
    }

    const scheduler = createScheduler(algorithm, timeQuantum);

    scheduler.setCores(coreList);
    scheduler.addProcess(processList);
    setResult(scheduler.result);

    schedule.running();
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
        {schedule.state === 'finish' && (
          <S.StartButton type="button" onClick={handleStart}>
            START
          </S.StartButton>
        )}
        {schedule.state !== 'finish' && (
          <>
            <S.StartButton
              type="button"
              onClick={() => {
                if (schedule.state === 'running') {
                  schedule.paused();
                  return;
                }

                schedule.running();
              }}
            >
              {schedule.state === 'paused' ? <PlayIcon /> : <PauseIcon />}
            </S.StartButton>
            <S.StartButton
              type="button"
              onClick={() => {
                schedule.finish();
                setResult(null);
              }}
            >
              <ResetIcon />
            </S.StartButton>
          </>
        )}
      </S.AlgorithmSettingWrapper>
    </S.Header>
  );
}

export default Header;
