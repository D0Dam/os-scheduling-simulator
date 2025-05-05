import { Core, Result, Process, processCompare } from '../models';

export abstract class Scheduler {
  readonly #createQueue: Process[];

  readonly #cores: Core[];

  readonly readyQueue: Process[];

  readonly endQueue: Process[];

  readonly #result: Result;

  protected time: number;

  constructor() {
    this.#createQueue = [];
    this.#cores = [];
    this.readyQueue = [];
    this.endQueue = [];
    this.#result = new Result();
    this.time = 0;
  }

  get cores(): Core[] {
    return this.#cores;
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
    this.#cores.length = 0;
    this.#cores.push(...cores);
  }

  isDone(): boolean {
    return this.#createQueue.length === 0 && this.#cores.every((core) => core.process === null);
  }

  #readyProcess() {
    while (this.#createQueue.length > 0 && this.#createQueue[0].at <= this.time) {
      this.readyQueue.push(this.#createQueue.shift()!);
    }
  }

  protected beforeRun(): void {
    this.readyQueue.forEach((process) => {
      s;
    });
  }

  protected afterRun(): void {
    this.#cores.forEach((core) => {
      if (core.process !== undefined) {
        if (core.process.tt - core.process.wt === core.process.bt) {
          this.endQueue.push(core.process);
          core.setProcess(undefined);
        }
      }
    });
  }

  #updateResult(): void {}

  start(): void {
    this.#createQueue.sort(processCompare);
    this.#cores.sort((a: Core, b: Core) => a.compare(b));

    while (!this.isDone()) {
      this.#readyProcess();
      this.beforeRun();
      this.run();
      this.#updateGanttChart();
      this.afterRun();
      this.#updateResult();
      this.time += 1;
    }
  }

  protected abstract run(): void;
}
