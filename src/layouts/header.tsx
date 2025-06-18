import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth_context";
import useLogout from "../hooks/useLogout";
import useLogin from "../hooks/useLogin";

const HeaderWrapper = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
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
  width: 300px;
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
  color: ${({ isActive }) =>
    isActive ? "var(--color-comment-input-hover)" : "var(--color-black)"};
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
  border: 0.5px solid var(--color-header-input);
  margin-left: 10px;

  &:focus {
    outline: none;
    box-shadow: none;
    border: 0.75px solid var(--color-comment-input-hover);
  }
`;
const NavBtnContainer = styled.div`
  width: 200px;
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
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const logout = useLogout();
  const login = useLogin();

  const pathname = {
    "/question": "질문게시판",
    "/knowledge": "지식공유",
    "/community": "커뮤니티",
  };

  function onClickHandler(tab: string) {
    navigate(`/${tab}`);
  }

  function handleMypageClick() {
    login("/mypage");
  }
  function isTabActive(path: string) {
    return location.pathname.startsWith(path);
  }

  const handleSignIn = () => {
    sessionStorage.setItem("prevUrl", location.pathname);
    navigate("/signin");
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
          <Tab onClick={() => onClickHandler("knowledge")}>
            <Span isActive={isTabActive("/knowledge")}>지식공유</Span>
          </Tab>
          <Tab onClick={() => onClickHandler("community")}>
            <Span isActive={isTabActive("/community")}>커뮤니티</Span>
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
          <button onClick={handleMypageClick}>마이페이지</button>
          {isLoggedIn ? (
            <button onClick={logout}>로그아웃</button>
          ) : (
            <button onClick={handleSignIn}>로그인</button>
          )}
        </NavBtnContainer>
      </Container>
    </HeaderWrapper>
  );
}
