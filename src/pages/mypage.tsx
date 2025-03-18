import React from "react";
import styled from "styled-components";
import { FaChevronCircleRight } from "react-icons/fa";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-top: 25px;
`;
const TopContainer = styled.div`
  flex: 6;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  & > div {
    height: 300px;
    background-color: var(--color-light-purple);
    border: 0.3px solid var(--color-light-purple-border);
    border-radius: 5px;
    box-shadow: 0px 4px 14px var(--color-input-shadow);
  }
`;
const AbatarContainer = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const UserSVG = styled.div`
  width: var(--font-size-knowledge-user);
  height: var(--font-size-knowledge-user);
  background: url("/assets/userSVG.svg") center/cover no-repeat;
`;
const UserName = styled.div``;
const UserEmail = styled.div``;
const UserIntroduction = styled.div``;
const UserSetProfile = styled.div``;
const RightIcon = styled(FaChevronCircleRight)``;
const BadgeContainer = styled.div`
  flex: 11;
`;
const BottomContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 150px;
  flex: 5;
  color: var(--color-purple);
`;
const BottomTitle = styled.div``;
const BottomItemContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;
const BottomItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Mypage() {
  return (
    <Container>
      <TopContainer>
        <AbatarContainer>
          <UserSVG />
          <UserName></UserName>
          <UserEmail></UserEmail>
          <UserIntroduction></UserIntroduction>
          <UserSetProfile>
            <span>프로필 설정</span>
            <RightIcon />
          </UserSetProfile>
        </AbatarContainer>
        <BadgeContainer></BadgeContainer>
      </TopContainer>
      <BottomContainer>
        <BottomTitle>활동 내역</BottomTitle>
        <BottomItemContainer>
          <BottomItem>1</BottomItem>
          <BottomItem>2</BottomItem>
          <BottomItem>3</BottomItem>
          <BottomItem>4</BottomItem>
          <BottomItem>5</BottomItem>
        </BottomItemContainer>
      </BottomContainer>
    </Container>
  );
}
