import React, { useState } from "react";
import styled from "styled-components";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Comments from "../components/comments";
import {
  FaChevronCircleUp,
  FaChevronCircleDown,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postAPI, singleAPI } from "../apis/api";
import { KnowledgeI } from "../types/knowledgeType";
import { formatDate } from "../utils";
import { GoDotFill } from "react-icons/go";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useAuth } from "../context/auth_context";

const MainContent = styled.div`
  width: 100%;
  border-bottom: 0.5px solid var(--color-comment-input);
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;
`;
const Infos = styled.div`
  display: flex;
  justify-content: flex-start;
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
const TitleContainer = styled.div`
  font-size: var(--font-size-extra-medium);
  font-weight: 600;
`;
const WriterContainer = styled.div`
  font-size: var(--font-size-small);
  color: var(--color-purple-hover);
  display: flex;
  gap: 10px;
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
const About = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 40px;
  gap: 20px;
  border-top: 0.5px solid var(--color-comment-input);
`;
const User = styled.div`
  display: flex;
  gap: 30px;
`;
const UserImg = styled.div`
  width: var(--font-size-knowledge-user);
  height: var(--font-size-knowledge-user);
  background: url("/assets/userSVG.svg") center/cover no-repeat;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;
const Dot = styled(GoDotFill)`
  color: var(--color-purple-hover);
`;
const UserName = styled.div`
  font-size: var(--font-size-extra-medium);
  font-weight: 600;
`;
const UserEmail = styled.div`
  font-size: var(--font-size-small);
  color: var(--color-date);
  display: flex;
  align-items: center;
`;
const Introducing = styled.div`
  font-size: var(--font-size-small);
  color: var(--color-date);
`;
const LikeAndComments = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 7px;
  font-size: var(--font-size-small);
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
  gap: 7px;
  cursor: pointer;
`;
const CircleUp = styled(FaChevronCircleUp)`
  color: var(--color-purple-hover);
`;
const CircleDown = styled(FaChevronCircleDown)`
  color: var(--color-purple-hover);
`;

export default function Share() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);

  const handleCommentBtnClick = () => {
    setIsCommentOpen((prev) => !prev);
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

  const { data: knowledge, isLoading: knowledge_loading } =
    useQuery<KnowledgeI>({
      queryKey: ["knowledge", location.pathname.split("/")[2]],
      queryFn: () =>
        singleAPI.knowledge({ id: location.pathname.split("/")[2] }),
    });
  const knowledgeData = knowledge?.result;
  const { data: comments, isLoading: comments_loading } = useQuery({
    queryKey: ["comments", location.pathname.split("/")[2]],
    queryFn: () => singleAPI.comment({ id: location.pathname.split("/")[2] }),
  });
  const commentsData = comments?.result;

  if (knowledge_loading || comments_loading || like_loading) return null;

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
        <TitleContainer>
          {knowledgeData?.knowledgeResponse.title}
        </TitleContainer>
        <Infos>
          <Major>
            {
              major[
                knowledgeData?.knowledgeResponse.majorType as keyof typeof major
              ]
            }
          </Major>
          {knowledgeData?.tags &&
            knowledgeData?.tags.map((item, index) => (
              <Tag key={index}>{`# ${item}`}</Tag>
            ))}
        </Infos>
        <WriterContainer>
          <WriterSVG />
          {`${knowledgeData?.memberResponse.nickname} · ${
            major[
              knowledgeData?.knowledgeResponse.majorType as keyof typeof major
            ]
          } · ${formatDate(
            knowledgeData?.knowledgeResponse.createdAt as number
          )}`}
        </WriterContainer>
        <ContentContainer className="markdown-content">
          <Markdown remarkPlugins={[remarkGfm]}>
            {knowledgeData?.knowledgeResponse.content}
          </Markdown>
        </ContentContainer>
        <About>
          <User>
            <UserImg />
            <UserInfo>
              <UserName>{knowledgeData?.memberResponse.nickname}</UserName>
              <UserEmail>
                <Dot />
                {knowledgeData?.memberResponse.email}
              </UserEmail>
              <Introducing>{knowledgeData?.memberResponse.role}</Introducing>
            </UserInfo>
          </User>
          <LikeAndComments>
            <LikeRegIcon onClick={handleLikeClick} />
            <Like>{like?.result}</Like>
            <ScrapRegIcon />
            <Scrap></Scrap>
            <CommentBtn onClick={handleCommentBtnClick}>
              {`댓글 ${knowledgeData?.commentResponses.length}개`}
              {isCommentOpen ? <CircleDown /> : <CircleUp />}
            </CommentBtn>
          </LikeAndComments>
        </About>
      </MainContent>
      {isCommentOpen && <Comments commentsData={commentsData || []} />}
    </>
  );
}
