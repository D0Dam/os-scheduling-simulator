import { Process } from '../Process';

import { PCore } from './PCore';

export abstract class Core {
  /** 코어를 점유하고 있는 프로세스, 없으면 null */
  #process: Process | undefined = undefined;

  #occupancyTime: number = 0;

  powerUsage: number = 0;

  /**
   * @param id 코어 번호
   * @param name 코어명
   * @param wps 초당 처리 가능한 일
   * @param pc 초당 전력 소모량
   * @param ipc 프로세스를 처리하고 있지 않을 때 소모 전력량
   */
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly wps: number,
    public readonly pc: number,
    public readonly ipc: number
  ) {}

  get process(): Process | undefined {
    return this.#process;
  }

  setProcess(process: Process | undefined) {
    this.#process = process;
    this.#occupancyTime = 0;
  }

  get occupancyTime(): number {
    return this.#occupancyTime;
  }

  increaseOccupancyTime() {
    if (this.#process !== undefined) {
      this.#occupancyTime += 1;
    }
  }

  isOccupancyOver(timeQuantum?: number): boolean {
    if (this.#process === undefined) {
      return false;
    }

    const threshold = timeQuantum ?? this.#process.bt;
    return this.#occupancyTime === threshold;
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
