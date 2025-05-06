import { Scheduler } from '@/scheduler';

export class FCFS extends Scheduler {
  protected assignProcess(): void {
    this.cores.forEach((core) => {
      if (!core.hasProcess) {
        core.setProcess(this.readyQueue.shift(), this.time);
      }
    });
  }

  protected releaseProcess(): void {
    this.cores.forEach((core) => {
      if (core.process?.isEnd()) {
        this.endQueue.push(core.releaseProcess());
      }
    });
  }
}
