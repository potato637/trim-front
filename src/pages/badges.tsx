import styled from "styled-components";
import Profilecontroller from "../components/profilecontroller";
import { getBadgeList, getMyBadge } from "../apis/profileAPI";
import { useQuery } from "@tanstack/react-query";
import { BadgeList, MyBadge } from "../types/badgeType";
import { FaLock } from "react-icons/fa";

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
  min-width: 600px;
  height: 663px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  & > span {
    color: var(--color-purple-hover);
    font-size: var(--font-size-small);
  }
`;
const BadgeContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 155px;
  height: 195px;
`;
const Badge = styled.img`
  width: 155px;
  height: 195px;
`;
const DeleteBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: var(--color-gray-text);
  font-size: var(--font-size-small);
  cursor: pointer;
`;
const NoBadge = styled.div`
  width: 145px;
  height: 185px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-purple-hover);
`;

const BadgeTitle = styled.span`
  color: var(--color-purple-hover);
  font-size: var(--font-size-small);
  font-weight: 600;
  text-align: center;
  margin-top: 8px;
  line-height: 1.2;
`;

export default function Badges() {
  const { data: badgeList } = useQuery<BadgeList>({
    queryKey: ["badgeList"],
    queryFn: getBadgeList,
  });
  const { data: myBadge } = useQuery<MyBadge>({
    queryKey: ["myBadge"],
    queryFn: getMyBadge,
  });

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
              marginTop: "30px",
              alignItems: "center",
            }}
          >
            <BadgeContainer>
              <Badge src="/assets/badge.svg" />
              <DeleteBadge>✖️</DeleteBadge>
            </BadgeContainer>
            <NoBadge>+</NoBadge>
            <NoBadge>+</NoBadge>
          </div>
        </SelectedBadges>
        <AllBadges>
          <span>획득한 뱃지</span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              marginTop: "30px",
              gap: "50px",
            }}
          >
            {badgeList?.result.map((badge) => (
              <BadgeContainer>
                <Badge src="/assets/badge.svg" />
                <BadgeTitle>{badge.badgeResponse.badgeTitle}</BadgeTitle>
              </BadgeContainer>
            ))}
          </div>
        </AllBadges>
      </EditBadges>
    </Container>
  );
}
