import React from "react";
import Hot from "../components/hot";
import { useInfiniteQuery } from "@tanstack/react-query";
import { datasAPI } from "../api";
import Tabswiper from "../components/tabswiper";

export default function Communitytab() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["community"],
    queryFn: ({ pageParam = 0 }) =>
      datasAPI.community({ currentPage: pageParam }),
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
      <Tabswiper
        data={data?.pages.flatMap((page) => page.results) ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
