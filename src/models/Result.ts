import { Core, Process } from '@/models';

/**
 * 추적(Trace) 해야할 정보들
 * * readyQueue
 * * 각 코어별 ganttChart
 * * 각 코어별 powerUsage
 * * endProcesses
 */

interface GanttChartItem {
  name: string;
  start: number;
  end: number;
}

interface PowerUsage {
  usage: number;
  percentage: number;
}

interface Efficiencies {
  [coreId: number]: number[];
  average: number[];
}

export class Tracer {
  readyQueue: string[][];

  ganttCharts: { [coreId: number]: GanttChartItem[]; maxEnd: number };

  powerUsage: { [coreId: number]: PowerUsage[]; total: number[] };

  endProcesses: Process[][];

  nttAverage: number[];

  readonly #efficiencies: { [coreId: number]: number[] };

  constructor() {
    this.readyQueue = [];
    this.ganttCharts = { maxEnd: 0 };
    this.powerUsage = { total: [] };
    this.endProcesses = [];
    this.nttAverage = [];
    this.#efficiencies = {};
  }

  setCore(cores: Core[]): void {
    cores.forEach((core) => {
      this.ganttCharts[core.id] = [];
      this.powerUsage[core.id] = [];
      this.#efficiencies[core.id] = [];
    });
  }

  updateGanttChart(cores: Core[]): void {
    cores.forEach((core) => {
      if (core.process && !core.hasProcess) {
        this.ganttCharts[core.id].push({
          name: core.process.name,
          start: core.process.start,
          end: core.process.end,
        });
        this.ganttCharts.maxEnd = Math.max(this.ganttCharts.maxEnd, core.process.end);
      }
    });
  }

  get efficiencies(): Efficiencies {
    const result: Efficiencies = { average: [] };
    const coreIds = Object.keys(this.#efficiencies).map(Number);
    coreIds.forEach((coreId) => {
      result[coreId] = this.#efficiencies[coreId].map((value, time) => (value / (time + 1)) * 100);
    });

    const length = this.#efficiencies[coreIds[0]].length - 1;
    result.average = Array.from(
      { length },
      (_, time) => coreIds.reduce((sum, coreId) => sum + result[coreId][time], 0) / coreIds.length
    );

    return result;
  }

  updateEfficiency(cores: Core[], time: number): void {
    cores.forEach((core) => {
      this.#efficiencies[core.id].push(
        (this.#efficiencies[core.id][time - 1] ?? 0) + Number(core.hasProcess)
      );
    });
  }

  updatePowerUsage(cores: Core[]): void {
    const totalPowerUsage: number = cores.reduce((sum, core) => sum + core.powerUsage, 0);
    this.powerUsage.total.push(totalPowerUsage);

    cores.forEach((core) => {
      this.powerUsage[core.id].push({
        usage: core.powerUsage,
        percentage: (core.powerUsage / totalPowerUsage) * 100,
      });
    });
  }

  updateReadyQueue(readyQueue: Process[]): void {
    this.readyQueue.push(readyQueue.map((process) => process.name));
  }

  updateEndProcesses(processes: Process[]): void {
    const nttTotal = processes.reduce((sum, process) => sum + process.ntt, 0);
    this.nttAverage.push(processes.length ? nttTotal / processes.length : 0);
    this.endProcesses.push([...processes]);
  }
}
