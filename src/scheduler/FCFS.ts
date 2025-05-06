import { Scheduler } from '@/scheduler';

export class FCFS extends Scheduler {
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
      }
    });
  }
}
