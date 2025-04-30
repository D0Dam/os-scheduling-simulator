import AdderTool from './AdderTool';
import * as S from './MainPage.styled';

import Header from '@/components/Header/Header';

function MainPage() {
  return (
    <S.Container>
      <Header />
      <AdderTool />
    </S.Container>
  );
}

export default MainPage;
