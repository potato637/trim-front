import React from "react";
import Hot from "../components/hot";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { datasAPI, hotAPI } from "../api";
import { FreeTalkItemI } from "../types/communityType";
import styled from "styled-components";
import { BiLike } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import { formatDate } from "../utils";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 70px;
  padding: 10px 0;
  border-top: 0.3px solid var(--color-light-purple-border);
  cursor: pointer;
`;
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  font-size: var(--font-size-medium);
  color: var(--color-black);
`;
const MetaData = styled.div`
  display: flex;
  gap: 5px;
  font-size: var(--font-size-extra-small);
`;
const CreatedAt = styled.div`
  color: var(--color-date);
`;
const LikeIcon = styled(BiLike)`
  color: var(--color-like);
`;
const Like = styled.div`
  color: var(--color-like);
`;
const CommentIcon = styled(FaRegComments)`
  color: var(--color-comment);
`;
const Comment = styled.div`
  color: var(--color-comment);
`;
const Content = styled.div`
  font-size: var(--font-size-small);
`;
const LoadMoreButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: var(--color-purple);
  color: var(--color-white);
  font-size: var(--font-size-medium);
  cursor: pointer;
  border-radius: 20px;

  &:hover {
    background-color: var(--color-purple-hover);
  }
`;

export default function Communitytab() {
  const navigate = useNavigate();
  const { data: hot, isLoading: hot_isLoading } = useQuery({
    queryKey: ["community_hot"],
    queryFn: hotAPI.community_hot,
  });

  const {
    data: freeTalk,
    fetchNextPage,
    hasNextPage,
    isLoading: data_isLoading,
  } = useInfiniteQuery({
    queryKey: ["community"],
    queryFn: ({ pageParam = 0 }) =>
      datasAPI.community({ currentPage: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.result.page >= lastPage.result.totalPages
        ? undefined
        : lastPage.result.page + 1;
    },
  });
  const data = freeTalk?.pages
    .map((page) => page.result.freeTalkResponseList)
    .flat() as FreeTalkItemI[];

  const isLoading = hot_isLoading || data_isLoading;
  if (isLoading) return null;

  return (
    <>
      <Hot data={hot.result} category="자유게시판" />
      <Container>
        {data?.map((item, index) => (
          <Item
            key={index}
            onClick={() =>
              navigate(`/community/${item.freeTalkResponse.freeTalkId}`)
            }
          >
            <TopContainer>
              <Title>{item.freeTalkResponse.title}</Title>
              <MetaData>
                <CreatedAt>
                  {formatDate(item.freeTalkResponse.createdAt)}
                </CreatedAt>
                <LikeIcon />
                <Like>{item.likeCount}</Like>
                <CommentIcon />
                <Comment>{item.commentCount}</Comment>
              </MetaData>
            </TopContainer>
            <Content>{item.freeTalkResponse.content}</Content>
          </Item>
        ))}
      </Container>
      {hasNextPage && (
        <LoadMoreButton onClick={() => fetchNextPage()}>
          Show More
        </LoadMoreButton>
      )}
    </>
  );
}
