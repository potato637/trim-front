import React from "react";
import Hot from "../components/hot";
import Searchwithtag from "../components/searchwithtag";
import { useInfiniteQuery } from "@tanstack/react-query";
import { datasAPI } from "../api";
import Tabswiper from "../components/tabswiper";

export default function Questiontab() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["question"],
    queryFn: ({ pageParam = 0 }) =>
      datasAPI.question({ currentPage: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.page >= lastPage.totalPage
        ? undefined
        : lastPage.page + 1;
    },
  });

  return (
    <>
      <Hot />
      <Searchwithtag />
      <Tabswiper
        data={data?.pages.flatMap((page) => page.results) ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
