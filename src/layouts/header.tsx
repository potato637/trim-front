import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  additionalDataModalState,
  loginModalState,
  userState,
  isLoggedIn,
} from "../recoil/userState";
import LoginModal from "../components/loginmodal";
import AdditionalDataModal from "../components/additionaldatamodal";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const HeaderWrapper = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-bottom: 0.5px solid var(--color-border);
  background-color: var(--color-white);
  overflow: hidden;
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoWrapper = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
`;
const Logo = styled.div`
  font-size: var(--font-size-logo);
  font-weight: bold;
  color: var(--color-purple);
  cursor: pointer;
`;
const Tabs = styled.div`
  width: 350px;
  display: flex;
  align-items: center;
  gap: 30px;
`;
const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 25px;
`;
const Span = styled.span<{ isActive: boolean }>`
  font-size: var(--font-size-small);
  font-weight: 400;
  color: ${({ isActive }) => (isActive ? "#5c37ff" : "#000")};
`;
const InputContainer = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  width: 350px;
  font-size: var(--font-size-small);
  padding: 7px 0 7px 15px;
  border-radius: 16px;
  border: 0.5px solid #757575;
  margin-left: 10px;

  &:focus {
    outline: none;
    box-shadow: none;
    border: 0.75px solid #5c37ff;
  }
`;
const NavBtnContainer = styled.div`
  width: 300px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;

  button {
    outline: none;
    border: none;
    background-color: var(--color-white);
    text-decoration: none;
    font-size: var(--font-size-small);
    font-weight: 600;
    text-overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: hidden;
    cursor: pointer;
  }
`;

export default function Header() {
  const user = useRecoilValue(userState);
  const isLoginModalOpen = useRecoilValue(loginModalState);
  const isAdditionalDataModalOpen = useRecoilValue(additionalDataModalState);
  const setLoginModalOpen = useSetRecoilState(loginModalState);
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const pathname = {
    "/question": "질문게시판",
    "/share": "지식공유",
    "/community": "자유게시판",
    "/survey": "설문",
  };

  function onClickHandler(tab: string) {
    navigate(`/${tab}`);
  }

  function isTabActive(path: string) {
    return location.pathname.startsWith(path);
  }

  const handleLogIn = () => {
    setLoggedIn((prev) => !prev);
  };

  useEffect(() => {
    const activePath = Object.keys(pathname).find((path) =>
      location.pathname.startsWith(path)
    );
    setActiveTab(activePath || null);
  }, [location.pathname]);

  return (
    <HeaderWrapper>
      <Container>
        <LogoWrapper>
          <Logo onClick={() => navigate("/")}>TR!M</Logo>
        </LogoWrapper>
        <Tabs>
          <Tab onClick={() => onClickHandler("question")}>
            <Span isActive={isTabActive("/question")}>질문</Span>
          </Tab>
          <Tab onClick={() => onClickHandler("share")}>
            <Span isActive={isTabActive("/share")}>지식공유</Span>
          </Tab>
          <Tab onClick={() => onClickHandler("community")}>
            <Span isActive={isTabActive("/community")}>커뮤니티</Span>
          </Tab>
          <Tab onClick={() => onClickHandler("survey")}>
            <Span isActive={isTabActive("/survey")}>설문</Span>
          </Tab>
        </Tabs>
        <InputContainer>
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Input
              placeholder={`${
                pathname[activeTab as keyof typeof pathname] || "Trim"
              }에서 검색하기`}
            ></Input>
          </form>
        </InputContainer>
        <NavBtnContainer>
          <button onClick={() => onClickHandler("mypage")}>마이페이지</button>
          <button onClick={handleLogIn}>
            {loggedIn ? "로그인" : "로그아웃"}
          </button>
        </NavBtnContainer>
        {isLoginModalOpen && <LoginModal />}
        {isAdditionalDataModalOpen && <AdditionalDataModal />}
      </Container>
    </HeaderWrapper>
  );
}
