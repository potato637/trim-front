import { atom } from "recoil";

interface UserI {
  id: string | null;
  email: string | null;
  nickname: string | null;
  provider: string | null;
  hasProvideAdditionalData: boolean; // 이것도 필요없는거 같은데 kakao에서 닉네임 가져오는 거면
}

export const userState = atom<UserI | null>({
  key: "userState", // Unique ID for the atom
  default: null, // null = not logged in
});

export const loginModalState = atom({
  key: "loginModalState",
  default: false,
});

export const additionalDataModalState = atom({
  key: "additionalDataModaltSate",
  default: false,
});
