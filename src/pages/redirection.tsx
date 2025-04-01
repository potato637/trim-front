import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getInfo, signIn, signUp } from "../apis/authAPI";
import { useQuery } from "@tanstack/react-query";

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
export default function Redirection() {
  const prevUrl = sessionStorage.getItem("prevUrl") || "/";
  const { provider } = useParams<{ provider: ProviderI }>();
  const location = useLocation();
  const navigate = useNavigate();
  const code = new URLSearchParams(location.search).get("code");

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
        userExist
          ? await signIn({ email, provider })
          : await signUp({ email, provider });
        navigate(prevUrl);
        sessionStorage.removeItem("prevUrl");
      } catch (error) {
        console.error(error);
      }
    };

    process();
  }, [info, provider, navigate]);

  if (isLoading) return null;

  return null;
}
