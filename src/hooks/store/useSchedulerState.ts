import { create } from 'zustand';

type SchedulerType = 'running' | 'finish' | 'paused';

interface SchedulerState {
  state: SchedulerType;
}

interface SchedulerAction {
  running: VoidFunction;
  finish: VoidFunction;
  paused: VoidFunction;
}

const useSchedulerState = create<SchedulerState & SchedulerAction>((set) => ({
  state: 'finish',

  running: () => set({ state: 'running' }),
  finish: () => set({ state: 'finish' }),
  paused: () => set({ state: 'paused' }),
}));

export default useSchedulerState;
