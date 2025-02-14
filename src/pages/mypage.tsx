import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: 300px;
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
`;
const AbatarContainer = styled.div`
  width: 30%;
  flex: 5;
  border-radius: 5px;
  background-color: #f5f3ff;
  border: 0.3px solid #d9c3ff;
`;
const BadgeContainer = styled.div`
  width: 30%;
  flex: 11;
  border-radius: 5px;
  background-color: #f5f3ff;
  border: 0.3px solid #d9c3ff;
`;
const BottomContainer = styled.div`
  width: 100%;
  flex: 5;
  background-color: green;
`;

export default function Mypage() {
  return (
    <Container>
      <TopContainer>
        <AbatarContainer></AbatarContainer>
        <BadgeContainer></BadgeContainer>
      </TopContainer>
      <BottomContainer></BottomContainer>
    </Container>
  );
}
