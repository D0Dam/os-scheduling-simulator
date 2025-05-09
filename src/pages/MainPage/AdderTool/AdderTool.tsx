import { useState } from 'react';

import { useShallow } from 'zustand/shallow';

import * as S from './AdderTool.styled';

import TextField from '@/components/common/TextField';
import useSchedulerState from '@/hooks/store/useSchedulerState';
import useToastState from '@/hooks/store/useToastState';

const PROCESS_COLORS = [
  '#BAC2E1',
  '#B3BCDE',
  '#ABB5DB',
  '#A3AED7',
  '#a7a5e5',
  '#9896D0',
  '#8A88BD',
  '#7D7CAC',
  '#72719C',
  '#68678E',
];

const getNextProcessName = (processList: ProcessType[]): string => {
  const usedNumbers = processList
    .map((p) => /^P(\d+)$/.exec(p.name))
    .filter(Boolean)
    .map((match) => Number(match![1]));

  const nextIndex = usedNumbers.length > 0 ? Math.max(...usedNumbers) + 1 : 0;
  return `P${nextIndex}`;
};

interface ProcessType {
  name: string;
  at: number;
  bt: number;
  color: string;
}
interface AdderToolProps {
  onAddProcess: (process: ProcessType) => void;
  onDeleteProcess: (name: string) => void;
  processList: ProcessType[];
  addMockProcess: () => void;
}

function AdderTool({ onAddProcess, onDeleteProcess, processList, addMockProcess }: AdderToolProps) {
  const openToast = useToastState((state) => state.open);
  const [processorValue, setProcessorValue] = useState('');
  const [processNameValue, setProcessNameValue] = useState('');
  const [processArrivalValue, setProcessArrivalValue] = useState<number | null>(null);
  const [processBurstValue, setProcessBurstValue] = useState<number | null>(null);

  const autoName = getNextProcessName(processList);
  const schedule = useSchedulerState(
    useShallow(({ state, running, paused }) => ({ state, running, paused }))
  );

  const handleSubmit = () => {
    const nameToUse = processNameValue.trim() || autoName;
    const colorIndex = processList.length % PROCESS_COLORS.length;
    const assignedColor = PROCESS_COLORS[colorIndex];

    if (processArrivalValue === null) {
      openToast('Arrival Time 에 입력된 값이 없습니다.', 'default');
      return;
    }

    if (processBurstValue === null) {
      openToast('Burst Time 에 입력된 값이 없습니다.', 'default');
      return;
    }

    if (processList.length >= 15) {
      openToast('추가할 수 있는 Process의 수는 최대 15개입니다.', 'default');
      return;
    }
    onAddProcess({
      name: nameToUse,
      at: processArrivalValue,
      bt: processBurstValue,
      color: assignedColor,
    });

    setProcessNameValue('');
    setProcessArrivalValue(null);
    setProcessBurstValue(null);
  };

  const handleDelete = () => {
    if (!processorValue.trim()) {
      openToast('삭제할 Process 이름을 입력해주세요.', 'default');
      return;
    }

    onDeleteProcess(processorValue.trim());
    setProcessorValue('');
  };

  return (
    <S.Container>
      <S.Title>Process Tool</S.Title>
      <S.MainContainer>
        <S.ProcessInputWrapper>
          <S.InputWrapper>
            <S.InputTitle>Process Name :</S.InputTitle>
            <TextField
              value={processNameValue}
              onChange={(e) => setProcessNameValue(e.currentTarget.value)}
              name="Process Name"
              required
              maxLength={6}
              placeholder={autoName}
            />
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InputTitle>Arrival Time :</S.InputTitle>
            <TextField
              value={processArrivalValue === null ? '' : processArrivalValue}
              onChange={(e) => {
                const { value } = e.currentTarget;

                if (value === '') {
                  setProcessArrivalValue(null);
                  return;
                }

                if (/^\d*$/.test(value)) {
                  setProcessArrivalValue(Number(value));
                }
              }}
              name="Arrival Time"
              required
            />
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InputTitle>Burst Time :</S.InputTitle>
            <TextField
              value={!processBurstValue ? '' : processBurstValue}
              onChange={(e) => {
                const { value } = e.currentTarget;

                if (/^\d*$/.test(value)) {
                  setProcessBurstValue(Number(value));
                }
              }}
              name="Burst Time"
              required
            />
          </S.InputWrapper>
          <S.ProcessButton
            type="button"
            onClick={() => handleSubmit()}
            disabled={schedule.state !== 'finish'}
          >
            Add Process
          </S.ProcessButton>
          <S.ProcessButton
            type="button"
            onClick={addMockProcess}
            disabled={schedule.state !== 'finish'}
          >
            Add Mock
          </S.ProcessButton>
        </S.ProcessInputWrapper>
        <S.ProcessDeleteWrapper>
          <S.InputTitle>Process Name :</S.InputTitle>
          <TextField
            value={processorValue}
            onChange={(e) => setProcessorValue(e.currentTarget.value)}
            name="Process Name"
            required
          />
          <S.Button
            type="button"
            onClick={() => handleDelete()}
            disabled={schedule.state !== 'finish'}
          >
            Delete Process
          </S.Button>
        </S.ProcessDeleteWrapper>
      </S.MainContainer>
    </S.Container>
  );
}

export default AdderTool;
