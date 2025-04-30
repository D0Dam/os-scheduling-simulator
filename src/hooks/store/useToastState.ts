import { create } from 'zustand';

type ToastType = 'default' | 'success' | 'error' | 'info' | 'warning';

interface ToastState {
  list: { text: string; isOpen: boolean; type?: ToastType; key: number }[];
  key: number;
}

interface ToastAction {
  open: (text: string, type?: ToastType) => void;
  close: (key: number) => void;
  closeFirst: VoidFunction;
}

const useToastState = create<ToastState & ToastAction>((set) => ({
  list: [],
  key: 0,

  open: (text: string, type: ToastType = 'default') => {
    set((state) => ({
      list: [...state.list, { text, type, isOpen: true, key: state.key }],
      key: state.key + 1,
    }));
  },
  close: (key: number) =>
    set((state) => ({
      list: state.list.filter((item) => item.key !== key),
      key: state.list.length > 1 ? state.key : 0,
    })),
  closeFirst: () =>
    set((state) => ({
      list: state.list.slice(1),
      key: state.list.length > 1 ? state.key : 0,
    })),
}));

export default useToastState;
