import { Process } from '@/models';

export abstract class Core {
  process?: Process = undefined;

  hasProcess: boolean = false;

  powerUsage: number = 0;

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly wps: number,
    public readonly pc: number,
    public readonly ipc: number
  ) {}

  setProcess(process: Process | undefined, time: number) {
    if (!this.process && process) {
      this.powerUsage += this.ipc;
    }
    this.process = process;
    if (this.process) {
      this.process.start = time;
      this.hasProcess = true;
    }
  }

  releaseProcess() {
    this.hasProcess = false;
    return this.process!;
  }

  updatePowerUsage() {
    if (this.hasProcess) {
      this.powerUsage += this.pc;
    }
  }

  compare(other: Core) {
    return this.id - other.id;
  }
}
