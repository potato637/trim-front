import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth_context";

export default function useLogin(path: string) {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return () => {
      navigate(path);
    };
  }

  return () => {
    sessionStorage.setItem("prevUrl", location.pathname);
    navigate("/signin");
  };
}
