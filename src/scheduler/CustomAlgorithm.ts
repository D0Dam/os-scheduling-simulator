import { Scheduler } from '@/scheduler';

export class CustomAlgorithm extends Scheduler {
  protected assignProcess(): void {}

  protected releaseProcess(): void {}
}
