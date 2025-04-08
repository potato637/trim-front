import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Url, UrlObject } from "url";
import { useContext } from "react";

const Container = styled.div`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  & > div {
    cursor: pointer;
    position: relative;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    width: 300px;
    height: 50px;
    & > span {
      font-size: 1rem;
    }
  }
`;
const GoogleContainer = styled.div`
  background-color: rgb(64 129 238);
  color: #fff;
`;
const Google = styled(FcGoogle)`
  position: absolute;
  left: 1rem;
  background-color: #fff;
  border-radius: 50%;
  padding: 5px;
`;
const NaverContainer = styled.div`
  background-color: rgb(6 230 99);
  color: #fff;
`;
const Naver = styled(SiNaver)`
  position: absolute;
  left: 1rem;
  color: #fff;
  padding-left: 5px;
`;
const KakaoContainer = styled.div`
  background-color: #fee500;
  color: #000;
`;
const Kakao = styled(RiKakaoTalkFill)`
  position: absolute;
  left: 1rem;
  color: #000;
  padding-left: 5px;
`;

export default function Signin() {
  const handleGoogleClick = () => {
    window.location.href = process.env.REACT_APP_GOOGLE_AUTH_URL as string;
  };
  const handleNaverClick = () => {};
  const handleKakaoClick = () => {
    window.location.href = process.env.REACT_APP_KAKAO_AUTH_URL as string;
  };

  return (
    <Container>
      <GoogleContainer onClick={handleGoogleClick}>
        <Google />
        <span>Google로 계속하기</span>
      </GoogleContainer>
      <NaverContainer onClick={handleNaverClick}>
        <Naver />
        <span>네이버로 계속하기</span>
      </NaverContainer>
      <KakaoContainer onClick={handleKakaoClick}>
        <Kakao />
        <span>카카오로 계속하기</span>
      </KakaoContainer>
    </Container>
  );
}
