import styled from "styled-components";
import userSVG from "../assets/userSVG.svg";
import React, { useState } from "react";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";

const CommentSection = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;
const NumberOfComments = styled.div`
  font-size: 0.5rem;
  margin-bottom: 10px;
`;
const WritingCommentContainer = styled.div`
  margin-bottom: 10px;
  & > form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    & > input[type="text"] {
      box-sizing: border-box;
      width: 100%;
      min-height: 30px;
      border: 0.5px solid #cbcdd6;
      border-radius: 4px;
      display: flex;
      padding: 5px 10px;
      align-items: flex-start;
      font-size: 0.5rem;
      color: black;
      background-color: #fbfbfb;
      &:focus {
        outline: none;
        box-shadow: none;
        border: 0.75px solid #5c37ff;
      }
      &::placeholder {
        color: #8d8e94;
      }
    }
    & > input[type="submit"] {
      display: flex;
      padding: 5px 8px;
      justify-content: center;
      align-items: center;
      width: 70px;
      font-size: 0.4rem;
      color: white;
      background-color: #6129e9;
      border-radius: 10px;
      border: none;
      box-shadow: 0px 2px 4px 0px rgba(43, 39, 53, 0.15);
    }
  }
`;
const WritingReCommentContainer = styled.div`
  width: 92%;
  & > form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    & > input[type="text"] {
      box-sizing: border-box;
      width: 100%;
      min-height: 30px;
      border: 0.5px solid #cbcdd6;
      border-radius: 4px;
      display: flex;
      padding: 5px 10px;
      align-items: flex-start;
      font-size: 0.5rem;
      color: black;
      background-color: #fbfbfb;
      &:focus {
        outline: none;
        box-shadow: none;
        border: 0.75px solid #5c37ff;
      }
      &::placeholder {
        color: #8d8e94;
      }
    }
    & > input[type="submit"] {
      display: flex;
      padding: 5px 8px;
      justify-content: center;
      align-items: center;
      width: 70px;
      font-size: 0.4rem;
      color: white;
      background-color: #6129e9;
      border-radius: 10px;
      border: none;
      box-shadow: 0px 2px 4px 0px rgba(43, 39, 53, 0.15);
    }
  }
`;
const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
`;
const Comment = styled.div`
  width: 100%;
  display: flex;
`;
const User = styled.div`
  position: relative;
  width: 8%;
`;
const UserImg = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  background: url(${userSVG}) center/cover no-repeat;
`;
const Content = styled.div`
  width: 92%;
  background-color: #f5f3ff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  gap: 10px;
`;
const CommentInfo = styled.div`
  font-size: 0.4rem;
  color: #37009c;
`;
const CommentMain = styled.div`
  font-size: 0.5rem;
  line-height: 0.65rem;
  font-weight: 400;
`;
const CommentBtns = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  font-size: 0.4rem;
  color: #65686d;
  & > div:hover {
    cursor: pointer;
  }
`;
const WriteReComment = styled.div``;
const SeeReComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;
const ReComment = styled.div`
  width: 92%;
  display: flex;
`;
const ReContent = styled.div`
  flex: 13;
  background-color: #f5f3ff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  gap: 10px;
`;
const ReUser = styled.div`
  position: relative;
  flex: 1;
`;
const ReUserImg = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  right: 0;
  background: url(${userSVG}) center/cover no-repeat;
`;

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
interface CommentsProps {
  commentsData: CommentsI[];
}

export default function Comments({ commentsData }: CommentsProps) {
  const [seeReComment, setSeeReComment] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [writeReComment, setWriteReComment] = useState<{
    [key: number]: boolean;
  }>({});
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return null;
  };
  const handleSeeReCommentClick = (index: number) => {
    setSeeReComment((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const handleWriteReCommentClick = (index: number) => {
    setWriteReComment((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  const handleReSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return null;
  };

  return (
    <CommentSection>
      <NumberOfComments>{`댓글 ${commentsData.length}개`}</NumberOfComments>
      <WritingCommentContainer>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="댓글 작성하기"></input>
          <input type="submit" value="댓글 작성하기" />
        </form>
      </WritingCommentContainer>
      <CommentsContainer>
        {commentsData &&
          commentsData.map((comment, index) => (
            <React.Fragment key={index}>
              <Comment>
                <User>
                  <UserImg />
                </User>
                <Content>
                  <CommentInfo>{`${comment.name} · ${comment.scholar} · ${comment.upload}`}</CommentInfo>
                  <CommentMain>{comment.main}</CommentMain>
                  <CommentBtns>
                    <WriteReComment
                      onClick={() => handleWriteReCommentClick(index)}
                    >
                      댓글 쓰기
                    </WriteReComment>
                    <SeeReComment
                      onClick={() => handleSeeReCommentClick(index)}
                    >
                      {`댓글 ${comment.re?.length || "0"}개`}
                      {seeReComment[index] ? (
                        <FaChevronCircleDown color="#6129e9" />
                      ) : (
                        <FaChevronCircleUp color="#6129e9" />
                      )}
                    </SeeReComment>
                  </CommentBtns>
                </Content>
              </Comment>
              {writeReComment[index] && (
                <WritingReCommentContainer>
                  <form onSubmit={handleReSubmit}>
                    <input type="text" placeholder="댓글 작성하기"></input>
                    <input type="submit" value="댓글 작성하기" />
                  </form>
                </WritingReCommentContainer>
              )}
              {seeReComment[index] &&
                comment.re?.map((reComment, reIndex) => (
                  <ReComment key={reIndex}>
                    <ReContent>
                      <CommentInfo>{`${reComment.name} · ${reComment.scholar} · ${reComment.upload}`}</CommentInfo>
                      <CommentMain>{reComment.main}</CommentMain>
                    </ReContent>
                    <ReUser>
                      <ReUserImg />
                    </ReUser>
                  </ReComment>
                ))}
            </React.Fragment>
          ))}
      </CommentsContainer>
    </CommentSection>
  );
}
