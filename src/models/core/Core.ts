import { Process } from '../Process';

import { PCore } from './PCore';

export abstract class Core {
  /** 코어를 점유하고 있는 프로세스, 없으면 null */
  #process: Process | undefined = undefined;

  /**
   * @param id 코어 번호 (읽기 전용)
   * @param name 코어명 (읽기 전용)
   * @param workPerSecond 초당 처리 가능한 일 (읽기 전용)
   * @param powerConsumption 초당 전력 소모량 (읽기 전용)
   * @param idlePowerConsumption 프로세스를 처리하고 있지 않을 때 소모 전력량 (읽기 전용)
   */
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly workPerSecond: number,
    public readonly powerConsumption: number,
    public readonly idlePowerConsumption: number
  ) {}

  get process(): Process | undefined {
    return this.#process;
  }

  setProcess(process: Process | undefined) {
    this.#process = process;
  }

  compare(other: Core): number {
    if (this instanceof PCore && other instanceof PCore) {
      return this.id - other.id;
    }

    if (this instanceof PCore) {
      return -1;
    }

    return 1;
  }
}
