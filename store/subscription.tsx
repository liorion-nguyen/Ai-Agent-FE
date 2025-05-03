// store/Subscription.ts
import { Subscription } from '@/shared/types/subscription';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface SubscriptionState {
  subscriptions: Subscription[];
  subscription: Subscription | undefined;
  hydrated: boolean;
  setSubscriptions: (newSubscriptions: Subscription[]) => void;
  setSubscription: (newSubscription: Subscription) => void;
  resetSubscription: () => void;
  resetSubscriptions: () => void;
  setHydrated: (value: boolean) => void;
}

const useSubscriptionStore = create<SubscriptionState>()(
  devtools(
    persist(
      (set) => ({
        subscriptions: [],
        subscription: undefined,
        hydrated: false,
        setSubscriptions: (newSubscriptions) =>
          set({ subscriptions: newSubscriptions }),
        setSubscription: (newSubscription) =>
          set({ subscription: newSubscription }),
        resetSubscription: () => set({ subscription: undefined }),
        resetSubscriptions: () => set({ subscriptions: [] }),
        setHydrated: (value) => set({ hydrated: value }),
      }),
      {
        name: 'subscription-storage',
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      },
    ),
  ),
);

export default useSubscriptionStore;
