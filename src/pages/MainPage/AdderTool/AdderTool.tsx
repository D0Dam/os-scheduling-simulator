import { useState } from 'react';

import * as S from './AdderTool.styled';

import TextField from '@/components/common/TextField';
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

interface Process {
  name: string;
  at: number;
  bt: number;
  color?: string;
}
interface AdderToolProps {
  onAddProcess: (process: Process) => void;
  onDeleteProcess: (name: string) => void;
  processList: Process[];
}

const getNextProcessName = (processList: Process[]): string => {
  const usedNumbers = processList
    .map((p) => /^p(\d+)$/.exec(p.name))
    .filter(Boolean)
    .map((match) => Number(match![1]));

  const nextIndex = usedNumbers.length > 0 ? Math.max(...usedNumbers) + 1 : 0;
  return `p${nextIndex}`;
};

function AdderTool({ onAddProcess, onDeleteProcess, processList }: AdderToolProps) {
  const openToast = useToastState((state) => state.open);
  const [processorValue, setProcessorValue] = useState('');
  const [processNameValue, setProcessNameValue] = useState('');
  const [processArrivalValue, setProcessArrivalValue] = useState<number | null>(null);
  const [processBurstValue, setProcessBurstValue] = useState<number | null>(null);

  const autoName = getNextProcessName(processList);

  const handleSubmit = () => {
    const nameToUse = processNameValue.trim() || autoName;
    const colorIndex = processList.length % PROCESS_COLORS.length;
    const assignedColor = PROCESS_COLORS[colorIndex];

    if (processArrivalValue === null) {
      openToast('Arrival Time 에는 숫자만 입력해주세요.', 'warning');
      return;
    }

    if (processBurstValue === null) {
      openToast('Burst Time 에는 숫자만 입력해주세요.', 'warning');
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
      openToast('삭제할 프로세스 이름을 입력해주세요.', 'warning');
      return;
    }

    onDeleteProcess(processorValue.trim());
    setProcessorValue('');
  };

  return (
    <S.Container>
      <S.Title>Adder Tool</S.Title>
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
              value={processArrivalValue ?? ''}
              onChange={(e) =>
                setProcessArrivalValue(
                  Number(e.currentTarget.value) === 0 ? null : Number(e.currentTarget.value)
                )
              }
              name="Arrival Time"
              required
              type="number"
            />
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InputTitle>Burst Time :</S.InputTitle>
            <TextField
              value={processBurstValue ?? ''}
              onChange={(e) =>
                setProcessBurstValue(
                  Number(e.currentTarget.value) === 0 ? null : Number(e.currentTarget.value)
                )
              }
              name="Burst Time"
              required
              type="number"
            />
          </S.InputWrapper>
          <S.ProcessButton type="button" onClick={() => handleSubmit()}>
            Add Process
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
          <S.Button type="button" onClick={() => handleDelete()}>
            Delete Process
          </S.Button>
        </S.ProcessDeleteWrapper>
      </S.MainContainer>
    </S.Container>
  );
}

export default AdderTool;
