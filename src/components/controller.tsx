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
  z-index: 20;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 8px 0 8px 0;
  @media (max-width: 1400px) {
    display: none;
  }
`;
const PageContainer = styled.div`
  display: flex;
  width: 3.5rem;
  height: 8.5rem;
  padding: 14px 0;
  flex-direction: column;
  gap: 24px;
  background-color: var(--color-white-gray);
  border: 1.5px solid var(--color-light-purple-border);
  border-radius: 32px;
  box-shadow: 0 2px 8px 0 var(--color-item-shadow);
  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-purple);
    gap: 8px;
    cursor: pointer;
    border-radius: 18px;
    transition: background 0.18s, color 0.18s, box-shadow 0.18s;
    &:hover {
      color: var(--color-purple-hover);
    }
  }
  & > div > span {
    font-size: var(--font-size-small);
    font-weight: 500;
    letter-spacing: 0.01em;
  }
`;
const TopContainer = styled.div``;
const BackContainer = styled.div``;
const WriteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    var(--color-purple-hover) 60%,
    #a084fa 100%
  );
  font-size: 1.7rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 16px 0 rgba(97, 41, 233, 0.18);
  border: 2.5px solid #fff;
  transition: background 0.18s, box-shadow 0.18s, transform 0.12s;
  &:hover {
    background: linear-gradient(135deg, #7c4dff 60%, #b39ddb 100%);
    box-shadow: 0 6px 20px 0 rgba(97, 41, 233, 0.22);
    transform: scale(1.07);
  }
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
