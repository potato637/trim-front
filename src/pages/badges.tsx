import styled from "styled-components";
import Profilecontroller from "../components/profilecontroller";
import {
  getBadgeList,
  getMyBadge,
  takeBadge,
  cancelBadge,
  selectBadge,
} from "../apis/profileAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
const BadgeContainer = styled.div<{ locked?: boolean }>`
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 155px;
  height: 195px;

  img {
    filter: ${({ locked }) => (locked ? "blur(2px)" : "none")};
  }
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

const BadgeLockOverlay = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  color: var(--color-purple-hover);
  font-size: 24px;
  pointer-events: none;
`;

const AcquireButton = styled.button`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: var(--color-purple-hover);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: var(--font-size-small);
  cursor: pointer;
  font-weight: 600;
`;

const AcquireText = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  color: var(--color-purple-hover);
  font-size: var(--font-size-small);
  font-weight: 600;
  text-align: center;
`;

const BadgeDescription = styled.div`
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
`;

export default function Badges() {
  const queryClient = useQueryClient();
  const { data: badgeList } = useQuery<BadgeList>({
    queryKey: ["badgeList"],
    queryFn: getBadgeList,
  });
  const { data: myBadge } = useQuery<MyBadge>({
    queryKey: ["myBadge"],
    queryFn: getMyBadge,
  });
  const { mutate: takeBadgeMutation, isPending: isTakingBadge } = useMutation({
    mutationFn: takeBadge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBadge"] });
      queryClient.invalidateQueries({ queryKey: ["badgeList"] });
    },
    onError: (error) => {
      console.error("뱃지 획득 중 오류 발생:", error);
      alert("뱃지 획득 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
  const { mutate: cancelBadgeMutation } = useMutation({
    mutationFn: cancelBadge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBadge"] });
      queryClient.invalidateQueries({ queryKey: ["badgeList"] });
    },
  });
  const { mutate: selectBadgeMutation, isPending: isSelectingBadge } =
    useMutation({
      mutationFn: selectBadge,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["myBadge"] });
        queryClient.invalidateQueries({ queryKey: ["badgeList"] });
      },
      onError: (error) => {
        console.error("뱃지 선택 중 오류 발생:", error);
        alert("뱃지 선택 중 오류가 발생했습니다. 다시 시도해주세요.");
      },
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
            {(() => {
              const myBadgeCount = myBadge?.result?.length || 0;
              const noBadgeCount = 3 - myBadgeCount;

              return (
                <>
                  {/* 기존 myBadge 뱃지들 */}
                  {myBadge?.result?.map((badge, index) => (
                    <BadgeContainer key={`badge-${index}`}>
                      <Badge src="/assets/badge.svg" />
                      <DeleteBadge
                        onClick={() =>
                          cancelBadgeMutation({
                            badgeId: badge.badgeResponse.badgeId,
                          })
                        }
                      >
                        ✖️
                      </DeleteBadge>
                    </BadgeContainer>
                  ))}

                  {/* NoBadge로 남은 자리 채우기 */}
                  {Array.from({ length: noBadgeCount }, (_, index) => (
                    <NoBadge key={`no-badge-${index}`}>+</NoBadge>
                  ))}
                </>
              );
            })()}
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
            {badgeList?.result.map((badge) => {
              // 현재 뱃지가 선택된 뱃지인지 확인
              const isSelected = myBadge?.result?.some(
                (myBadge) =>
                  myBadge.badgeResponse.badgeId === badge.badgeResponse.badgeId
              );

              return (
                <BadgeContainer
                  key={badge.badgeResponse.badgeId}
                  locked={
                    badge.missionStatus === "LOCKED" ||
                    badge.missionStatus === "IN_PROGRESS" ||
                    badge.missionStatus === "SUCCESS"
                  }
                  style={{
                    cursor:
                      badge.missionStatus === "GETTO" ? "pointer" : "default",
                  }}
                  onClick={() => {
                    if (badge.missionStatus === "GETTO" && !isSelectingBadge) {
                      selectBadgeMutation({
                        badgeId: badge.badgeResponse.badgeId,
                      });
                    }
                  }}
                >
                  <Badge src="/assets/badge.svg" />
                  <BadgeTitle>{badge.badgeResponse.badgeTitle}</BadgeTitle>
                  <BadgeDescription>{badge.description}</BadgeDescription>
                  {isSelected && (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          top: "40%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 100,
                          backgroundColor: "var(--color-purple-hover)",
                          color: "white",
                          border: "none",
                          borderRadius: "20px",
                          padding: "8px 16px",
                          fontSize: "var(--font-size-small)",
                          fontWeight: 600,
                          pointerEvents: "none",
                        }}
                      >
                        선택됨
                      </div>
                    </>
                  )}
                  {(badge.missionStatus === "LOCKED" ||
                    badge.missionStatus === "IN_PROGRESS") && (
                    <BadgeLockOverlay>
                      <FaLock size={36} />
                    </BadgeLockOverlay>
                  )}
                  {badge.missionStatus === "SUCCESS" && (
                    <>
                      <AcquireButton
                        onClick={(e) => {
                          e.stopPropagation(); // 부모 클릭 이벤트 방지
                          takeBadgeMutation({
                            badgeId: badge.badgeResponse.badgeId,
                          });
                        }}
                        disabled={isTakingBadge}
                      >
                        획득하기
                      </AcquireButton>
                      <AcquireText>500P 획득</AcquireText>
                    </>
                  )}
                  {badge.missionStatus === "GETTO" && isSelectingBadge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 100,
                        color: "var(--color-purple-hover)",
                        fontSize: "var(--font-size-small)",
                        fontWeight: 600,
                      }}
                    >
                      선택 중...
                    </div>
                  )}
                </BadgeContainer>
              );
            })}
          </div>
        </AllBadges>
      </EditBadges>
    </Container>
  );
}
