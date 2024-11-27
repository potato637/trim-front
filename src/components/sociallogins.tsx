import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  additionalDataModalState,
  loginModalState,
  userState,
} from "../recoil/userState";
import { useEffect } from "react";
import Cookies from "js-cookie";

interface SocialLoginButtonI {
  bgcolor: string;
  bgcolorhover: string;
}

// /  kakao
const SocialLoginButton = styled.button<SocialLoginButtonI>`
  background-color: ${(props) => props.bgcolor};
  border: none;
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.bgcolorhover};
  }
`;

export function KakaoLoginButton() {
  const kakaoApiKey = process.env.REACT_APP_KAKAO_API_KEY;
  const setUserState = useSetRecoilState(userState);
  const setAdditionalDataModalOpen = useSetRecoilState(
    additionalDataModalState
  );
  const setLoginModalOpen = useSetRecoilState(loginModalState);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoApiKey as string);
    }
  }, []);

  const handleKakaoLogin = (provider: string) => {
    window.Kakao.Auth.login({
      success: async (authObj: any) => {
        try {
          const { id, kakao_account } = await window.Kakao.API.request({
            url: "/v2/user/me",
          });

          const userData = {
            id,
            email: kakao_account?.email,
            nickname: kakao_account?.profile?.nickname,
          };

          setUserState({
            ...userData,
            provider,
            hasProvideAdditionalData: false,
          });
          Cookies.set("authToken", authObj.access_token, {
            secure: true,
            sameSite: "strict",
          });
          setLoginModalOpen(false);
          setAdditionalDataModalOpen(true);
        } catch (error) {
          console.error("Failed to fetch user info: ", error);
        }
      },
      fail: (error: any) => {
        console.error("kakao login failed: ", error);
      },
    });
  };

  return (
    <SocialLoginButton
      bgcolor="#fee500"
      bgcolorhover="#ffd700"
      onClick={() => handleKakaoLogin("kakao")}
    >
      Kakao로 로그인
    </SocialLoginButton>
  );
}
