import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface SettingState {
  step: number;
  email: string;
  otp: string;
  setStep: (newStep: number) => void;
  setEmail: (newEmail: string) => void;
  setOtp: (newOtp: string) => void;
  resetStep: () => void;
}

const useForgotPasswordStore = create<SettingState>()(
  devtools(
    persist(
      (set) => ({
        step: 1,
        email: '',
        otp: '',
        setStep: (newStep) => set({ step: newStep }),
        setEmail: (newEmail) => set({ email: newEmail }),
        setOtp: (newOtp) => set({ otp: newOtp }),
        resetStep: () => set({ step: 1 }),
      }),
      {
        name: 'forgot-password-storage',
      },
    ),
  ),
);

export default useForgotPasswordStore;
