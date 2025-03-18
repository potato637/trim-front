import styled from "styled-components";
import Comments from "../components/comments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { postAPI, singleAPI } from "../api";
import { FreeTalkI } from "../types/communityType";
import { formatDate } from "../utils";
import { BiLike, BiSolidLike } from "react-icons/bi";

const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
  padding-bottom: 20px;
  border-bottom: 0.5px solid var(--color-border);
`;
const TitleContainer = styled.div`
  font-size: var(--font-size-extra-medium);
  font-weight: 600;
`;
const WriterContainer = styled.div`
  font-size: var(--font-size-small);
  color: var(--color-purple-hover);
  display: flex;
  gap: 7px;
  align-items: center;
`;
const WriterSVG = styled.div`
  width: var(--font-size-user);
  height: var(--font-size-user);
  background: url("/assets/userSVG.svg") center/cover no-repeat;
`;
const CommunityText = styled.p`
  font-size: var(--font-size-medium);
  line-height: 1.6;
  white-space: pre-line;
`;
const LikeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: var(--font-size-small);
  gap: 7px;
  padding-right: 20px;
`;
const LikeRegIcon = styled(BiLike)`
  color: var(--color-like);
`;
const Like = styled.div`
  color: var(--color-like);
`;

export default function Community() {
  const queryClient = useQueryClient();
  const location = useLocation();

  interface LikeI {
    isSuccess: boolean;
    code: number;
    message: string;
    result: number;
  }
  const { data: like, isLoading: like_loading } = useQuery<LikeI>({
    queryKey: ["like", location.state.id],
    queryFn: () => singleAPI.like({ id: location.state.id }),
  });
  const { mutate: postLike } = useMutation({
    mutationFn: () => postAPI.like({ id: location.state.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["like", location.state.id] });
    },
  });
  const handleLikeClick = () => {
    try {
      postLike();
    } catch (error) {
      console.error(error);
    }
  };

  const { data: community, isLoading: community_loading } = useQuery<FreeTalkI>(
    {
      queryKey: ["community", location.state.id],
      queryFn: () => singleAPI.community({ id: location.state.id }),
    }
  );
  const communityData = community?.result;
  const { data: comments, isLoading: comments_loading } = useQuery({
    queryKey: ["comments", location.state.id],
    queryFn: () => singleAPI.comment({ id: location.state.id }),
  });
  const commentsData = comments?.result;

  if (community_loading || comments_loading || like_loading) return null;

  return (
    <>
      <MainContent>
        <TitleContainer>{communityData?.freeTalkResponse.title}</TitleContainer>
        <WriterContainer>
          <WriterSVG />
          {`${communityData?.memberResponse.nickname} · ${formatDate(
            communityData?.freeTalkResponse.createdAt as number
          )}`}
        </WriterContainer>
        <CommunityText>{communityData?.freeTalkResponse.content}</CommunityText>
        <LikeContainer>
          <LikeRegIcon onClick={handleLikeClick} />
          <Like>{like?.result}</Like>
        </LikeContainer>
      </MainContent>
      <Comments commentsData={commentsData} />
    </>
  );
}
