import { Core, Process } from '.';

export interface IResult {
  readonly time: number;
  readonly readyQueue: Process[];
  readonly cores: Core[];
}

export class Result {}
