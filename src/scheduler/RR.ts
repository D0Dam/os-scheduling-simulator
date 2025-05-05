import { Scheduler } from './Scheduler';

export class RR extends Scheduler {
  readonly #timeQuantum;

  constructor(timeQuantum: number) {
    super();
    this.#timeQuantum = timeQuantum;
  }

  protected run(): void {
    this.cores.forEach((core) => {
      if (core.process === undefined) {
        core.setProcess(this.readyQueue.shift());
      }
    });
  }

  protected afterRun(): void {
    this.#core;
  }
}
