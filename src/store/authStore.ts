import { create } from "zustand";
import Cookie from "js-cookie";
// import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { AuthState } from "../utils/types";

export const useAuthStore = create<AuthState>((set) => ({
  token: Cookie.get("token") || null,
  setToken: (token: string) => {
    Cookie.set("token", token);
    set({ token });
  },
  clearToken: () => {
    Cookie.remove("token");
    set({ token: null });
  },

  accessKey: Cookie.get("accessKey") || null,
  setAccessKey: (accessKey: string) => {
    Cookie.set("accessKey", accessKey);
    set({ accessKey });
  },
  clearAccessKey: () => {
    Cookie.remove("accessKey");
    set({ accessKey: null });
  },

  tempToken: Cookie.get("tempToken") || null,
  setTempToken: (tempToken: string) => {
    Cookie.set("tempToken", tempToken);
    set({ tempToken });
  },
  clearTempToken: () => {
    Cookie.remove("tempToken");
    set({ tempToken: null });
  },

  userProfile: null,
  setUserProfile: (profile: any) => set({ userProfile: profile }),
}));
