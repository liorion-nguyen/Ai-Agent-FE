// store/chatbot.ts
import { Member } from '@/shared/types/member';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface MemberState {
  members: Member[];
  member: Member | undefined;
  setMembers: (value: Member[]) => void;
  resetMembers: () => void;
  setMember: (value: Member) => void;
  resetMember: () => void;
}

const useMemberStore = create<MemberState>()(
  devtools(
    persist(
      (set) => ({
        members: [],
        member: undefined,
        setMembers: (value: Member[]) => set({ members: value }),
        resetMembers: () => set({ members: [] }),
        setMember: (value: Member) => set({ member: value }),
        resetMember: () => set({ member: undefined }),
      }),
      {
        name: 'member-storage',
      },
    ),
  ),
);

export default useMemberStore;
