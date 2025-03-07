import React, { useState } from "react";
import Hot from "../components/hot";
import Searchwithtag from "../components/searchwithtag";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { datasAPI, hotAPI } from "../api";
import Tabswiper from "../components/tabswiper";
import { KnowledgeItemI } from "../types/knowledgeType";

export default function Sharetab() {
  const [majorType, setMajorType] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const { data: hot, isLoading: hot_isLoading } = useQuery({
    queryKey: ["question_hot"],
    queryFn: hotAPI.knowledge_hot,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: data_isLoading,
  } = useInfiniteQuery({
    queryKey: ["knowledge"],
    queryFn: ({ pageParam = 0 }) =>
      datasAPI.knowledge({ currentPage: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.result.page >= lastPage.result.totalPages
        ? undefined
        : lastPage.result.page + 1;
    },
  });

  const isLoading = hot_isLoading || data_isLoading;
  if (isLoading) return null;

  return (
    <>
      <Hot data={hot.result} category="지식공유" />
      <Searchwithtag
        setMajorType={setMajorType}
        tags={tags}
        setTags={setTags}
      />
      <Tabswiper
        type="knowledge"
        data={
          data?.pages
            .map((page) => page.result.knowledgeResponseList)
            .flat() as KnowledgeItemI[]
        }
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
