import { Process } from '@/models';
import { Scheduler } from '@/scheduler';

export class HRRN extends Scheduler {
  protected assignProcess(): void {
    this.readyQueue.sort((a: Process, b: Process) => b.responseRatio - a.responseRatio);
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
