import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  additionalDataModalState,
  loginModalState,
  userState,
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
  padding: 5px 0;
  max-height: 30px;
  border-bottom: 0.5px solid #ddd;
  background-color: white;
`;
const Logotabwrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const Logo = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #5c37ff;
  cursor: pointer;
`;

// 나중에 화면 사이즈에 따라 일부 요소 보여주지 않는게 더 깔끔할 거 같다.
// 일단은 이 정도로 마무리
const NavBtnContainer = styled.div`
  display: flex;

  button {
    outline: none;
    border: none;
    background-color: white;
    text-decoration: none;
    font-size: 0.55rem;
    font-weight: 600;
    text-overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: hidden;
    cursor: pointer;
  }
`;
const Tabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Span = styled.span<{ isActive: boolean }>`
  font-size: 0.5rem;
  font-weight: 600;
  color: ${({ isActive }) => (isActive ? "#5c37ff" : "#000")};
`;
const Input = styled.input`
  width: 250px;
  font-size: 0.5rem;
  padding: 3px 7px;
  border-radius: 10px;
  border: 0.5px solid #757575;
  margin-left: 10px;

  &:focus {
    outline: none;
    box-shadow: none;
    border: 0.75px solid #5c37ff;
  }
`;

export default function Header() {
  const user = useRecoilValue(userState);
  const isLoginModalOpen = useRecoilValue(loginModalState);
  const isAdditionalDataModalOpen = useRecoilValue(additionalDataModalState);
  const setLoginModalOpen = useSetRecoilState(loginModalState);
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

  useEffect(() => {
    const activePath = Object.keys(pathname).find((path) =>
      location.pathname.startsWith(path)
    );
    setActiveTab(activePath || null);
  }, [location.pathname]);

  return (
    <HeaderWrapper>
      <Logotabwrapper>
        <Logo onClick={() => navigate("/")}>TR!M</Logo>
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
      </Logotabwrapper>
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
      <NavBtnContainer>
        <button onClick={() => onClickHandler("mypage")}>마이페이지</button>
        <button onClick={() => setLoginModalOpen(true)}>
          {user ? user.nickname : "로그인"}
        </button>
      </NavBtnContainer>
      {isLoginModalOpen && <LoginModal />}
      {isAdditionalDataModalOpen && <AdditionalDataModal />}
    </HeaderWrapper>
  );
}
