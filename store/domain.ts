import { Domain } from '@/shared/types/domain';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface DomainState {
  domains: Domain[];
  domain: Domain | undefined;
  setDomains: (value: Domain[]) => void;
  resetDomains: () => void;
  setDomain: (value: Domain) => void;
  resetDomain: () => void;
}

const useDomainStore = create<DomainState>()(
  devtools(
    persist(
      (set) => ({
        domains: [],
        domain: undefined,
        setDomains: (value: Domain[]) => set({ domains: value }),
        resetDomains: () => set({ domains: [] }),
        setDomain: (value: Domain) => set({ domain: value }),
        resetDomain: () => set({ domain: undefined }),
      }),
      {
        name: 'domain-storage',
      },
    ),
  ),
);

export default useDomainStore;
