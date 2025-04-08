import Cookies from "js-cookie";
import { useAuth } from "../context/auth_context";

export default function useLogout() {
  const { setAuth } = useAuth();

  return () => {
    Cookies.remove("accessToken");
    setAuth({ isLoggedIn: false });
  };
}
