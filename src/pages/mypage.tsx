import React from "react";
import styled from "styled-components";
import { FaChevronCircleRight } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

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
  justify-content: center;
  align-items: center;
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
  align-items: center;
  & > div:first-child {
    flex: 5;
    width: 80%;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }
  & > div:last-child {
    flex: 1;
    width: 80%;
  }
`;
const UserSVG = styled.div`
  width: var(--font-size-knowledge-user);
  height: var(--font-size-knowledge-user);
  background: url("/assets/userSVG.svg") center/cover no-repeat;
`;
const User = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const UserName = styled.div`
  font-size: var(--font-size-extra-medium);
  color: var(--color-purple-hover);
`;
const Dot = styled(GoDotFill)`
  color: var(--color-purple);
`;
const UserEmail = styled.div`
  font-size: var(--font-size-small);
  color: var(--color-gray);
  display: flex;
  align-items: center;
`;
const UserIntroduction = styled.div`
  font-size: var(--font-size-small);
  color: var(--color-gray);
`;
const UserSetProfile = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 7px;
`;
const RightIcon = styled(FaChevronCircleRight)`
  color: var(--color-purple-hover);
  cursor: pointer;
`;
const BadgeContainer = styled.div`
  flex: 11;
  display: flex;
  flex-direction: column;
  & > div:first-child {
    flex: 5;
    width: 95%;
  }
  & > div:last-child {
    flex: 1;
    width: 95%;
  }
`;
const Badges = styled.div`
  flex: 4;
`;
const UserSetBadge = styled.div`
  flex: 1;
  width: 95%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 7px;
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
          <div>
            <UserSVG />
            <User>
              <UserName>fdsfsd</UserName>
              <UserEmail>
                <Dot></Dot> fdsf
              </UserEmail>
              <UserIntroduction>fds</UserIntroduction>
            </User>
          </div>
          <UserSetProfile>
            <span>프로필 설정</span>
            <RightIcon />
          </UserSetProfile>
        </AbatarContainer>
        <BadgeContainer>
          <Badges></Badges>
          <UserSetBadge>
            <span>뱃지 전체 보기</span>
            <RightIcon />
          </UserSetBadge>
        </BadgeContainer>
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
