import React, { useState } from "react";
import Hot from "../components/hot";
import Searchwithtag from "../components/searchwithtag";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { datasAPI, hotAPI } from "../api";
import Tabswiper from "../components/tabswiper";
import { QuestionItemI } from "../types/questionType";

export default function Questiontab() {
  const [majorType, setMajorType] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const { data: hot, isLoading: hot_isLoading } = useQuery({
    queryKey: ["question_hot"],
    queryFn: hotAPI.question_hot,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: data_isLoading,
  } = useInfiniteQuery({
    queryKey: ["question"],
    queryFn: ({ pageParam = 0 }) =>
      datasAPI.question({ currentPage: pageParam }),
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
      <Hot data={hot.result} category="질문게시판" />
      <Searchwithtag
        setMajorType={setMajorType}
        tags={tags}
        setTags={setTags}
      />
      <Tabswiper
        type="question"
        data={
          data?.pages
            .map((page) => page.result.questionResponseList)
            .flat() as QuestionItemI[]
        }
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
