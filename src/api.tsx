import { useRecoilValue } from "recoil";
import { userState } from "./recoil/userState";

export function IsLoggedIn() {
  const { isLoggedIn } = useRecoilValue(userState);
  return isLoggedIn;
}
