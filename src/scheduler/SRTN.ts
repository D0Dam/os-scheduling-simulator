import { Core, Process } from '@/models';
import { Scheduler } from '@/scheduler';

export class SRTN extends Scheduler {
  protected assignProcess(): void {
    this.#sort();
    this.cores.forEach((core) => {
      if (!core.hasProcess || this.#canPreempt(core)) {
        core.setProcess(this.readyQueue.shift(), this.time);
      }
    });
  }

  protected releaseProcess(): void {
    this.#sort();
    this.cores.forEach((core) => {
      if (core.process?.isEnd()) {
        this.endQueue.push(core.releaseProcess());
      } else if (this.#canPreempt(core)) {
        this.readyQueue.push(core.releaseProcess());
      }
    });
  }

  #sort(): void {
    this.readyQueue.sort((a: Process, b: Process) => a.remainProgress - b.remainProgress);
  }

  #canPreempt(core: Core): boolean {
    return (
      core.process !== undefined &&
      this.readyQueue.length > 0 &&
      this.readyQueue[0].remainProgress < core.process.remainProgress
    );
  }
}
