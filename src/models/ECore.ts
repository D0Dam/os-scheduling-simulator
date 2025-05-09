import { Core } from './Core';

/**
 * E-Core: 효율 코어. 초당 1의 일을 처리, 전력 소모는 1W.
 */
export class ECore extends Core {
  constructor(props: { id: number; name: string }) {
    super(props.id, props.name, 1, 1.0, 0.1);
  }
}
