import { useState } from 'react';

import * as S from './AdderTool.styled';

import TextField from '@/components/common/TextField';

interface Process {
  name: string;
  at: number;
  bt: number;
}
interface AdderToolProps {
  onAddProcess: (process: Process) => void;
}

function AdderTool({ onAddProcess }: AdderToolProps) {
  const [processorValue, setProcessorValue] = useState('');
  const [processNameValue, setProcessNameValue] = useState('');
  const [processArrivalValue, setProcessArrivalValue] = useState<number | null>(null);
  const [processBurstValue, setProcessBurstValue] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!processNameValue || !processArrivalValue || !processBurstValue) return;

    onAddProcess({
      name: processNameValue,
      at: processArrivalValue,
      bt: processBurstValue,
    });

    setProcessNameValue('');
    setProcessArrivalValue(null);
    setProcessBurstValue(null);
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
          <S.Button
            type="button"
            onClick={() => handleSubmit()}
            disabled={!processNameValue || !processArrivalValue || !processBurstValue}
          >
            Add Process
          </S.Button>
        </S.ProcessInputWrapper>
        <S.ProcessDeleteWrapper>
          <S.InputTitle>Process Name :</S.InputTitle>
          <TextField
            value={processorValue}
            onChange={(e) => setProcessorValue(e.currentTarget.value)}
            name="Process Name"
            required
          />
          <S.Button type="button">Delete Process</S.Button>
        </S.ProcessDeleteWrapper>
      </S.MainContainer>
    </S.Container>
  );
}

export default AdderTool;
