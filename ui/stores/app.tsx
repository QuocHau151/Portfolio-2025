import { AccountType } from "@/constants/type";
import { removeTokensFromLocalStorage } from "@/libs/utils";
import { RegisterBodyStepBeforeType } from "@/schemas/auth.schema";
import { RoleType } from "@/types/jwt.types";
import { Socket } from "socket.io-client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AppStoreType = {
  isAuth: boolean;
  role: RoleType | undefined;
  setRole: (role?: RoleType | undefined) => void;
  socket: Socket | undefined;
  setSocket: (socket?: Socket | undefined) => void;
  disconnectSocket: () => void;
  account: AccountType | undefined;
  setAccount: (account?: AccountType | undefined) => void;
  registerForm: RegisterBodyStepBeforeType | undefined;
  setRegisterForm: (
    registerForm?: RegisterBodyStepBeforeType | undefined,
  ) => void;
  forgotPasswordForm: { email: string } | undefined;
  setForgotPasswordForm: (forgotPasswordForm?: { email: string }) => void;
  verifyCode: { code: string } | undefined;
  setCode: (verifyCode?: { code: string }) => void;
};

export const useAppStore = create<AppStoreType>()(
  persist(
    (set) => ({
      isAuth: false,
      role: undefined,
      setRole: (role?: RoleType) => {
        set({ role, isAuth: Boolean(role) });
        if (!role) {
          removeTokensFromLocalStorage();
        }
      },
      account: undefined,
      setAccount: (account?: AccountType) => {
        set({ account });
      },
      socket: undefined,
      setSocket: (socket?: Socket) => {
        set({ socket });
      },
      disconnectSocket: () =>
        set((state) => {
          state.socket?.disconnect();
          return { socket: undefined };
        }),
      registerForm: undefined,
      setRegisterForm: (registerForm?: RegisterBodyStepBeforeType) => {
        set({ registerForm });
      },
      forgotPasswordForm: undefined,
      setForgotPasswordForm: (forgotPasswordForm?: { email: string }) => {
        set({ forgotPasswordForm });
      },
      verifyCode: undefined,
      setCode: (verifyCode?: { code: string }) => {
        set({ verifyCode });
      },
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
      // Chọn các state cần persist
      partialize: (state) => ({
        isAuth: state.isAuth,
        role: state.role,
        account: state.account,
        registerForm: state.registerForm,
        forgotPasswordForm: state.forgotPasswordForm,
        verifyCode: state.verifyCode,
      }),
    },
  ),
);
