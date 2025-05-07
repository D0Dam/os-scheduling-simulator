import { Core, Tracer, Process, PCore, ECore } from '@/models';

interface IProcess {
  name: string;
  at: number;
  bt: number;
  color: string;
}

interface ICore {
  id: number;
  name: string;
  type: 'P' | 'E';
}

/**
 * 스케줄링 알고리즘의 핵심
 * * 레디큐에서 꺼내는 규칙
 * * 레디큐에 넣는 규칙
 *
 * 1. 레디큐 업데이트
 * 2. tracer - gantt chart 캡처
 * 3. 코어 프로세서 반납
 * 4. tracer - end process 캡처
 * 5. 코어에 프로세서 할당
 * 6. tracer - 레디큐 캡처
 * 7. tracer - power usage 캡처
 * 8. 1초 증가
 */

export abstract class Scheduler {
  readonly #tracer: Tracer;

  readonly #createQueue: Process[];

  protected readonly cores: Core[];

  readonly readyQueue: Process[];

  readonly endQueue: Process[];

  protected time: number;

  constructor() {
    this.#tracer = new Tracer();
    this.#createQueue = [];
    this.cores = [];
    this.readyQueue = [];
    this.endQueue = [];
    this.time = 0;
  }

  get result(): Tracer {
    this.#ready();
    this.#start();
    return this.#tracer;
  }

  addProcess(processes: IProcess[]): this {
    this.#createQueue.push(...processes.map((process) => new Process(process)));

    return this;
  }

  setCores(cores: ICore[]): this {
    this.cores.length = 0;
    this.cores.push(
      ...cores.map((core) => (core.type === 'P' ? new PCore(core) : new ECore(core)))
    );

    return this;
  }

  #isDone(): boolean {
    return this.#createQueue.length === 0 && this.cores.every((core) => !core.process);
  }

  #updateReadyQueue() {
    while (this.#createQueue.length > 0 && this.#createQueue[0].at <= this.time) {
      this.readyQueue.push(this.#createQueue.shift()!);
    }
  }

  #increaseTime(): void {
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

  #ready(): void {
    this.cores.sort((a: Core, b: Core) => {
      if (a.constructor === b.constructor) {
        return a.compare(b);
      }

      return a instanceof PCore ? -1 : 1;
    });

    this.#createQueue.sort((a: Process, b: Process) => a.compare(b));
    this.#tracer.setCore(this.cores);
  }

  #start(): void {
    while (!this.#isDone()) {
      this.#updateReadyQueue();
      this.releaseProcess();
      this.#tracer.updateGanttChart(this.cores);
      this.#tracer.updateEndProcesses(this.endQueue);
      this.assignProcess();
      this.#tracer.updateReadyQueue(this.readyQueue);
      this.#tracer.updatePowerUsage(this.cores);
      this.#tracer.updateEfficiency(this.cores, this.time);

      this.#increaseTime();
    }
  }

  protected abstract assignProcess(): void;
  protected abstract releaseProcess(): void;
}
