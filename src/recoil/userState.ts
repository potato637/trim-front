import { atom } from "recoil";

export const userState = atom({
  key: "userState", // Unique ID for the atom
  default: {
    isLoggedIn: true,
    user: {
      name: null,
      email: null,
    },
  },
});
