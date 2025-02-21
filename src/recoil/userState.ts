import { atom } from "recoil";

interface UserI {
  id: string | null;
  email: string | null;
  nickname: string | null;
  provider: string | null;
  hasProvideAdditionalData: boolean;
}
export const userState = atom<UserI | null>({
  key: "userState",
  default: null,
});

export const loginModalState = atom<boolean>({
  key: "loginModalState",
  default: false,
});

export const additionalDataModalState = atom<boolean>({
  key: "additionalDataModaltSate",
  default: false,
});

export const isLoggedIn = atom<boolean>({
  key: "isLoggedIn",
  default: false,
});
