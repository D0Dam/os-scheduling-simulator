import { Core, Process } from '@/models';

export interface GanttChartItem {
  name: string;
  start: number;
  end: number;
}

export class Result {
  readyQueue: Process[][];

  ganttChart: { [coreId: number]: GanttChartItem[] };

  powerUsage: { [coreId: number]: number[] };

  constructor() {
    this.readyQueue = [];
    this.ganttChart = {};
    this.powerUsage = {};
  }

  setCore(cores: Core[]): void {
    cores.forEach((core) => {
      this.ganttChart[core.id] = [];
      this.powerUsage[core.id] = [];
    });
  }

  updateGanttChart(time: number, cores: Core[]): void {
    cores.forEach((core) => {
      if (core.process !== undefined) {
        this.ganttChart[core.id].push({
          name: core.process.name,
          start: time - core.occupancyTime,
          end: time,
        });
      }
    });
  }

  updatePowerUsage(cores: Core[]): void {
    cores.forEach((core) => {
      this.powerUsage[core.id].push(core.powerUsage);
    });
  }

  updateReadyQueue(readyQueue: Process[]): void {
    this.readyQueue.push([...readyQueue]);
  }
}
