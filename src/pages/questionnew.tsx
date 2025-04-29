import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Addtag from "../components/addtag";
import Mde from "../components/mde";
import { postAPI } from "../apis/api";
import { useNavigate, useBlocker } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  & > button {
    color: var(--color-white-gray);
    background-color: var(--color-purple);
    box-shadow: 0px 2px 4px 0px var(--color-item-shadow);
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
const ModalOnForm = styled.div`
  background-color: var(--color-white);
  padding: 20px;
  border-radius: 10px;
  width: 260px;
  height: 70px;
  box-shadow: 0 4px 6px var(--color-modal-shadow);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-pink-modal);
  border: 1px solid var(--color-pink-modal);
`;
const ModalOnNavigation = styled.div`
  background-color: var(--color-white);
  padding: 30px;
  border-radius: 10px;
  width: 300px;
  height: 150px;
  box-shadow: 0 4px 6px var(--color-modal-shadow);
  color: var(--color-pink-modal);
  border: 1px solid var(--color-pink-modal);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  & > button {
    width: 110px;
    height: 50px;
    padding: 10px 20px;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    transition: 100ms;
    cursor: pointer;
  }

  & > :first-child {
    color: var(--color-black);
    background-color: var(--color-modal-gray);

    &:hover {
      background-color: var(--color-modal-gray-hover);
    }
  }

  & > :last-child {
    color: var(--color-white);
    background-color: var(--color-pink-modal);

    &:hover {
      background-color: var(--color-pink-modal-hover);
    }
  }
`;

export default function Questionnew() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");
  const [majorType, setMajorType] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [clearMDE, setClearMDE] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const isFormDirty = title.trim() !== "" || markdown.trim() !== "";
  const blocker = useBlocker(isFormDirty);

  useEffect(() => {
    if (blocker?.state === "blocked") {
      setShowModal(true);
    }
  }, [blocker?.state]);

  const handleCloseModal = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowModal(false);
      if (blocker?.state === "blocked") {
        blocker.reset();
      }
    }
  };
  const onTitleChange = (text: string) => {
    setTitle(text);
  };
  const { mutate: postQuestion } = useMutation({
    mutationFn: () =>
      postAPI.question({ title, content: markdown, majorType, tags }),
    onSuccess: () => {
      if (blocker?.state === "blocked") {
        blocker.proceed();
      }
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      setTitle("");
      setMarkdown("");
      setClearMDE((prev) => !prev);
    },
    onError: () => {
      navigate("/signin");
    },
  });
  const handleSubmit = () => {
    if (!title.trim() || !markdown.trim() || !majorType) {
      setShowModal(true);
    } else {
      try {
        postQuestion();
        navigate("/question");
      } catch (error) {
        console.error(error);
      }
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
      <Addtag setMajorType={setMajorType} tags={tags} setTags={setTags} />
      {showModal && (
        <ModalOverLay onClick={handleCloseModal}>
          <ModalOnForm ref={modalRef}>
            <span>필요한 값이 입력되지 않았습니다.</span>
          </ModalOnForm>
        </ModalOverLay>
      )}
      {blocker?.state === "blocked" && (
        <ModalOverLay onClick={handleCloseModal}>
          <ModalOnNavigation ref={modalRef}>
            <p>입력한 값이 사라질 수 있습니다.</p>
            <ModalButtons>
              <button onClick={() => blocker.proceed()}>진행</button>
              <button onClick={() => blocker.reset()}>취소</button>
            </ModalButtons>
          </ModalOnNavigation>
        </ModalOverLay>
      )}
    </Container>
  );
}
