import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getInfo, signIn, signUp } from "../apis/authAPI";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/auth_context";
import Cookies from "js-cookie";

type ProviderI = "google" | "naver" | "kakao";
interface InfoI {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    oauthId: string;
    email: string;
    oauthProvider: ProviderI;
    userExist: boolean;
  };
}
interface TokenI {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    grantType: string;
    accessToken: string;
    refreshToken: string;
  };
}
export default function Redirection() {
  const prevUrl = sessionStorage.getItem("prevUrl") || "/";
  const { provider } = useParams<{ provider: ProviderI }>();
  const location = useLocation();
  const navigate = useNavigate();
  const code = new URLSearchParams(location.search).get("code");
  const { setAuth } = useAuth();

  const { data: info, isLoading } = useQuery<InfoI>({
    queryKey: ["user_info", code, provider],
    queryFn: () => getInfo({ code, provider }),
    enabled: !!code && !!provider,
  });

  useEffect(() => {
    if (!info) return;

    const process = async () => {
      const { email, userExist } = info.result;
      try {
        const token: TokenI = userExist
          ? await signIn({ email, provider })
          : await signUp({ email, provider });

        Cookies.set("accessToken", token.result.accessToken, {
          path: "/",
          secure: true,
          sameSite: "Strict",
          expires: 1800,
        });
        setAuth({ isLoggedIn: true });
        const to = prevUrl === "/signin" ? "/" : prevUrl;
        navigate(to);
        sessionStorage.removeItem("prevUrl");
      } catch (error) {
        console.error("쿠키 세팅 에러 발생", error);
      }
    };

    process();
  }, [info, provider, navigate]);

  if (isLoading) return null;

  return null;
}
