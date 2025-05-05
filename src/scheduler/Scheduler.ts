import { Core, Result, Process, processCompare } from '@/models';

export abstract class Scheduler {
  readonly #createQueue: Process[];

  protected readonly cores: Core[];

  readonly readyQueue: Process[];

  readonly endQueue: Process[];

  readonly #result: Result;

  protected time: number;

  constructor() {
    this.#createQueue = [];
    this.cores = [];
    this.readyQueue = [];
    this.endQueue = [];
    this.#result = new Result();
    this.time = 0;
  }

  get result(): Result {
    return this.#result;
  }

  addProcess(...processes: Process[]) {
    this.#createQueue.push(...processes);
  }

  deleteProcess(processName: string): boolean {
    const index = this.#createQueue.findIndex((process) => process.name === processName);

    if (index !== -1) {
      this.#createQueue.splice(index, 1);
      return true;
    }

    return false;
  }

  setCores(cores: Core[]) {
    this.cores.length = 0;
    this.cores.push(...cores);
  }

  isDone(): boolean {
    return this.#createQueue.length === 0 && this.cores.every((core) => core.process === null);
  }

  #readyProcess() {
    while (this.#createQueue.length > 0 && this.#createQueue[0].at <= this.time) {
      this.readyQueue.push(this.#createQueue.shift()!);
    }
  }

  protected beforeRun(): void {
    this.readyQueue.forEach(
      (process) => process.at - process.bt
      // process.
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected isOccupancyOver(core: Core) {
    return core.isOccupancyOver();
  }

  #afterRun(): void {
    this.cores.forEach((core) => {
      if (core.process !== undefined) {
        if (core.isOccupancyOver()) {
          this.endQueue.push(core.process);
          core.setProcess(undefined);
        }
      }
    });
  }

  start(): void {
    this.#createQueue.sort(processCompare);
    this.cores.sort((a: Core, b: Core) => a.compare(b));
    this.#result.setCore(this.cores);

    while (!this.isDone()) {
      this.#readyProcess();
      this.beforeRun();
      this.run();
      this.#result.updateGanttChart(this.time, this.cores);
      this.#result.updatePowerUsage(this.cores);
      this.#afterRun();
      this.#result.updateReadyQueue(this.readyQueue);

      this.cores.forEach((core) => {
        // TODO : real busrted time 구하기
        core.increaseOccupancyTime();
      });
      this.time += 1;
    }
  }

  protected abstract run(): void;
}
