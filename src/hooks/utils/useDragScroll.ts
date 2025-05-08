import { useState } from 'react';

const useDragScroll = <T extends HTMLElement>() => {
  const [isActive, setIsActive] = useState(false);
  const [prevPositionX, setPrevPositionX] = useState(0);
  const [mouseDownClientX, setMouseDownClientX] = useState(0);

  const inActive = () => setIsActive(false);
  const active = () => setIsActive(true);

  const onMouseMove: React.MouseEventHandler<T> = (e) => {
    if (isActive) {
      const moveX = e.clientX - mouseDownClientX;
      e.currentTarget.scrollTo(prevPositionX + moveX, 0);
    }
  };

  const onMouseDown: React.MouseEventHandler<T> = (e) => {
    active();
    setMouseDownClientX(e.clientX);
    setPrevPositionX(e.currentTarget.scrollLeft);
    e.currentTarget.style.cursor = 'grabbing';
  };

  const onMouseUp: React.MouseEventHandler<T> = (e) => {
    inActive();
    e.currentTarget.style.cursor = 'grab';
  };

  return { active, inActive, onMouseDown, onMouseMove, onMouseUp };
};

export default useDragScroll;
