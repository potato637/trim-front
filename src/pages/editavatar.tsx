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
  width: 80%;
  display: flex;
  gap: 20px;
`;
const AllAvatar = styled.div`
  flex: 5.5;
`;
const AvatarContainer = styled.div`
  margin-top: 20px;
  display: grid;
  height: 500px;
  grid-template-columns: 3;
  gap: 10px;
  overflow-y: auto;
  background-color: var(--color-white-gray);
  border-radius: 6px;
  box-shadow: 0px 4px 14px rgba(97, 96, 96, 0.15);

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
    position: relative;
    width: 270px;
    height: 270px;
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
  }
  & > button {
    width: fit-content;
    margin-top: 20px;
    color: var(--color-white);
    background-color: var(--color-purple-hover);
    padding: 7px 10px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
  }
`;
const AvatarPresetContainer = styled.div`
  flex: 1;
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
        <MyAvatar>
          <div>
            <span>현재 아바타</span>
          </div>
          <MyAvatarContainer>
            <AvatarNow>
              <div>
                <img src="/assets/avatar/face.svg" />
                <img src="/assets/avatar/hair/hair1.svg" />
                <img src="/assets/avatar/eye/eye1.svg" />
                <img src="/assets/avatar/mouth/mouth1.svg" />
                <img src="/assets/avatar/costume/costume1.svg" />
              </div>
              <button>현재 아바타로 저장하기</button>
            </AvatarNow>
            <AvatarPresetContainer></AvatarPresetContainer>
          </MyAvatarContainer>
        </MyAvatar>
      </EditAvatar>
    </Container>
  );
}
