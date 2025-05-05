import { Scheduler } from '@/scheduler';

export class CustomAlgorithm extends Scheduler {
  protected run(): void {
    this.cores.forEach((core) => {
      if (core.process === undefined) {
        core.setProcess(this.readyQueue.shift());
      }
    });
  }
}
