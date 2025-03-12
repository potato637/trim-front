import styled from "styled-components";
import Mde from "../components/mde";
import { postAPI } from "../api";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const Title = styled.input`
  flex: 9;
  font-size: var(--font-size-large);
  font-weight: 600;
  padding: 10px 0px;
  border: none;
  &:hover,
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
`;
const Buttons = styled.div`
  flex: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 100px;
    font-size: var(--font-size-small);
    border-radius: 50px;
    border: none;
    padding: 8px 0;
  }
  & > button:first-child {
    color: var(--color-purple);
    background-color: var(--color-white-gray);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  }
  & > button:last-child {
    color: var(--color-white-gray);
    background-color: var(--color-purple);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  }
`;
const ModalOverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-modal-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const Modal = styled.div`
  background-color: var(--color-white);
  padding: 20px;
  border-radius: 10px;
  max-width: 300px;
  width: 100%;
  box-shadow: 0 4px 6px var(--color-modal-shadow);
`;

export default function Communitynew() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");
  const [clearMDE, setClearMDE] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const onTitleChange = (text: string) => {
    setTitle(text);
  };
  const handleSubmit = () => {
    try {
      postAPI.community({ title, content: markdown });
      navigate("/community");
      setTitle("");
      setMarkdown("");
      setClearMDE((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <TitleContainer>
        <Title
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="제목을 입력해주세요"
        />
        <Buttons>
          <button type="button" onClick={handleSubmit}>
            제출하기
          </button>
        </Buttons>
      </TitleContainer>
      <Mde setMarkdown={setMarkdown} clearMDE={clearMDE} />
      {showModal && (
        <ModalOverLay>
          <Modal></Modal>
        </ModalOverLay>
      )}
    </Container>
  );
}
