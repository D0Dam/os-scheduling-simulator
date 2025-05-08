import { create } from 'zustand';

type SchedulerType = 'running' | 'finish' | 'paused';

interface SchedulerState {
  state: SchedulerType;
  interval: number;
}

interface SchedulerAction {
  running: VoidFunction;
  finish: VoidFunction;
  paused: VoidFunction;
  setInterval: (interval: number) => void;
}

const useSchedulerState = create<SchedulerState & SchedulerAction>((set) => ({
  state: 'finish',
  interval: 200,

  running: () => set({ state: 'running' }),
  finish: () => set({ state: 'finish' }),
  paused: () => set({ state: 'paused' }),
  setInterval: (interval: number) => set({ interval }),
}));

export default useSchedulerState;
