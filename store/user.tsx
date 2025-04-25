import { User } from '@/shared/types';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface UserState {
  user: User | undefined;
  setUser: (newUser: User) => void;
  resetUser: () => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        setUser: (newUser) => set({ user: newUser }),
        resetUser: () => set({ user: undefined }),
      }),
      {
        name: 'user-storage',
      },
    ),
  ),
);

export default useUserStore;
