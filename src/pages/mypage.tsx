import React from "react";
import styled from "styled-components";

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
  gap: 10px;
  & > div {
    height: 300px;
    background-color: var(--color-light-purple);
    border: 0.3px solid var(--color-light-purple-border);
    border-radius: 5px;
  }
`;
const AbatarContainer = styled.div`
  flex: 5;
`;
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
        <AbatarContainer></AbatarContainer>
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
