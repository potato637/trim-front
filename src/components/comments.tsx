import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAPI } from "../apis/api";
import { useLocation } from "react-router-dom";
import { CommentI } from "../types/commentType";
import { formatDate } from "../utils";

const CommentSection = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
const NumberOfComments = styled.div`
  font-size: var(--font-size-small);
  margin-bottom: 20px;
`;
const WritingCommentContainer = styled.div`
  margin-bottom: 20px;
  & > form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
    & > input[type="text"] {
      box-sizing: border-box;
      width: 100%;
      min-height: 50px;
      border: 0.5px solid var(--color-comment-input);
      border-radius: 4px;
      display: flex;
      padding: 5px 10px;
      align-items: flex-start;
      font-size: var(--font-size-small);
      color: var(--color-black);
      background-color: var(--color-white-gray);
      &:focus {
        outline: none;
        box-shadow: none;
        border: 0.75px solid var(--color-comment-input-hover);
      }
      &::placeholder {
        color: var(--color-input-placeholder);
      }
    }
    & > input[type="submit"] {
      display: flex;
      padding: 5px 8px;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 30px;
      border-radius: 20px;
      font-size: var(--font-size-small);
      color: var(--color-white);
      background-color: var(--color-purple-hover);
      border: none;
      box-shadow: 0px 2px 4px 0px var(--color-input-shadow);
    }
  }
`;
const WritingReCommentContainer = styled.div`
  width: 95%;
  & > form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    & > input[type="text"] {
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      border: 0.5px solid var(--color-comment-input);
      border-radius: 4px;
      display: flex;
      padding: 5px 10px;
      align-items: flex-start;
      font-size: var(--font-size-small);
      color: var(--color-black);
      background-color: var(--color-white-gray);
      &:focus {
        outline: none;
        box-shadow: none;
        border: 0.75px solid var(--color-comment-input-hover);
      }
      &::placeholder {
        color: var(--color-input-placeholder);
      }
    }
    & > input[type="submit"] {
      display: flex;
      padding: 5px 8px;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 30px;
      border-radius: 20px;
      font-size: var(--font-size-small);
      color: var(--color-white);
      background-color: var(--color-purple-hover);
      border: none;
      box-shadow: 0px 2px 4px 0px var(--color-input-shadow);
    }
  }
`;
const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
`;
const Comment = styled.div`
  width: 100%;
  display: flex;
`;
const User = styled.div`
  position: relative;
  width: 5%;
`;
const UserImg = styled.div`
  width: var(--font-size-user);
  height: var(--font-size-user);
  position: absolute;
  top: 0;
  left: 0;
  background: url(/assets/userSVG.svg) center/cover no-repeat;
`;
const Content = styled.div`
  width: 95%;
  background-color: var(--color-light-purple);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  gap: 10px;
`;
const CommentInfo = styled.div`
  font-size: var(--font-size-small);
  color: var(--color-purple);
`;
const CommentMain = styled.div`
  font-size: var(--font-size-small);
  line-height: var(--font-size-medium);
  font-weight: 400;
`;
const CommentBtns = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  font-size: var(--font-size-small);
  color: var(--color-date);
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
  background: url("/assets/userSVG.svg") center/cover no-repeat;
`;
const CircleUp = styled(FaChevronCircleUp)`
  color: var(--color-purple-hover);
`;
const CircleDown = styled(FaChevronCircleDown)`
  color: var(--color-purple-hover);
`;

export default function Comments({
  commentsData,
}: {
  commentsData: CommentI[];
}) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const [seeReComment, setSeeReComment] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [writeReComment, setWriteReComment] = useState<{
    [key: number]: boolean;
  }>({});
  const [value, setValue] = useState<string>("");

  const { mutate: postComment } = useMutation({
    mutationFn: () =>
      postAPI.comment({ id: location.state.id, content: value }),
    onSuccess: () => {
      setValue("");
      queryClient.invalidateQueries({
        queryKey: ["comments", location.state.id],
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value !== "") {
      try {
        postComment();
      } catch (error) {
        console.error(error);
      }
    }
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <CommentSection>
      <NumberOfComments>{`댓글 ${commentsData.length}개`}</NumberOfComments>
      <WritingCommentContainer>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(event) => handleInputChange(event)}
            value={value}
            type="text"
            placeholder="댓글 작성하기"
          ></input>
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
                  {/* createdAt 넣어야함 */}
                  <CommentInfo>{`${comment.memberResponse.nickname} ·`}</CommentInfo>
                  <CommentMain>{comment.commentResponse.content}</CommentMain>
                  <CommentBtns>
                    <WriteReComment
                      onClick={() => handleWriteReCommentClick(index)}
                    >
                      댓글 쓰기
                    </WriteReComment>
                    <SeeReComment
                      onClick={() => handleSeeReCommentClick(index)}
                    >
                      {/* {`댓글 ${comment.re?.length || "0"}개`}
                      {seeReComment[index] ? (
                        <CircleUp />
                      ) : (
                        <CircleDown />
                      )} */}
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
              {/* {seeReComment[index] &&
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
                ))} */}
            </React.Fragment>
          ))}
      </CommentsContainer>
    </CommentSection>
  );
}
