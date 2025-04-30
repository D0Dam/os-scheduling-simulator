import { useState } from 'react';

import * as S from './AdderTool.styled';

import TextField from '@/components/common/TextField';

function AdderTool() {
  const [processorValue, setProcessorValue] = useState('');
  const [processNameValue, setProcessNameValue] = useState('');
  const [processArrivalValue, setProcessArrivalValue] = useState('');
  const [processBurstValue, setProcessBurstValue] = useState('');

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
            />
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InputTitle>Arrival Time :</S.InputTitle>
            <TextField
              value={processArrivalValue}
              onChange={(e) => setProcessArrivalValue(e.currentTarget.value)}
              name="Arrival Time"
              required
            />
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InputTitle>Burst Time :</S.InputTitle>
            <TextField
              value={processBurstValue}
              onChange={(e) => setProcessBurstValue(e.currentTarget.value)}
              name="Burst Time"
              required
            />
          </S.InputWrapper>
          <S.Button type="button">Add Process</S.Button>
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
