import { Scheduler } from '@/scheduler';

export class RR extends Scheduler {
  readonly timeQuantum;

  constructor(timeQuantum: number) {
    super();
    this.timeQuantum = timeQuantum;
  }

  protected assignProcess() {
    this.cores.forEach((core) => {
      if (!core.hasProcess) {
        core.setProcess(this.readyQueue.shift(), this.time);
      }
    });
  }

  protected releaseProcess() {
    this.cores.forEach((core) => {
      if (core.process) {
        if (core.process.isEnd()) {
          this.endQueue.push(core.releaseProcess());
        } else if (core.process.end - core.process.start === this.timeQuantum) {
          this.readyQueue.push(core.releaseProcess());
        }
      }
    });
  }
}
