import React from "react";
import Hot from "../components/hot";
import Searchwithtag from "../components/searchwithtag";
import { useInfiniteQuery } from "@tanstack/react-query";
import { datasAPI } from "../api";
import Tabswiper from "../components/tabswiper";
import { QuestionItemI } from "../types/questionType";

export default function Questiontab() {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
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

  if (isLoading) return null;

  return (
    <>
      <Hot />
      <Searchwithtag />
      <Tabswiper
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
