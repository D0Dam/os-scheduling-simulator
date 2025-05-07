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

export class Tracer {
  readyQueue: string[][];

  ganttCharts: { [coreId: number]: GanttChartItem[]; maxEnd: number };

  powerUsage: { [coreId: number]: PowerUsage[] };

  endProcesses: Process[][];

  constructor() {
    this.readyQueue = [];
    this.ganttCharts = { maxEnd: 0 };
    this.powerUsage = {};
    this.endProcesses = [];
  }

  setCore(cores: Core[]): void {
    cores.forEach((core) => {
      this.ganttCharts[core.id] = [];
      this.powerUsage[core.id] = [];
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

  updatePowerUsage(cores: Core[]): void {
    const totalPowerUsage: number = cores.reduce((sum, core) => sum + core.powerUsage, 0);

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
    this.endProcesses.push([...processes]);
  }
}
