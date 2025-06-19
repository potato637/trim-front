import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth_context";

export default function useLogin() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (path?: string) => {
    if (isLoggedIn) {
      navigate(path || "/");
    } else {
      sessionStorage.setItem("prevUrl", location.pathname);
      navigate("/signin");
    }
  };
}
