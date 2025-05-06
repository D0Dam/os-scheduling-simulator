import { Process } from '@/models';

export abstract class Core {
  /** 코어를 점유하고 있는 프로세스, 없으면 undefined */
  #process?: Process = undefined;

  #hasProcess: boolean = false;

  #powerUsage: number = 0;

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

  setProcess(process: Process | undefined, time: number) {
    if (!this.#process) {
      this.#powerUsage += this.ipc;
    }
    this.#process = process;
    if (this.#process) {
      this.#process.start = time;
    }
    this.#hasProcess = true;
  }

  get hasProcess(): boolean {
    return this.#hasProcess;
  }

  releaseProcess(): Process {
    this.#hasProcess = false;
    return this.#process!;
  }

  get powerUsage(): number {
    return this.#powerUsage;
  }

  updatePowerUsage(): void {
    if (this.#process) {
      this.#powerUsage += this.pc * (this.#process.end - this.#process.start);
    }
  }

  compare(other: Core): number {
    return this.id - other.id;
  }
}
