import { Scheduler } from '@/scheduler';

export class SPN extends Scheduler {
  protected assignProcess() {
    this.readyQueue.sort((a, b) => a.bt - b.bt);
    this.cores.forEach((core) => {
      if (!core.hasProcess) {
        core.setProcess(this.readyQueue.shift(), this.time);
      }
    });
  }

  protected releaseProcess() {
    this.cores.forEach((core) => {
      if (core.process?.isEnd()) {
        this.endQueue.push(core.releaseProcess());
      }
    });
  }
}
