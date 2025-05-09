import { Core, Tracer, Process, PCore, ECore } from '@/models';

export abstract class Scheduler {
  tracer: Tracer;

  createQueue: Process[];

  cores: Core[];

  readyQueue: Process[];

  endQueue: Process[];

  time: number;

  constructor() {
    this.tracer = new Tracer();
    this.createQueue = [];
    this.cores = [];
    this.readyQueue = [];
    this.endQueue = [];
    this.time = 0;
  }

  get result() {
    this.ready();
    this.start();
    return this.tracer;
  }

  addProcess(processes: { name: string; at: number; bt: number; color: string }[]) {
    this.createQueue.push(...processes.map((process) => new Process(process)));

    return this;
  }

  setCores(cores: { id: number; name: string; type: 'P' | 'E' }[]) {
    this.cores.length = 0;
    this.cores.push(
      ...cores.map((core) => (core.type === 'P' ? new PCore(core) : new ECore(core)))
    );

    return this;
  }

  isDone() {
    return this.createQueue.length === 0 && this.cores.every((core) => !core.process);
  }

  updateReadyQueue() {
    while (this.createQueue.length > 0 && this.createQueue[0].at <= this.time) {
      this.readyQueue.push(this.createQueue.shift()!);
    }
  }

  increaseTime() {
    this.readyQueue.forEach((process) => {
      process.updateWT();
      process.updateTT();
    });
    this.cores.forEach((core) => {
      if (core.process && core.hasProcess) {
        core.process.updateTT();
        core.process.updateProgress(core.wps);
        core.updatePowerUsage();
      }
    });
    this.time += 1;
  }

  ready() {
    this.cores.sort((a: Core, b: Core) => {
      if (a.constructor === b.constructor) {
        return a.compare(b);
      }

      return a instanceof PCore ? -1 : 1;
    });

    this.createQueue.sort((a: Process, b: Process) => a.compare(b));
    this.tracer.setCore(this.cores);
  }

  start() {
    while (!this.isDone()) {
      this.updateReadyQueue();
      this.releaseProcess();
      this.tracer.updateGanttChart(this.cores);
      this.tracer.updateEndProcesses(this.endQueue);
      this.assignProcess();
      this.tracer.updateReadyQueue(this.readyQueue);
      this.tracer.updatePowerUsage(this.cores);
      this.tracer.updateEfficiency(this.cores, this.time);

      this.increaseTime();
    }
  }

  protected abstract assignProcess(): void;
  protected abstract releaseProcess(): void;
}
