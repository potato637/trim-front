import styled from "styled-components";
import Profilecontroller from "../components/profilecontroller";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMouth, getEyes, getCloth, getHair } from "../apis/profileAPI";

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
const EditAvatar = styled.div`
  margin-top: 60px;
  width: 80%;
  display: flex;
  gap: 30px;
`;
const AllAvatar = styled.div`
  flex: 5.5;
`;
const AvatarContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  background-color: var(--color-white-gray);
  border-radius: 6px;
  padding: 20px;
  box-shadow: 0px 4px 14px rgba(97, 96, 96, 0.15);
`;
const ColorPalette = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  flex-wrap: wrap;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: center;
`;
const ColorButton = styled.button<{ color: string; selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid
    ${({ selected }) => (selected ? "var(--color-purple)" : "transparent")};
  background-color: ${({ color }) => color};
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
  }
`;
const AvatarItem = styled.div<{ isSelected?: boolean; isEditting?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: ${({ isEditting }) => (isEditting ? "pointer" : "default")};
  transition: all 0.2s ease;
  border: ${({ isSelected, isEditting }) =>
    isEditting && isSelected ? "2px solid var(--color-primary)" : "none"};

  &:hover {
    transform: ${({ isEditting }) =>
      isEditting ? "translateY(-2px)" : "none"};
    box-shadow: ${({ isEditting }) =>
      isEditting
        ? "0 4px 12px rgba(0, 0, 0, 0.15)"
        : "0 2px 8px rgba(0, 0, 0, 0.1)"};
  }
`;
const AvatarPreview = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
  border-radius: 50%;
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    position: absolute;
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
`;
const ItemName = styled.div`
  font-size: var(--font-size-small);
  color: var(--color-gray);
  text-align: center;
`;
const PriceTag = styled.div`
  font-size: var(--font-size-small);
  color: var(--color-primary);
  font-weight: bold;
  margin-top: 5px;
`;
const FeatureBtn = styled.button<{ selected: boolean }>`
  border: none;
  background: none;
  cursor: pointer;
  font-size: var(--font-size-medium);
  color: ${({ selected }) =>
    selected ? "var(--color-purple-hover)" : "black"};
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-light-purple);
  }
`;
const MyAvatar = styled.div`
  flex: 5;
  font-size: var(--font-size-medium);
`;
const MyAvatarContainer = styled.div`
  margin-top: 20px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const AvatarNow = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div {
    display: flex;
    gap: 20px;
    > button {
      width: fit-content;
      margin-top: 30px;
      color: var(--color-white);
      background-color: var(--color-purple-hover);
      padding: 10px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
    }
  }
`;
const AvatarPreset = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  background-color: var(--color-purple);
  border-radius: 50%;
  > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
  }
`;
const ItemsGrid = styled.div`
  min-width: 520px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  overflow-y: auto;
  flex: 1;

  /* Hide scrollbar (Chrome, Edge, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar (Firefox) */
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE and Edge */
`;

// 색상 매핑
const hairColors = {
  NAVY: "#000080",
  RED_BROWN: "#8B4513",
  DARK_BROWN: "#654321",
  LIGHT_BROWN: "#D2691E",
  GOLD: "#FFD700",
  PEACH: "#FFCBA4",
  MINT: "#98FB98",
  BLUE: "#0000FF",
  LAVENDER: "#E6E6FA",
  PURPLE: "#800080",
  BLONDE: "#F4A460",
  BLACK: "#000000",
};

const clothColors = {
  RED: "#FF0000",
  PINK: "#FFC0CB",
  ORANGE: "#FFA500",
  YELLOW: "#FFFF00",
  YELLOW_GREEN: "#9ACD32",
  EMERALD_GREEN: "#50C878",
  SKY_BLUE: "#87CEEB",
  LAVENDER: "#E6E6FA",
  PURPLE: "#800080",
  WHITE: "#FFFFFF",
  GRAY: "#808080",
  BLACK: "#000000",
};

// API 응답 타입 정의
interface AvatarItem {
  price: number;
  imageUrl: string;
}

interface HairItem extends AvatarItem {
  hairId: number;
}

interface ClothItem extends AvatarItem {
  clothId: number;
}

interface EyesItem extends AvatarItem {
  eyesId: number;
}

interface MouthItem extends AvatarItem {
  mouthId: number;
}

export default function Editavatar() {
  const [selectedBtn, setSelectedBtn] = useState<string>("hair");
  const [selectedData, setSelectedData] = useState<any[]>([]);
  const [selectedHairColor, setSelectedHairColor] = useState<string>("NAVY");
  const [selectedClothColor, setSelectedClothColor] =
    useState<string>("YELLOW_GREEN");
  const [isEditting, setIsEditting] = useState<boolean>(false);

  // 선택된 아이템들을 저장할 상태들
  const [selectedHair, setSelectedHair] = useState<any>(null);
  const [selectedEye, setSelectedEye] = useState<any>(null);
  const [selectedMouth, setSelectedMouth] = useState<any>(null);
  const [selectedCostume, setSelectedCostume] = useState<any>(null);

  // API 호출
  const { data: mouthData, isLoading: mouthLoading } = useQuery({
    queryKey: ["mouth"],
    queryFn: getMouth,
  });

  const { data: eyesData, isLoading: eyesLoading } = useQuery({
    queryKey: ["eyes"],
    queryFn: getEyes,
  });

  const { data: clothData, isLoading: clothLoading } = useQuery({
    queryKey: ["cloth", selectedClothColor],
    queryFn: () => getCloth({ color: selectedClothColor }),
  });

  const { data: hairData, isLoading: hairLoading } = useQuery({
    queryKey: ["hair", selectedHairColor],
    queryFn: () => getHair({ color: selectedHairColor }),
  });

  useEffect(() => {
    setSelectedData(getCurrentData());
  }, [
    selectedBtn,
    mouthLoading,
    eyesLoading,
    clothLoading,
    hairLoading,
    hairData,
    clothData,
  ]);

  const isLoading = mouthLoading || eyesLoading || clothLoading || hairLoading;

  const getCurrentData = () => {
    switch (selectedBtn) {
      case "hair":
        return hairData?.result || [];
      case "eye":
        return eyesData?.result || [];
      case "mouth":
        return mouthData?.result || [];
      case "costume":
        return clothData?.result || [];
      default:
        return [];
    }
  };

  const renderColorPalette = () => {
    if (selectedBtn === "hair") {
      return (
        <ColorPalette>
          {Object.entries(hairColors).map(([key, color]) => (
            <ColorButton
              key={key}
              color={color}
              selected={selectedHairColor === key}
              onClick={() => setSelectedHairColor(key)}
              title={key}
            />
          ))}
        </ColorPalette>
      );
    } else if (selectedBtn === "costume") {
      return (
        <ColorPalette>
          {Object.entries(clothColors).map(([key, color]) => (
            <ColorButton
              key={key}
              color={color}
              selected={selectedClothColor === key}
              onClick={() => setSelectedClothColor(key)}
              title={key}
            />
          ))}
        </ColorPalette>
      );
    }
    return null;
  };

  const getItemId = (item: any) => {
    switch (selectedBtn) {
      case "hair":
        return (item as HairItem).hairId;
      case "eye":
        return (item as EyesItem).eyesId;
      case "mouth":
        return (item as MouthItem).mouthId;
      case "costume":
        return (item as ClothItem).clothId;
      default:
        return 0;
    }
  };

  const getItemName = (item: any) => {
    const id = getItemId(item);
    switch (selectedBtn) {
      case "hair":
        return `헤어 ${id}`;
      case "eye":
        return `눈 ${id}`;
      case "mouth":
        return `입 ${id}`;
      case "costume":
        return `의상 ${id}`;
      default:
        return `${selectedBtn} ${id}`;
    }
  };

  // 아이템 선택 핸들러
  const handleItemSelect = (item: any) => {
    if (!isEditting) return;

    switch (selectedBtn) {
      case "hair":
        setSelectedHair(item);
        break;
      case "eye":
        setSelectedEye(item);
        break;
      case "mouth":
        setSelectedMouth(item);
        break;
      case "costume":
        setSelectedCostume(item);
        break;
    }
  };

  // 저장 검증 및 처리
  const handleSave = () => {
    if (!selectedHair || !selectedEye || !selectedMouth || !selectedCostume) {
      alert("모든 파츠(헤어, 눈, 입, 의상)를 선택해주세요!");
      return;
    }

    // 실제 저장 로직

    setSelectedHair(null);
    setSelectedEye(null);
    setSelectedMouth(null);
    setSelectedCostume(null);

    setIsEditting(false);
    alert("아바타가 저장되었습니다!");
  };

  // 편집 모드 토글
  const toggleEditMode = () => {
    if (isEditting) {
      handleSave();
    } else {
      setIsEditting(true);
    }
  };

  return (
    <Container>
      <ControllerContainer>
        <Profilecontroller />
      </ControllerContainer>
      <EditAvatar>
        <AllAvatar>
          <div>
            <FeatureBtn
              onClick={() => setSelectedBtn("hair")}
              selected={selectedBtn === "hair"}
            >
              헤어
            </FeatureBtn>
            <FeatureBtn
              onClick={() => setSelectedBtn("costume")}
              selected={selectedBtn === "costume"}
            >
              의상
            </FeatureBtn>
            <FeatureBtn
              onClick={() => setSelectedBtn("eye")}
              selected={selectedBtn === "eye"}
            >
              눈
            </FeatureBtn>
            <FeatureBtn
              onClick={() => setSelectedBtn("mouth")}
              selected={selectedBtn === "mouth"}
            >
              입
            </FeatureBtn>
          </div>
          <AvatarContainer>
            {renderColorPalette()}
            <ItemsGrid>
              {!isLoading &&
                selectedData.map((item: any, index: number) => {
                  const isSelected =
                    (selectedBtn === "hair" && selectedHair === item) ||
                    (selectedBtn === "eye" && selectedEye === item) ||
                    (selectedBtn === "mouth" && selectedMouth === item) ||
                    (selectedBtn === "costume" && selectedCostume === item);

                  return (
                    <AvatarItem
                      key={index}
                      isSelected={isSelected}
                      isEditting={isEditting}
                      onClick={() => handleItemSelect(item)}
                    >
                      <AvatarPreview>
                        <img src="/assets/avatar/face.svg" />
                        {/* 기본 베이스 아이템들 렌더링 */}
                        {selectedBtn !== "hair" && (
                          <img src="/assets/avatar/hair/hair1.svg" />
                        )}
                        {selectedBtn !== "eye" && (
                          <img src="/assets/avatar/eye/eye1.svg" />
                        )}
                        {selectedBtn !== "mouth" && (
                          <img src="/assets/avatar/mouth/mouth1.svg" />
                        )}
                        {selectedBtn !== "costume" && (
                          <img src="/assets/avatar/costume/costume1.svg" />
                        )}
                        {/* 선택된 타입의 아이템 렌더링 */}
                        <img src={item.imageUrl} alt={getItemName(item)} />
                      </AvatarPreview>
                      <ItemName>{getItemName(item)}</ItemName>
                      <PriceTag>{item.price} 포인트</PriceTag>
                    </AvatarItem>
                  );
                })}
            </ItemsGrid>
          </AvatarContainer>
        </AllAvatar>
        <MyAvatar>
          <div
            style={{ height: "35.5px", display: "flex", alignItems: "center" }}
          >
            <span>현재 아바타</span>
          </div>
          <MyAvatarContainer>
            <AvatarNow>
              <AvatarPreset>
                <img src="/assets/avatar/face.svg" />
                {isEditting ? (
                  <>
                    {selectedHair && (
                      <img src={selectedHair.imageUrl} alt="선택된 헤어" />
                    )}
                    {selectedEye && (
                      <img src={selectedEye.imageUrl} alt="선택된 눈" />
                    )}
                    {selectedMouth && (
                      <img src={selectedMouth.imageUrl} alt="선택된 입" />
                    )}
                    {selectedCostume && (
                      <img src={selectedCostume.imageUrl} alt="선택된 의상" />
                    )}
                  </>
                ) : (
                  <>
                    <img src="/assets/avatar/hair/hair1.svg" />
                    <img src="/assets/avatar/eye/eye1.svg" />
                    <img src="/assets/avatar/mouth/mouth1.svg" />
                    <img src="/assets/avatar/costume/costume1.svg" />
                  </>
                )}
              </AvatarPreset>
              <div>
                <button style={{ padding: "15px" }} onClick={toggleEditMode}>
                  {isEditting ? "저장하기" : "편집하기"}
                </button>
              </div>
            </AvatarNow>
          </MyAvatarContainer>
        </MyAvatar>
      </EditAvatar>
    </Container>
  );
}
