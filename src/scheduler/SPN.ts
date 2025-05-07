import { Process } from '@/models';
import { Scheduler } from '@/scheduler';

export class SPN extends Scheduler {
  protected assignProcess(): void {
    this.readyQueue.sort((a: Process, b: Process) => a.bt - b.bt);
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
