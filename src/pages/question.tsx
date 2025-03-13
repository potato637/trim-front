import { useState } from "react";
import styled from "styled-components";
import Comments from "../components/comments";
import { TbPencilCheck } from "react-icons/tb";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";
import React from "react";
import { useLocation } from "react-router-dom";
import { singleAPI } from "../api";

const MainContent = styled.div`
  width: 100%;
  border-bottom: 0.5px solid #cbcdd6;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
`;
const TitleContainer = styled.div`
  font-size: var(--font-size-large);
  font-weight: 600;
`;
const WriterContainer = styled.div`
  font-size: var(--font-size-small);
  color: #37009c;
  display: flex;
  gap: 5px;
  align-items: center;
`;
const WriterSVG = styled.div`
  width: var(--font-size-extra-medium);
  height: var(--font-size-extra-medium);
  background: url("/assets/userSVG.svg") center/cover no-repeat;
`;
const ContentContainer = styled.div`
  font-size: var(--font-size-medium);
  line-height: 1.6;
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-small);
`;
const Infos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const Info = styled.div``;
const CommentBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  cursor: pointer;
`;
const AnswersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const PencilImg = styled.div`
  background-color: #6129e9;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--font-size-extra-medium);
  height: var(--font-size-extra-medium);
  border-radius: 50%;
`;
const AnswersCount = styled.div`
  display: flex;
  gap: 5px;
  justify-content: flex-start;
  align-items: center;
  font-size: var(--font-size-small);
`;
const Answer = styled.div`
  width: 100%;
  border-radius: 6px;
  background-color: #fbfbfb;
  box-shadow: 0px 4px 14px 0px rgba(97, 96, 96, 0.15);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 20px;
`;
const AnswerWriter = styled(WriterContainer)``;
const AnswerText = styled.p`
  font-size: var(--font-size-medium);
  line-height: 1.6;
`;
const AnswerImg = styled.img`
  width: 100%;
`;
const AnswerCommentBtn = styled(CommentBtn)`
  display: flex;
  justify-content: flex-end;
  font-size: var(--font-size-small);
`;

const questionData = {
  title: "2번 빠지고 A+ 받는법",
  user: {
    name: "이름름",
    scholar: "예체능",
    upload: "약 15시간 전",
  },
  main: "학점을 잘 받기 위해서는 체계적인 계획과 꾸준한 노력이 필요합니다. 먼저, 강의 초반에 수업 계획서(Syllabus)를 꼼꼼히 읽고, 평가 기준과 주요 과제를 명확히 파악하세요. 이를 바탕으로 학기 전체를 아우르는 스케줄을 세워 마감 기한을 놓치지 않도록 준비하는 것이 중요합니다. 수업 시간에는 적극적으로 참여하고, 이해가 부족한 부분은 즉시 교수님이나 조교에게 질문하여 해결하세요. 또한, 시험 대비를 위해 강의 노트를 꼼꼼히 정리하고, 중요 개념을 중심으로 반복 학습하는 습관을 들이세요. 그룹 스터디에 참여해 동료들과 토론하며 개념을 깊이 이해하는 것도 효과적입니다. 마지막으로, 충분한 휴식과 균형 잡힌 생활을 유지하며, 스트레스를 관리하는 것도 학업 성취에 큰 도움이 됩니다.",
  meta: {
    scholar: "예체능",
    tags: ["미술대학", "전공", "전공학점"],
  },
};
const commentsData = [
  {
    name: "이름름",
    scholar: "예체능",
    upload: "약 15시간 전",
    main: "안녕하세요 잘 봤어요!겨울의 끝자락에서 바람은 여전히 차갑지만, 어딘가 봄의 기척이 스며든다. 창가에 앉아 커피잔을 손에 쥐고 있으면, 햇살이 유리창을 넘어와 살며시 손등을 어루만진다. 시간은 멈춘 듯 흐르고, 공기 중엔 희미한 변화의 냄새가 돈다.",
    re: [
      {
        name: "이름름",
        scholar: "예체능",
        upload: "약 15시간 전",
        main: "안녕하세요 잘 봤어요",
      },
      {
        name: "아롱롱",
        scholar: "공학",
        upload: "약 15시간 전",
        main: "좋은 술과 저급한 웃음 꺼진 불 속 조용한 관음 내가 좋아하는 것들로만 주세요",
      },
    ],
  },
  {
    name: "이름름",
    scholar: "예체능",
    upload: "약 15시간 전",
    main: "나도 참 단순해요 까짓 게 싫다가도 다정해지고 미친 듯 울다가도",
    re: [
      {
        name: "이름름",
        scholar: "예체능",
        upload: "약 3시간 전",
        main: "잘 들었습니다!",
      },
    ],
  },
  {
    name: "이름름",
    scholar: "예체능",
    upload: "약 15시간 전",
    main: "나도 참 단순해요 까짓 게 싫다가도 다정해지고 미친 듯 울다가도",
  },
];
const answersData: AnswerI[] = [
  {
    name: "이름름",
    scholar: "예체능",
    upload: "2024.11.03",
    content: [
      {
        type: "text",
        content:
          "학점을 잘 받기 위해서는 체계적인 계획과 꾸준한 노력이 필요합니다. 먼저, 강의 초반에 수업 계획서(Syllabus)를 꼼꼼히 읽고, 평가 기준과 주요 과제를 명확히 파악하세요. 이를 바탕으로 학기 전체를 아우르는 스케줄을 세워 마감 기한을 놓치지 않도록 준비하는 것이 중요합니다. 수업 시간에는 적극적으로 참여하고, 이해가 부족한 부분은 즉시 교수님이나 조교에게 질문하여 해결하세요. 또한, 시험 대비를 위해 강의 노트를 꼼꼼히 정리하고, 중요 개념을 중심으로 반복 학습하는 습관을 들이세요. 그룹 스터디에 참여해 동료들과 토론하며 개념을 깊이 이해하는 것도 효과적입니다. 마지막으로, 충분한 휴식과 균형 잡힌 생활을 유지하며, 스트레스를 관리하는 것도 학업 성취에 큰 도움이 됩니다.",
      },
      {
        type: "image",
        src: "/assets/answerImg.jpeg",
        alt: "Placeholder image",
      },
      {
        type: "text",
        content:
          "학점을 잘 받기 위해서는 체계적인 계획과 꾸준한 노력이 필요합니다. 먼저, 강의 초반에 수업 계획서(Syllabus)를 꼼꼼히 읽고, 평가 기준과 주요 과제를 명확히 파악하세요. 이를 바탕으로 학기 전체를 아우르는 스케줄을 세워 마감 기한을 놓치지 않도록 준비하는 것이 중요합니다. 수업 시간에는 적극적으로 참여하고, 이해가 부족한 부분은 즉시 교수님이나 조교에게 질문하여 해결하세요. 또한, 시험 대비를 위해 강의 노트를 꼼꼼히 정리하고, 중요 개념을 중심으로 반복 학습하는 습관을 들이세요. 그룹 스터디에 참여해 동료들과 토론하며 개념을 깊이 이해하는 것도 효과적입니다. 마지막으로, 충분한 휴식과 균형 잡힌 생활을 유지하며, 스트레스를 관리하는 것도 학업 성취에 큰 도움이 됩니다.",
      },
      {
        type: "image",
        src: "/assets/answerImg.jpeg",
        alt: "Another placeholder image",
      },
      {
        type: "text",
        content: "긴 글 읽어주셔서 감사합니다.",
      },
    ],
    re: [
      {
        name: "이름름",
        scholar: "예체능",
        upload: "약 15시간 전",
        main: "안녕하세요 잘 봤어요!겨울의 끝자락에서 바람은 여전히 차갑지만, 어딘가 봄의 기척이 스며든다. 창가에 앉아 커피잔을 손에 쥐고 있으면, 햇살이 유리창을 넘어와 살며시 손등을 어루만진다. 시간은 멈춘 듯 흐르고, 공기 중엔 희미한 변화의 냄새가 돈다.",
        re: [
          {
            name: "이름름",
            scholar: "예체능",
            upload: "약 15시간 전",
            main: "안녕하세요 잘 봤어요",
          },
          {
            name: "아롱롱",
            scholar: "공학",
            upload: "약 15시간 전",
            main: "좋은 술과 저급한 웃음 꺼진 불 속 조용한 관음 내가 좋아하는 것들로만 주세요",
          },
        ],
      },
      {
        name: "이름름",
        scholar: "예체능",
        upload: "약 15시간 전",
        main: "나도 참 단순해요 까짓 게 싫다가도 다정해지고 미친 듯 울다가도",
        re: [
          {
            name: "이름름",
            scholar: "예체능",
            upload: "약 3시간 전",
            main: "잘 들었습니다!",
          },
        ],
      },
      {
        name: "이름름",
        scholar: "예체능",
        upload: "약 15시간 전",
        main: "나도 참 단순해요 까짓 게 싫다가도 다정해지고 미친 듯 울다가도",
      },
    ],
  },
  {
    name: "이름름",
    scholar: "예체능",
    upload: "2024.11.05",
    content: [
      {
        type: "text",
        content:
          "학점을 잘 받기 위해서는 체계적인 계획과 꾸준한 노력이 필요합니다. 먼저, 강의 초반에 수업 계획서(Syllabus)를 꼼꼼히 읽고, 평가 기준과 주요 과제를 명확히 파악하세요. 이를 바탕으로 학기 전체를 아우르는 스케줄을 세워 마감 기한을 놓치지 않도록 준비하는 것이 중요합니다. 수업 시간에는 적극적으로 참여하고, 이해가 부족한 부분은 즉시 교수님이나 조교에게 질문하여 해결하세요. 또한, 시험 대비를 위해 강의 노트를 꼼꼼히 정리하고, 중요 개념을 중심으로 반복 학습하는 습관을 들이세요. 그룹 스터디에 참여해 동료들과 토론하며 개념을 깊이 이해하는 것도 효과적입니다. 마지막으로, 충분한 휴식과 균형 잡힌 생활을 유지하며, 스트레스를 관리하는 것도 학업 성취에 큰 도움이 됩니다.",
      },
    ],
  },
];
interface AnswerContentI {
  type: "text" | "image";
  content?: string;
  src?: string;
  alt?: string;
}
interface AnswerI {
  name: string;
  scholar: string;
  upload: string;
  content: AnswerContentI[];
  re?: CommentsI[];
}
interface CommentI {
  name: string;
  scholar: string;
  upload: string;
  main: string;
}
interface CommentsI {
  name: string;
  scholar: string;
  upload: string;
  main: string;
  re?: CommentI[];
}

export default function Question() {
  const location = useLocation();
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [isAnswerCommentOpen, setIsAnswerCommentOpen] = useState<{
    [key: number]: boolean;
  }>({});
  const handleCommentBtnClick = () => {
    setIsCommentOpen(!isCommentOpen);
  };
  const handleAnswerCommentBtnClick = (index: number) => {
    setIsAnswerCommentOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const data = singleAPI.question({ id: location.state.id });
  console.log(data);

  return (
    <>
      <MainContent>
        <TitleContainer>{questionData.title}</TitleContainer>
        <WriterContainer>
          <WriterSVG></WriterSVG>
          {`${questionData.user.name} · ${questionData.user.scholar} · ${questionData.user.upload}`}
        </WriterContainer>
        <ContentContainer>{questionData.main}</ContentContainer>
        <InfoContainer>
          <Infos>
            <Info>{questionData.meta.scholar}</Info>
            {questionData.meta.tags &&
              questionData.meta.tags.map((item) => <Info>{item}</Info>)}
          </Infos>
          <CommentBtn onClick={handleCommentBtnClick}>
            {`댓글 ${commentsData.length || "0"}개`}
            {isCommentOpen ? (
              <FaChevronCircleDown color="#6129e9" />
            ) : (
              <FaChevronCircleUp color="#6129e9" />
            )}
          </CommentBtn>
        </InfoContainer>
      </MainContent>
      {isCommentOpen && <Comments commentsData={commentsData || []} />}
      <AnswersContainer>
        <AnswersCount>
          <PencilImg>
            <TbPencilCheck color="white" size={"8px"} fontWeight={700} />
          </PencilImg>
          {answersData.length == 0
            ? "작성된 답변이 없습니다."
            : `작성된 ${answersData.length}개의 답변`}
        </AnswersCount>
        {answersData &&
          answersData.map((answer, index) => (
            <React.Fragment key={index}>
              <Answer>
                <AnswerWriter>
                  <WriterSVG />
                  {`${answer.name} · ${answer.scholar} · ${answer.upload}`}
                </AnswerWriter>
                {answer.content.map((item, index) =>
                  item.type === "text" ? (
                    <AnswerText key={index}>{item.content}</AnswerText>
                  ) : (
                    <AnswerImg key={index} src={item.src} alt={item.alt} />
                  )
                )}
                <AnswerCommentBtn
                  onClick={() => handleAnswerCommentBtnClick(index)}
                >
                  {`댓글 ${answer.re?.length || "0"}개`}
                  {isAnswerCommentOpen[index] ? (
                    <FaChevronCircleDown color="#6129e9" />
                  ) : (
                    <FaChevronCircleUp color="#6129e9" />
                  )}
                </AnswerCommentBtn>
                {isAnswerCommentOpen[index] && (
                  <Comments commentsData={answer.re || []} />
                )}
              </Answer>
            </React.Fragment>
          ))}
      </AnswersContainer>
    </>
  );
}
