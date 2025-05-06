import { Core, Tracer, Process, PCore } from '@/models';

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

  addProcess(...processes: Process[]): this {
    this.#createQueue.push(...processes);

    return this;
  }

  setCores(cores: Core[]): this {
    this.cores.length = 0;
    this.cores.push(...cores);

    return this;
  }

  #isDone(): boolean {
    return this.#createQueue.length === 0 && this.cores.every((core) => core.process === null);
  }

  #updateReadyQueue() {
    while (this.#createQueue.length > 0 && this.#createQueue[0].at <= this.time) {
      this.readyQueue.push(this.#createQueue.shift()!);
    }
  }

  #increaseTime(): void {
    this.cores.forEach((core) => {
      if (core.process) {
        core.process.setEnd(this.time);
        core.updatePowerUsage();
      }
    });
    this.time += 1;
  }

  #ready(): void {
    this.cores.sort((a: Core, b: Core) => {
      if (a instanceof PCore && b instanceof PCore) {
        return a.compare(b);
      }

      if (this instanceof PCore) {
        return -1;
      }

      return 1;
    });

    this.#createQueue.sort((a: Process, b: Process) => a.compare(b));
    this.#tracer.setCore(this.cores);
  }

  #start(): void {
    while (!this.#isDone()) {
      this.#updateReadyQueue();
      this.#tracer.updateGanttChart(this.cores);
      this.releaseProcess();
      this.#tracer.updateEndProcesses(this.endQueue);
      this.assignProcess();
      this.#tracer.updateReadyQueue(this.readyQueue);
      this.#tracer.updatePowerUsage(this.cores);

      this.#increaseTime();
    }
  }

  protected abstract assignProcess(): void;
  protected abstract releaseProcess(): void;
}
