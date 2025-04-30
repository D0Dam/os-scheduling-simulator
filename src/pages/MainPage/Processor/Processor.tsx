import * as S from './Processor.styled';

import Radio from '@/components/common/Radio';
import RadioGroup from '@/components/common/RadioGroup';

const PROCESSOR = [
  {
    id: '1',
    name: 'Core 1',
    w: '123.4',
    p: '44.4',
  },
  {
    id: '2',
    name: 'Core 2',
    w: '13.4',
    p: '42.4',
  },
  {
    id: '3',
    name: 'Core 3',
    w: '122.4',
    p: '14.4',
  },
  {
    id: '4',
    name: 'Core 4',
    w: '111.4',
    p: '43.4',
  },
];

function Processor() {
  return (
    <S.Container>
      <S.Title>Processor</S.Title>
      <S.MainContainer>
        <S.CoreContainer>
          {PROCESSOR.map(({ id, name, w, p }) => (
            <S.CoreItem key={id}>
              <S.CoreItemTitleWrapper>
                <S.CoreItemTitle>{name}</S.CoreItemTitle>
                <S.CoreItemValue>
                  {w}W {p} %
                </S.CoreItemValue>
              </S.CoreItemTitleWrapper>
              <RadioGroup gap={28}>
                <Radio label="OFF" name={`identity${id}`} value={`OFF${id}`} defaultChecked />
                <Radio label="P-CORE" name={`identity${id}`} value={`P-CORE${id}`} />
                <Radio label="E-CORE" name={`identity${id}`} value={`E-CORE${id}`} />
              </RadioGroup>
            </S.CoreItem>
          ))}
        </S.CoreContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default Processor;
