import { useShallow } from 'zustand/react/shallow';

import * as S from './Toast.styled';

import IconButton from '@/components/common/IconButton';
import Portal from '@/components/common/Portal';
import useToastState from '@/hooks/store/useToastState';
import useMediaQuery from '@/hooks/utils/useMediaQuery';
import useTimeout from '@/hooks/utils/useTimeout';
import { large } from '@/styles/mediaQueries';

const iconComponents = {
  default: <S.InfoIcon />,
  success: <S.SuccessIcon />,
  error: <S.ErrorIcon />,
  warning: <S.ErrorIcon />,
  info: <S.InfoIcon />,
};

function Toast() {
  const isLarge = useMediaQuery(large);
  const [list, close, closeFirst] = useToastState(
    useShallow((state) => [state.list, state.close, state.closeFirst])
  );

  useTimeout(
    () => {
      if (list[0]?.isOpen) {
        closeFirst();
      }
    },
    4000,
    [list]
  );

  return (
    <Portal isOpen={list.length > 0}>
      <S.ToastList>
        {list.map(({ type, text, key }) => (
          <S.ToastContainer $type={type || 'default'} key={key}>
            <S.ContentWrapper>
              {isLarge && iconComponents[type || 'default']}
              <S.Content>{text}</S.Content>
            </S.ContentWrapper>
            <IconButton onClick={() => close(key)} icon={S.CloseIcon} />
          </S.ToastContainer>
        ))}
      </S.ToastList>
    </Portal>
  );
}

export default Toast;
