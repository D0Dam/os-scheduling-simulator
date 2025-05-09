import { Core, PCore } from '@/models';
import { Scheduler } from '@/scheduler';

export class CustomAlgorithm extends Scheduler {
  pCores: Core[] = [];

  get result() {
    this.pCores = this.cores.filter((core) => core instanceof PCore);
    return super.result;
  }

  protected assignProcess() {
    this.cores.forEach((core) => {
      if (!core.hasProcess) {
        this.sort(core);
        core.setProcess(this.readyQueue.shift(), this.time);
      }
    });
  }

  protected releaseProcess() {
    this.cores.forEach((core) => {
      if (core.process?.isEnd()) {
        this.endQueue.push(core.releaseProcess());
      } else if (core.hasProcess && this.canPreempt(core)) {
        this.readyQueue.push(core.releaseProcess());
      }
    });
  }

  sort(core: Core) {
    this.readyQueue.sort((a, b) => {
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

  canPreempt(core: Core) {
    this.sort(core);
    if (core.process && core.process.remainProgress < core.wps) {
      return true;
    }
    if (!(core instanceof PCore) && this.pCores.some((pCore) => !pCore.hasProcess)) {
      return true;
    }
    return !!(this.readyQueue.length && this.readyQueue[0].remainProgress === core.wps);
  }
}
