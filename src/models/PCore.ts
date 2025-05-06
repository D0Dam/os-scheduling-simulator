import { Core } from './Core';

/**
 * P-Core: 성능 코어. 초당 2의 일을 처리, 전력 소모는 3W.
 */
export class PCore extends Core {
  constructor(props: { id: number; name: string }) {
    super(
      props.id,
      props.name,
      2, // workPerSecond
      3.0, // powerConsumption
      0.5 // idlePowerConsumption
    );
  }
}
