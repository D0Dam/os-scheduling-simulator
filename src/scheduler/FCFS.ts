import { Scheduler } from './Scheduler';

export class FCFS extends Scheduler {
  protected run(): void {
    this.cores.forEach((core) => {
      if (core.process === undefined) {
        core.setProcess(this.readyQueue.shift());
      }
    });
  }
}
