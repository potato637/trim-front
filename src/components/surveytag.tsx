import { useState } from "react";
import styled from "styled-components";
import { BsPencilFill } from "react-icons/bs";

const Container = styled.div`
  width: 100%;
  margin: 10px 0;
  min-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BaseBtn = styled.div<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? "blue" : "white")};
  font-size: 0.5rem;
  padding: 5px 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 0.5px;
  border-radius: 15px;
  min-width: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  & > span {
    color: ${({ isActive }) => (isActive ? "white" : "black")};
  }
`;
const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const StatusBtn = styled(BaseBtn)``;
const DoneContainer = styled.div`
  padding: 0px 10px;
  border-left: 0.5px solid #cdcdcd;
  border-right: 0.5px solid #cdcdcd;
`;
const DoneBtn = styled(BaseBtn)``;
const MineContainer = styled.div``;
const MineBtn = styled(BaseBtn)``;
const WriteContainer = styled.div``;
const WriteBtn = styled.div`
  position: relative;
  padding: 5px 1.2rem 5px 8px;
  font-size: 0.5rem;
  border: 0.5px solid #6129e9;
  border-radius: 15px;
  background-color: #f5f3ff;
  cursor: pointer;
`;
const PencilIcon = styled(BsPencilFill)`
  position: absolute;
  font-weight: 400;
  top: 50%;
  transform: translateY(-50%);
  right: 0.3rem;
  font-size: 0.6rem;
  color: #8045fa;
`;

type StatusI = "new" | "view" | "hot" | "imminent";

export default function SurveyTag() {
  const [selectedStatus, setSelectedStatus] = useState<StatusI>("new");
  const statusClickHandler = (status: StatusI) => {
    setSelectedStatus(status);
  };
  const isStatusActive = (status: string) => {
    return status === selectedStatus;
  };
  const [isDone, setIsDone] = useState<boolean>(false);
  const doneClickHandler = () => {
    setIsDone(!isDone);
  };
  const [mine, setMine] = useState<boolean>(false);
  const mineClickHandler = () => {
    setMine(!mine);
  };

  return (
    <Container>
      <StatusContainer>
        <StatusBtn
          onClick={() => statusClickHandler("new")}
          isActive={isStatusActive("new")}
        >
          <span>최신</span>
        </StatusBtn>
        <StatusBtn
          onClick={() => statusClickHandler("view")}
          isActive={isStatusActive("view")}
        >
          <span>조회수</span>
        </StatusBtn>
        <StatusBtn
          onClick={() => statusClickHandler("hot")}
          isActive={isStatusActive("hot")}
        >
          <span>참여도</span>
        </StatusBtn>
        <StatusBtn
          onClick={() => statusClickHandler("imminent")}
          isActive={isStatusActive("imminent")}
        >
          <span>마감임박</span>
        </StatusBtn>
      </StatusContainer>
      <DoneContainer>
        <DoneBtn onClick={doneClickHandler} isActive={isDone}>
          <span>완료</span>
        </DoneBtn>
      </DoneContainer>
      <MineContainer>
        <MineBtn onClick={mineClickHandler} isActive={mine}>
          <span>나의 설문</span>
        </MineBtn>
      </MineContainer>
      <WriteContainer>
        <WriteBtn>
          <span>설문조사 작성하기</span>
          <PencilIcon />
        </WriteBtn>
      </WriteContainer>
    </Container>
  );
}
