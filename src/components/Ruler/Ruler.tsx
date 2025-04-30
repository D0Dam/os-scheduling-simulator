import * as S from './Ruler.styled';

interface RulerProps {
  count: number; // 눈금 개수
  scale: number; // 눈금 간격
}
function Ruler({ count, scale }: RulerProps) {
  return (
    <S.RulerTrack style={{ width: `${scale * count}px` }}>
      {Array.from({ length: count + 1 }).map((_, index) => (
        <S.TickWrapper key={index} style={{ width: `${scale}px` }}>
          <S.TickLine isMajor={index % 5 === 0} />
          {index % 5 === 0 && <S.TickLabel>{index}</S.TickLabel>}
        </S.TickWrapper>
      ))}
    </S.RulerTrack>
  );
}

export default Ruler;
