import { useRef, useState } from 'react';

import { useShallow } from 'zustand/shallow';

import { Tracer } from '@/models';
import { CustomAlgorithm, FCFS, HRRN, RR, SPN, SRTN } from '@/scheduler';

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
  result: Tracer | null;
  coreList: { id: number; name: string; type: 'P' | 'E' }[];
  processList: ProcessType[];
  setResult: (result: Tracer | null) => void;
  changeSchedulerOption: (algorithm: string) => void;
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
    case 'CustomAlgorithm':
      return new CustomAlgorithm();
    default:
      throw new Error('Invalid algorithm');
  }
};

function Header({ coreList, processList, setResult, result, changeSchedulerOption }: HeaderProps) {
  const [timeQuantum, setTimeQuantum] = useState('');
  const [algorithm, setAlgorithm] = useState('');
  const prevParamsRef = useRef<{
    coreList: HeaderProps['coreList'];
    processList: HeaderProps['processList'];
    algorithm: string;
    timeQuantum: string;
  } | null>(null);

  const openToast = useToastState((state) => state.open);
  const schedule = useSchedulerState(
    useShallow(({ state, running, paused, finish, interval, setInterval }) => ({
      state,
      running,
      paused,
      finish,
      interval,
      setInterval,
    }))
  );

  const handleStart = () => {
    if (coreList.length === 0) {
      openToast('모든 코어가 꺼져있습니다. 코어를 켜주세요.', 'default');
      return;
    }

    if (processList.length === 0) {
      openToast('프로세스가 없습니다. 프로세스를 추가해주세요.', 'default');
      return;
    }

    if (!algorithm) {
      openToast('알고리즘을 선택해주세요.', 'default');
      return;
    }

    if (algorithm === 'RR' && !timeQuantum) {
      openToast('Time Quantum을 입력해주세요.', 'default');
      return;
    }

    if (schedule.interval < 100 || schedule.interval > 1000) {
      openToast('Interval은 100ms ~ 1000ms 사이여야 합니다.', 'default');
      return;
    }

    const currentParams = {
      coreList,
      processList,
      algorithm,
      timeQuantum,
    };

    if (result && JSON.stringify(prevParamsRef.current) === JSON.stringify(currentParams)) {
      openToast('스케줄링 변경 사항이 없습니다.', 'default');
      return;
    }

    // 변경됐을 경우 갱신
    prevParamsRef.current = currentParams;
    changeSchedulerOption(JSON.stringify(currentParams));

    const scheduler = createScheduler(algorithm, timeQuantum);

    scheduler.setCores(coreList);
    scheduler.addProcess(processList);
    setResult(scheduler.result);

    schedule.running();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth', // 부드럽게 스크롤 (선택사항)
    });
  };

  return (
    <S.Header>
      <S.HeaderWrapper>
        <KoreatechIcon width={52} height={52} />
        <S.HeaderTitleWrapper>
          <S.HeaderTitle>
            바지사장 <strong>김혜준</strong>
          </S.HeaderTitle>
          <S.HeaderSubTitle>
            Figurehead <strong>Kim Hyejun</strong>
          </S.HeaderSubTitle>
        </S.HeaderTitleWrapper>
      </S.HeaderWrapper>
      <S.AlgorithmSettingWrapper>
        <S.SelectorWrapper>
          <Select
            label="Algorithm"
            name="example"
            placeholder="Select.."
            onChangeValue={(v) => {
              setTimeQuantum('');
              setAlgorithm(v);
            }}
            disabled={schedule.state !== 'finish'}
          >
            <Select.Slot value="FCFS">FCFS</Select.Slot>
            <Select.Slot value="RR">RR</Select.Slot>
            <Select.Slot value="SPN">SPN</Select.Slot>
            <Select.Slot value="SRTN">SRTN</Select.Slot>
            <Select.Slot value="HRRN">HRRN</Select.Slot>
            <Select.Slot value="CustomAlgorithm">PANTS</Select.Slot>
          </Select>
        </S.SelectorWrapper>

        <S.TimeQuantumWrapper>
          <TextField
            label="Time Quantum"
            value={timeQuantum}
            onChange={(e) => setTimeQuantum(e.currentTarget.value)}
            name="timeQuantum"
            style={{ textAlign: 'right' }}
            disabled={algorithm !== 'RR' || schedule.state !== 'finish'}
          />
        </S.TimeQuantumWrapper>
        <S.IntervalWrapper>
          <TextField
            name="interval"
            label="Interval (100ms ~ 1000ms)"
            value={schedule.interval === 0 ? '' : schedule.interval}
            onChange={(e) => {
              const { value } = e.currentTarget;

              if (/^\d*$/.test(value)) {
                schedule.setInterval(Number(value));
              }
            }}
            rightItem={<span>ms</span>}
            style={{ textAlign: 'right' }}
            disabled={schedule.state !== 'finish'}
          />
        </S.IntervalWrapper>
        <S.ButtonWrapper>
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
        </S.ButtonWrapper>
      </S.AlgorithmSettingWrapper>
    </S.Header>
  );
}

export default Header;
