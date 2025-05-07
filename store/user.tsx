import { User } from '@/shared/types';
import { Workspace } from '@/shared/types/workspace';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  user: User | undefined;
  apiToken: string | undefined;
  workspace: Workspace | undefined;
  setUser: (newUser: User) => void;
  resetUser: () => void;
  setApiToken: (newApiToken: string) => void;
  resetApiToken: () => void;
  setWorkspace: (newWorkspace: Workspace) => void;
  resetWorkspace: () => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        apiToken: undefined,
        workspace: undefined,
        setUser: (newUser) => set({ user: newUser }),
        setApiToken: (newApiToken: string) => set({ apiToken: newApiToken }),
        resetUser: () => set({ user: undefined }),
        resetApiToken: () => set({ apiToken: undefined }),
        setWorkspace: (newWorkspace: Workspace) =>
          set({ workspace: newWorkspace }),
        resetWorkspace: () => set({ workspace: undefined }),
      }),
      {
        name: 'user-storage',
      },
    ),
  ),
);

export default useUserStore;
