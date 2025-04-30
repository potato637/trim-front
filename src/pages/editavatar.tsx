import styled from "styled-components";
import Profilecontroller from "../components/profilecontroller";
import { useState } from "react";

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
  width: 70%;
  display: flex;
  gap: 20px;
`;
const AllAvatar = styled.div`
  flex: 5.5;
`;
const AvatarContainer = styled.div`
  display: grid;
  min-height: 500px;
  grid-template-columns: 3;
  gap: 10px;
  overflow-y: auto;

  /* Hide scrollbar (Chrome, Edge, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar (Firefox) */
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE and Edge */
`;
const FeatureBtn = styled.button<{ selected: boolean }>`
  border: none;
  background: none;
  cursor: pointer;
  font-size: var(--font-size-medium);
  color: ${({ selected }) =>
    selected ? "var(--color-purple-hover)" : "black"};
`;
const MyAvatar = styled.div`
  flex: 4.5;
`;

export default function Editavatar() {
  const [selectedBtn, setSelectedBtn] = useState<string>("hair");

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
              onClick={() => setSelectedBtn("eye")}
              selected={selectedBtn === "eye"}
            >
              눈
            </FeatureBtn>
            <FeatureBtn
              onClick={() => setSelectedBtn("nose")}
              selected={selectedBtn === "nose"}
            >
              코
            </FeatureBtn>
            <FeatureBtn
              onClick={() => setSelectedBtn("mouth")}
              selected={selectedBtn === "mouth"}
            >
              입
            </FeatureBtn>
            <FeatureBtn
              onClick={() => setSelectedBtn("costume")}
              selected={selectedBtn === "costume"}
            >
              의상
            </FeatureBtn>
            <FeatureBtn
              onClick={() => setSelectedBtn("bg")}
              selected={selectedBtn === "bg"}
            >
              배경
            </FeatureBtn>
          </div>
          <AvatarContainer></AvatarContainer>
        </AllAvatar>
        <MyAvatar></MyAvatar>
      </EditAvatar>
    </Container>
  );
}
