import React from "react";
import styled from "styled-components";
import { FaArrowUp, FaArrowLeft } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const ControllerContainer = styled.div`
  position: fixed;
  top: 15%;
  right: 10%;
  z-index: 10;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media (max-width: 1400px) {
    display: none;
  }
`;
const PageContainer = styled.div`
  display: flex;
  width: 3rem;
  height: 8rem;
  padding: 10px 0;
  flex-direction: column;
  gap: 20px;
  background-color: var(--color-white-gray);
  border: 0.5px solid var(--color-border);
  border-radius: 30px;
  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-purple);
    gap: 6px;
    cursor: pointer;
  }
  & > div > span {
    font-size: var(--font-size-small);
  }
`;
const TopContainer = styled.div``;
const BackContainer = styled.div``;
const WriteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6129e9;
  font-size: var(--font-size-medium);
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  cursor: pointer;
`;

export default function Controller() {
  const location = useLocation();
  const login = useLogin();
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const goBack = () => {
    navigate(-1);
  };
  const handleWriteBtnClick = () => {
    const to = location.pathname.split("/").filter(Boolean)[0] || "question";
    login(`/${to}/new`);
  };

  return (
    <ControllerContainer>
      <PageContainer>
        <TopContainer onClick={scrollToTop}>
          <FaArrowUp />
          <span>TOP</span>
        </TopContainer>
        <BackContainer onClick={goBack}>
          <FaArrowLeft />
          <span>BACK</span>
        </BackContainer>
      </PageContainer>
      {(() => {
        const path = location.pathname;
        // 허용 경로: /question, /question/숫자, /knowledge, /knowledge/숫자, /community, /community/숫자
        const match = /^\/(question|knowledge|community)(\/\d+)?$/.test(path);
        if (!match) return null;
        return (
          <WriteContainer onClick={handleWriteBtnClick}>
            <HiPencil color="white" />
          </WriteContainer>
        );
      })()}
    </ControllerContainer>
  );
}
