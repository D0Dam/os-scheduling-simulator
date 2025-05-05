import { Scheduler } from '@/scheduler';

export class HRRN extends Scheduler {
  protected run(): void {
    this.cores.forEach((core) => {
      if (core.process === undefined) {
        core.setProcess(this.readyQueue.shift());
      }
    });
  }
}
