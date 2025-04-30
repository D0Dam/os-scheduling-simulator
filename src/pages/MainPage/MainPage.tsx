import * as S from './MainPage.styled';

import Select from '@/components/common/Select';

function MainPage() {
  return (
    <S.Container>
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
          <S.AlgorithmSelectorLabel>Algorithm :</S.AlgorithmSelectorLabel>
          <Select name="example" placeholder="text">
            <Select.Slot value="1">FCFS</Select.Slot>
            <Select.Slot value="2">RR</Select.Slot>
            <Select.Slot value="3">SPN</Select.Slot>
            <Select.Slot value="4">SRTN</Select.Slot>
            <Select.Slot value="5">HRRN</Select.Slot>
          </Select>
        </S.AlgorithmSettingWrapper>
      </S.Header>
    </S.Container>
  );
}

export default MainPage;
