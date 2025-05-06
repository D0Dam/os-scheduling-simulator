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
        core.process?.setStart(this.time);
      }
    });
  }

  protected releaseProcess(): void {
    this.cores.forEach((core) => {
      if (core.process) {
        if (core.process.isEnd()) {
          core.process.updateBurseted(core.wps);
          this.endQueue.push(core.process);
        }
        if (core.process.end - core.process.start === this.#timeQuantum) {
          core.process.updateBurseted(core.wps);
          this.readyQueue.push(core.process);
        }
      }
    });
  }
}
