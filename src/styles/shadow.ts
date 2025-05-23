import { css } from 'styled-components';

const shadow = {
  box1: css`
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 20%);
  `,
  box2: css`
    box-shadow:
      0 20px 25px -5px rgb(0 0 0 / 6%),
      0 10px 10px 0 rgb(0 0 0 / 4%);
  `,
  box3: css`
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 7%),
      0 4px 6px 0 rgb(0 0 0 / 5%);
  `,
  box4: css`
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 10%),
      0 2px 4px -2px rgb(0 0 0 / 30%);
  `,
  box5: css`
    box-shadow:
      0 1px 3px 0 rgb(0 0 0 / 5%),
      0 1px 2px -1px rgb(0 0 0 / 10%);
  `,
  box6: css`
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 7%);
  `,
};
export default shadow;
