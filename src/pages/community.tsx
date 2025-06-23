import React from "react";
import styled from "styled-components";
import Comments from "../components/comments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { postAPI, singleAPI } from "../apis/api";
import { FreeTalkI } from "../types/communityType";
import { formatDate } from "../utils";
import { BiLike } from "react-icons/bi";
import { useAuth } from "../context/auth_context";

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
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

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

  const { data: community, isLoading: community_loading } = useQuery<FreeTalkI>(
    {
      queryKey: ["community", location.pathname.split("/")[2]],
      queryFn: () =>
        singleAPI.community({ id: location.pathname.split("/")[2] }),
    }
  );
  const communityData = community?.result;
  const { data: comments, isLoading: comments_loading } = useQuery({
    queryKey: ["comments", location.pathname.split("/")[2]],
    queryFn: () => singleAPI.comment({ id: location.pathname.split("/")[2] }),
  });
  const commentsData = comments?.result;

  if (community_loading || comments_loading || like_loading) return null;

  return (
    <>
      <MainContent>
        <TitleContainer>{communityData?.freeTalkResponse.title}</TitleContainer>
        <WriterContainer>
          <Avatar>
            <img src="/assets/avatar/face.svg" alt="Face" />
            <img
              src={communityData?.storedAvatarResponse.hairForURL}
              alt="Hair"
            />
            <img
              src={communityData?.storedAvatarResponse.eyesForURL}
              alt="Eyes"
            />
            <img
              src={communityData?.storedAvatarResponse.mouthForURL}
              alt="Mouth"
            />
            <img
              src={communityData?.storedAvatarResponse.clothForURL}
              alt="Cloth"
            />
          </Avatar>
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
      <Comments commentsData={commentsData || []} />
    </>
  );
}
