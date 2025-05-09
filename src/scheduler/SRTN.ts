import { Core } from '@/models';
import { Scheduler } from '@/scheduler';

export class SRTN extends Scheduler {
  protected assignProcess() {
    this.sort();
    this.cores.forEach((core) => {
      if (!core.hasProcess) {
        core.setProcess(this.readyQueue.shift(), this.time);
      }
    });
  }

  protected releaseProcess() {
    this.sort();
    this.cores.forEach((core) => {
      if (core.process?.isEnd()) {
        this.endQueue.push(core.releaseProcess());
      } else if (this.canPreempt(core)) {
        this.readyQueue.push(core.releaseProcess());
      }
    });
  }

  sort() {
    this.readyQueue.sort((a, b) => a.remainProgress - b.remainProgress);
  }

  canPreempt(core: Core) {
    return (
      core.process !== undefined &&
      this.readyQueue.length > 0 &&
      this.readyQueue[0].remainProgress < core.process.remainProgress
    );
  }
}
