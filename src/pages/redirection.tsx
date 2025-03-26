import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getInfo, signIn, signUp } from "../apis/authAPI";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  const { provider } = useParams<{ provider: ProviderI }>();
  const location = useLocation();
  const navigate = useNavigate();
  const code = new URLSearchParams(location.search).get("code");

  const { data: info, isLoading } = useQuery<InfoI>({
    queryKey: ["user_info", code, provider],
    queryFn: () => getInfo({ code, provider }),
    enabled: !!code && !!provider,
  });

  const signUpMutation = useMutation({
    mutationFn: () => signUp({ email: info?.result.email, provider }),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("sign up error: ", error);
    },
  });

  const { data: token, refetch } = useQuery({
    queryKey: ["sign in"],
    queryFn: () => signIn({ email: info?.result.email, provider }),
    enabled: false,
  });

  useEffect(() => {
    if (isLoading) return;

    if (info?.result.userExist) {
      refetch();
    } else {
      signUpMutation.mutate();
    }
    console.log(token);
  }, []);

  return null;
}
