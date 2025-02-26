import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  additionalDataModalState,
  loginModalState,
  userState,
} from "../recoil/userState";

const ModalOverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 300px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const SocialButton = styled.button`
  margin: 10px 0;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #5c37ff;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #3b25cc;
  }
`;

export default function LoginModal() {
  const setUser = useSetRecoilState(userState);
  const setLoginModalOpen = useSetRecoilState(loginModalState);
  const setAdditionalDataModalOpen = useSetRecoilState(
    additionalDataModalState
  );
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setLoginModalOpen(false);
    }
  };

  return (
    <ModalOverLay onClick={handleCloseModal}>
      <ModalContent ref={modalRef}>
        <SocialButton>
          <a href="/oauth2/authorizatioin/naver">Login with kakao</a>
        </SocialButton>
        <SocialButton>
          <a href="/oauth2/authorization/kakao">Login with naver</a>
        </SocialButton>
        <SocialButton>
          <a href="/oauth2/authorization/google">Login with google</a>
        </SocialButton>
      </ModalContent>
    </ModalOverLay>
  );
}
