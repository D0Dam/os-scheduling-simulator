import { Scheduler } from '@/scheduler';

export class RR extends Scheduler {
  readonly #timeQuantum;

  constructor(timeQuantum: number) {
    super();
    this.#timeQuantum = timeQuantum;
  }

  protected assignProcess(): void {
    this.cores.forEach((core) => {
      if (!core.process || core.process.isEnd()) {
        core.setProcess(this.readyQueue.shift());
      }
    });
  }

  protected releaseProcess(): void {
    this.cores.forEach((core) => {
      if (core.process) {
        if (core.process.isEnd()) {
          core.process.updateBurseted();
          this.endQueue.push(core.process);
        }
        if (core.process.end - core.process.start === this.#timeQuantum) {
          core.process.updateBurseted();
          this.readyQueue.push(core.process);
        }
      }
    });
  }
}
