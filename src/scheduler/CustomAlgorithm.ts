import { Core, PCore, Process } from '@/models';
import { Scheduler } from '@/scheduler';

export class CustomAlgorithm extends Scheduler {
  #pCores: Core[] = [];

  get result() {
    this.#pCores = this.cores.filter((core) => core instanceof PCore);
    return super.result;
  }

  protected assignProcess(): void {
    this.cores.forEach((core) => {
      if (!core.hasProcess) {
        this.#sort(core);
        core.setProcess(this.readyQueue.shift(), this.time);
      }
    });
  }

  protected releaseProcess(): void {
    this.cores.forEach((core) => {
      if (core.process?.isEnd()) {
        this.endQueue.push(core.releaseProcess());
      } else if (this.#canPreempt(core)) {
        this.readyQueue.push(core.releaseProcess());
      }
    });
  }

  #sort(core: Core): void {
    this.readyQueue.sort((a: Process, b: Process) => {
      const aIsSmallerThanWps = a.remainProgress < core.wps;
      const bIsSmallerThanWps = b.remainProgress < core.wps;

      if (aIsSmallerThanWps && !bIsSmallerThanWps) return 1;
      if (!aIsSmallerThanWps && bIsSmallerThanWps) return -1;

      const aMatchesWps = a.remainProgress === core.wps;
      const bMatchesWps = b.remainProgress === core.wps;

      if (aMatchesWps && !bMatchesWps) return -1;
      if (!aMatchesWps && bMatchesWps) return 1;

      return a.compare(b);
    });
  }

  #canPreempt(core: Core): boolean {
    this.#sort(core);
    if (core.hasProcess && core.process && core.process.remainProgress < core.wps) {
      return true;
    }
    if (!(core instanceof PCore) && this.#pCores.some((pCore) => !pCore.hasProcess)) {
      return true;
    }
    return !!(this.readyQueue.length && this.readyQueue[0].remainProgress === core.wps);
  }
}
