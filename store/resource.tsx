import { Resource } from '@/shared/types/resource';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ResourceState {
  resources: Resource[];
  resource: Resource | undefined;
  hydrated: boolean;
  setResources: (newResources: Resource[]) => void;
  resetResources: () => void;
  setHydrated: (value: boolean) => void;
  setResource: (newResource: Resource) => void;
  resetResource: () => void;
}

const useResourceStore = create<ResourceState>()(
  devtools(
    persist(
      (set) => ({
        resources: [],
        resource: undefined,
        hydrated: false,
        setResources: (newResources) => set({ resources: newResources }),
        resetResources: () => set({ resources: [] }),
        setHydrated: (value) => set({ hydrated: value }),
        setResource: (newResource) => set({ resource: newResource }),
        resetResource: () => set({ resource: undefined }),
      }),
      {
        name: 'resource-storage',
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      },
    ),
  ),
);

export default useResourceStore;
