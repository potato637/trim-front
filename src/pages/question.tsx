import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Comments from "../components/comments";
import { TbPencilCheck } from "react-icons/tb";
import {
  FaChevronCircleUp,
  FaChevronCircleDown,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { postAPI, singleAPI } from "../apis/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QuestionI } from "../types/questionType";
import { formatDate } from "../utils";
import { BiLike } from "react-icons/bi";
import { useAuth } from "../context/auth_context";
import Markdowneditor from "../components/markdowneditor";

const MainContent = styled.div`
  width: 100%;
  border-bottom: 0.5px solid var(--color-comment-input);
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  padding-bottom: 20px;
`;
const TitleContainer = styled.div`
  font-size: var(--font-size-extra-medium);
  font-weight: 600;
`;
const WriterContainer = styled.div`
  font-size: var(--font-size-small);
  color: var(--color-purple-hover);
  display: flex;
  gap: 15px;
  align-items: center;
`;
const WriterSVG = styled.div`
  width: var(--font-size-user);
  height: var(--font-size-user);
  background: url("/assets/userSVG.svg") center/cover no-repeat;
`;
const ContentContainer = styled.div`
  width: 100%;
  padding: 20px 0;
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
  font-size: var(--font-size-small);
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 5px 20px;
    border-radius: 20px;
  }
`;
const Major = styled.div`
  background-color: var(--color-purple);
  color: var(--color-white);
`;
const Tag = styled.div`
  color: var(--color-gray);
  background-color: var(--color-mint-hash);
`;
const LikeAndComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;
const LikeRegIcon = styled(BiLike)`
  color: var(--color-like);
  cursor: pointer;
`;
const Like = styled.div`
  color: var(--color-like);
`;
const ScrapRegIcon = styled(FaRegBookmark)`
  color: var(--color-gray);
  cursor: pointer;
`;
const Scrap = styled.div`
  color: var(--color-gray);
`;
const CommentBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;
const AnswersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const NoAnswer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-small);
`;
const PencilImg = styled.div`
  background-color: var(--color-purple-hover);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
const AnswersCount = styled.div`
  display: flex;
  gap: 5px;
  justify-content: flex-start;
  align-items: center;
  font-size: var(--font-size-small);
  margin: 15px 0;
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
const CircleUp = styled(FaChevronCircleUp)`
  color: var(--color-purple-hover);
`;
const CircleDown = styled(FaChevronCircleDown)`
  color: var(--color-purple-hover);
`;
const Pencil = styled(TbPencilCheck)`
  font-size: var(--font-size-medium);
  color: var(--color-white);
`;
const AnswerBtn = styled.button`
  width: 100px;
  margin: 15px 0;
  background-color: var(--color-purple-hover);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
`;

export default function Question() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const { mutate: postAnswer } = useMutation({
    mutationFn: postAPI.question_answer,
    onSuccess: () => {
      setAnswer("");
      queryClient.invalidateQueries({
        queryKey: ["question", location.pathname.split("/")[2]],
      });
    },
  });
  const handleAnswerSubmit = () => {
    if (answer.trim() !== "") {
      postAnswer({ id: location.pathname.split("/")[2], content: answer });
    }
  };
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

  interface LikeI {
    isSuccess: boolean;
    code: number;
    message: string;
    result: number;
  }

  const { data: like, isLoading: like_loading } = useQuery<LikeI>({
    queryKey: ["like", location.pathname.split("/")[2]],
    queryFn: () => singleAPI.like({ id: location.pathname.split("/")[2] }),
  });

  const { mutate: postLike } = useMutation({
    mutationFn: () => postAPI.like({ id: location.pathname.split("/")[2] }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["like", location.pathname.split("/")[2]],
      });
    },
  });

  const handleLikeClick = () => {
    if (isLoggedIn) {
      try {
        postLike();
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/signin");
    }
  };

  const { data: question, isLoading: question_loading } = useQuery<QuestionI>({
    queryKey: ["question", location.pathname.split("/")[2]],
    queryFn: () => singleAPI.question({ id: location.pathname.split("/")[2] }),
  });
  const questionData = question?.result;
  const { data: comments, isLoading: comments_loading } = useQuery({
    queryKey: ["comments", location.pathname.split("/")[2]],
    queryFn: () => singleAPI.comment({ id: location.pathname.split("/")[2] }),
  });
  const commentsData = comments?.result;

  if (question_loading || comments_loading || like_loading) return null;

  const major = {
    ENGINEERING: "공학",
    EDUCATION: "교육",
    SOCIAL_SCIENCES: "사회",
    ARTS_PHYSICAL_EDUCATION: "예체능",
    MEDICINE_PHARMACY: "의약",
    HUMANITIES: "인문",
    NATURAL_SCIENCES: "자연",
    ETC: "기타",
  };

  return (
    <>
      <MainContent>
        <TitleContainer>{questionData?.questionResponse.title}</TitleContainer>
        <WriterContainer>
          <WriterSVG></WriterSVG>
          {`${questionData?.memberResponse.nickname} · ${
            major[
              questionData?.questionResponse.majorType as keyof typeof major
            ]
          } · ${formatDate(
            questionData?.questionResponse.createdAt as number
          )}`}
        </WriterContainer>
        <ContentContainer className="markdown-content">
          <Markdown remarkPlugins={[remarkGfm]}>
            {questionData?.questionResponse.content}
          </Markdown>
        </ContentContainer>
        <InfoContainer>
          <Infos>
            <Major>
              {
                major[
                  questionData?.questionResponse.majorType as keyof typeof major
                ]
              }
            </Major>
            {questionData?.tagList &&
              questionData?.tagList.map((item, index) => (
                <Tag key={index}>{`# ${item}`}</Tag>
              ))}
          </Infos>
          <LikeAndComment>
            <LikeRegIcon onClick={handleLikeClick} />
            <Like>{like?.result}</Like>
            <ScrapRegIcon />
            <Scrap></Scrap>
            <CommentBtn onClick={handleCommentBtnClick}>
              {`댓글 ${commentsData?.length}개`}
              {isCommentOpen ? <CircleUp /> : <CircleDown />}
            </CommentBtn>
          </LikeAndComment>
        </InfoContainer>
      </MainContent>
      {isCommentOpen && <Comments commentsData={commentsData || []} />}
      {questionData?.answerDetailResponseList.length === 0 ? (
        <NoAnswer>
          작성된 답변이 없습니다. 소중한 첫번째 답변을 남겨보세요!
        </NoAnswer>
      ) : (
        <AnswersContainer>
          <AnswersCount>
            <PencilImg>
              <Pencil />
            </PencilImg>
            <span>
              {`작성된 ${questionData?.answerDetailResponseList.length}개의 답변`}
            </span>
          </AnswersCount>
          {questionData?.answerDetailResponseList.map((answer, index) => (
            <React.Fragment key={index}>
              <Answer>
                <AnswerWriter>
                  <WriterSVG />
                  {/* {`${answer.memberResponse.nickname} · ${answer.memberResponse.scholar} · ${formatDate(answer.answerResponse.createdAt)}`} */}
                  {`${answer.memberResponse.nickname} · ${formatDate(
                    answer.answerResponse.createdAt
                  )}`}
                </AnswerWriter>
                <AnswerText className="markdown-content">
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {answer.answerResponse.content}
                  </Markdown>
                </AnswerText>
              </Answer>
            </React.Fragment>
          ))}
        </AnswersContainer>
      )}
      <div style={{ width: "100%", marginTop: "20px" }}></div>
      <Markdowneditor value={answer} onChange={setAnswer} />
      <AnswerBtn onClick={handleAnswerSubmit}>작성</AnswerBtn>
    </>
  );
}
