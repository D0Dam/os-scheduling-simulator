import { Core } from '@/models';
import { Scheduler } from '@/scheduler';

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

  protected isOccupancyOver(core: Core): boolean {
    return core.isOccupancyOver(this.#timeQuantum);
  }
}
