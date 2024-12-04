import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  additionalDataModalState,
  loginModalState,
  userState,
} from "../recoil/userState";
import LoginModal from "../components/loginmodal";
import AdditionalDataModal from "../components/additionaldatamodal";

const HeaderWrapper = styled.header`
  font-size: inherit;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  max-height: 30px;
  border-bottom: 0.5px solid #ddd;
  background-color: white;
`;

const Logo = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #5c37ff;
  margin-left: 10px;
`;

const SearchInput = styled.input`
  font-size: 0.4rem;
  flex: 1;
  max-width: 600px;
  margin: 0px 10px 0px 20px;
  padding: 3px 5px;
  border: 1px solid #ddd;
  border-radius: 25px;

  &::placeholder {
    color: #aaa;
  }
`;

// 나중에 화면 사이즈에 따라 일부 요소 보여주지 않는게 더 깔끔할 거 같다.
// 일단은 이 정도로 마무리
const NavBtnContainer = styled.div`
  padding: 0 20px;
  display: flex;
  gap: 15px;

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

export default function Header() {
  const user = useRecoilValue(userState);
  const isLoginModalOpen = useRecoilValue(loginModalState);
  const isAdditionalDataModalOpen = useRecoilValue(additionalDataModalState);
  const setLoginModalOpen = useSetRecoilState(loginModalState);

  return (
    <HeaderWrapper>
      <Logo>TR!M</Logo>
      <SearchInput
        type="text"
        placeholder="TR!M에서 필요한 정보를 찾아보세요"
      />
      <NavBtnContainer>
        <button>마이페이지</button>
        <button onClick={() => setLoginModalOpen(true)}>
          {user ? user.nickname : "로그인"}
        </button>
      </NavBtnContainer>
      {isLoginModalOpen && <LoginModal />}
      {isAdditionalDataModalOpen && <AdditionalDataModal />}
    </HeaderWrapper>
  );
}
