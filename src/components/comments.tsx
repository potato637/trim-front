import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { postAPI, singleAPI } from "../apis/api";
import { countMission } from "../apis/profileAPI";
import { useLocation } from "react-router-dom";
import {
  CommentI,
  ReCommentI,
  ReResultI,
  AvatarResponseI,
} from "../types/commentType";
import { formatDate } from "../utils";

const CommentSection = styled.div`
  width: 100%;
  margin-top: 20px;
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
const Avatar = styled.div`
  position: relative;
  width: var(--font-size-user);
  height: var(--font-size-user);
  background-color: var(--color-purple);
  border-radius: 50%;
  overflow: hidden;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
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
  & > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    font-size: var(--font-size-small);
    color: var(--color-date);
  }
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
  background-color: var(--color-bg-light);
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
  width: var(--font-size-user);
  height: var(--font-size-user);
  top: 0;
  right: 0;
  background: url("/assets/userSVG.svg") center/cover no-repeat;
`;
const ReAvatar = styled.div`
  position: absolute;
  width: var(--font-size-user);
  height: var(--font-size-user);
  top: 0;
  right: 0;
  background-color: var(--color-purple);
  border-radius: 50%;
  overflow: hidden;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
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
        queryKey: ["comments", String(location.state.id)],
      });
      countMission({ mission: "WRITE_COMMENT" });
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value !== "") {
      try {
        postComment();
        console.log(value);
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
    setWriteReComment((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const reCommentQueries = useQueries({
    queries: commentsData.map((comment, index) => ({
      queryKey: ["reComments", comment.commentResponse.commentId],
      queryFn: () =>
        singleAPI.reComment({ id: comment.commentResponse.commentId }),
      enabled: !!seeReComment[index],
    })),
  });
  const [reCommentText, setReCommentText] = useState<{ [key: number]: string }>(
    {}
  );
  const handleReChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setReCommentText((prev) => ({ ...prev, [index]: e.target.value }));
  };
  const { mutate: postReComment } = useMutation({
    mutationFn: postAPI.reComment,
    onSuccess: (_, variables) => {
      const index = commentsData.findIndex(
        (comment) => comment.commentResponse.commentId === variables.id
      );
      setReCommentText((prev) => ({ ...prev, [index]: "" }));
      queryClient.invalidateQueries({
        queryKey: ["reComments"], // 나중에 해당 reComments만 수정되도록 변경
      });
      // 미션 카운트 증가 (대댓글도 댓글로 카운트)
      countMission({ mission: "WRITE_COMMENT" });
    },
  });
  const handleReSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    index: number
  ) => {
    e.preventDefault();
    if (reCommentText[index]?.trim() !== "") {
      postReComment({
        id: commentsData[index].commentResponse.commentId,
        content: reCommentText[index],
      });
    }
    return null;
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
                  {comment.storedAvatarResponse ? (
                    <Avatar>
                      <img src="/assets/avatar/face.svg" alt="Face" />
                      <img
                        src={comment.storedAvatarResponse.hairForURL}
                        alt="Hair"
                      />
                      <img
                        src={comment.storedAvatarResponse.eyesForURL}
                        alt="Eyes"
                      />
                      <img
                        src={comment.storedAvatarResponse.mouthForURL}
                        alt="Mouth"
                      />
                      <img
                        src={comment.storedAvatarResponse.clothForURL}
                        alt="Cloth"
                      />
                    </Avatar>
                  ) : (
                    <UserImg />
                  )}
                </User>
                <Content>
                  {/* createdAt 넣어야함 */}
                  <CommentInfo>{`${comment.memberResponse.nickname} ·`}</CommentInfo>
                  <CommentMain>{comment.commentResponse.content}</CommentMain>
                  <CommentBtns>
                    <div onClick={() => handleSeeReCommentClick(index)}>
                      <WriteReComment>대댓글 쓰기</WriteReComment>
                      <SeeReComment>
                        {seeReComment[index] ? <CircleUp /> : <CircleDown />}
                      </SeeReComment>
                    </div>
                  </CommentBtns>
                </Content>
              </Comment>
              {writeReComment[index] && (
                <WritingReCommentContainer>
                  <form onSubmit={(e) => handleReSubmit(e, index)}>
                    <input
                      value={reCommentText[index] || ""}
                      onChange={(e) => handleReChange(e, index)}
                      type="text"
                      placeholder="대댓글 작성하기"
                    ></input>
                    <input type="submit" value="대댓글 작성하기" />
                  </form>
                </WritingReCommentContainer>
              )}
              {seeReComment[index] &&
                reCommentQueries[index]?.data?.result?.map(
                  (reComment: ReResultI, idx: number) => (
                    <ReComment key={index}>
                      <ReContent>
                        <CommentInfo>{`${
                          reComment.memberResponse.nickname
                        } · ${formatDate(
                          reComment.replyResponse.createdAt
                        )}`}</CommentInfo>
                        <CommentMain>
                          {reComment.replyResponse.content}
                        </CommentMain>
                      </ReContent>
                      <ReUser>
                        {reComment.storedAvatarResponse ? (
                          <ReAvatar>
                            <img src="/assets/avatar/face.svg" alt="Face" />
                            <img
                              src={reComment.storedAvatarResponse.hairForURL}
                              alt="Hair"
                            />
                            <img
                              src={reComment.storedAvatarResponse.eyesForURL}
                              alt="Eyes"
                            />
                            <img
                              src={reComment.storedAvatarResponse.mouthForURL}
                              alt="Mouth"
                            />
                            <img
                              src={reComment.storedAvatarResponse.clothForURL}
                              alt="Cloth"
                            />
                          </ReAvatar>
                        ) : (
                          <ReUserImg />
                        )}
                      </ReUser>
                    </ReComment>
                  )
                )}
            </React.Fragment>
          ))}
      </CommentsContainer>
    </CommentSection>
  );
}
