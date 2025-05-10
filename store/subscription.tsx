// store/Subscription.ts
import {
  RemainingLimits,
  Subscription,
  UserSubscription,
} from '@/shared/types/subscription';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface SubscriptionState {
  subscriptions: Subscription[];
  subscription: UserSubscription | undefined;
  remainingLimits: RemainingLimits | undefined;
  hydrated: boolean;
  setSubscriptions: (newSubscriptions: Subscription[]) => void;
  setSubscription: (newSubscription: UserSubscription) => void;
  resetSubscription: () => void;
  resetSubscriptions: () => void;
  setHydrated: (value: boolean) => void;
  setRemainingLimits: (newRemainingLimits: RemainingLimits) => void;
}

const useSubscriptionStore = create<SubscriptionState>()(
  devtools(
    persist(
      (set) => ({
        subscriptions: [],
        subscription: undefined,
        remainingLimits: undefined,
        hydrated: false,
        setSubscriptions: (newSubscriptions) =>
          set({ subscriptions: newSubscriptions }),
        setSubscription: (newSubscription) =>
          set({ subscription: newSubscription }),
        resetSubscription: () => set({ subscription: undefined }),
        resetSubscriptions: () => set({ subscriptions: [] }),
        setHydrated: (value) => set({ hydrated: value }),
        setRemainingLimits: (newRemainingLimits) =>
          set({ remainingLimits: newRemainingLimits }),
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
