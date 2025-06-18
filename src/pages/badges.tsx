import styled from "styled-components";
import Profilecontroller from "../components/profilecontroller";

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ControllerContainer = styled.div`
  position: absolute;
  top: 100px;
  left: -50px;
`;
const EditBadges = styled.div`
  margin-top: 60px;
  width: 80%;
  display: flex;
  gap: 20px;
`;
const SelectedBadges = styled.div`
  flex: 1;
  padding: 15px;
  background-color: var(--color-light-purple);
  border: 1px solid var(--color-light-purple-border);
  border-radius: 6px;
  box-shadow: 0px 4px 14px rgba(93, 85, 108, 0.15);
  & > span {
    color: var(--color-purple-hover);
    font-size: var(--font-size-small);
  }
`;
const AllBadges = styled.div`
  flex: 3;
  padding: 15px;
  background-color: var(--color-white-gray);
  border-radius: 6px;
  box-shadow: 0px 4px 14px 0px rgba(97, 96, 96, 0.15);
  & > span {
    color: var(--color-purple-hover);
    font-size: var(--font-size-small);
  }
`;
const Badge = styled.img`
  width: 155px;
  height: 195px;
`;
const NoBadge = styled.div`
  width: 145px;
  height: 185px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-purple-hover);
`;

export default function Badges() {
  return (
    <Container>
      <ControllerContainer>
        <Profilecontroller />
      </ControllerContainer>
      <EditBadges>
        <SelectedBadges>
          <span>내 대표 뱃지</span>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <Badge src="/assets/badge.svg" />
            <NoBadge>+</NoBadge>
            <NoBadge>+</NoBadge>
          </div>
        </SelectedBadges>
        <AllBadges>
          <span>획득한 뱃지</span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              marginTop: "10px",
              gap: "10px",
            }}
          >
            <Badge src="/assets/badge.svg" />
            <Badge src="/assets/badge.svg" />
            <Badge src="/assets/badge.svg" />
            <Badge src="/assets/badge.svg" />
            <Badge src="/assets/badge.svg" />
            <Badge src="/assets/badge.svg" />
            <Badge src="/assets/badge.svg" />
            <Badge src="/assets/badge.svg" />
            <Badge src="/assets/badge.svg" />
            <Badge src="/assets/badge.svg" />
            <Badge src="/assets/badge.svg" />
            <Badge src="/assets/badge.svg" />
          </div>
        </AllBadges>
      </EditBadges>
    </Container>
  );
}
