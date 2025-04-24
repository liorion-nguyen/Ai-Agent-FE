import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface SettingState {
  counter: number;
  setCounter: (newCounter: number) => void;
  resetCounter: () => void;
}

const useSettingStore = create<SettingState>()(
  devtools(
    persist(
      (set) => ({
        counter: 0,
        setCounter: (newCounter) => set({ counter: newCounter }),
        resetCounter: () => set({ counter: 0 }),
      }),
      {
        name: 'counter-storage',
      },
    ),
  ),
);

export default useSettingStore;
