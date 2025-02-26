import React from "react";
import Hot from "../components/hot";
import { useInfiniteQuery } from "@tanstack/react-query";
import { datasAPI } from "../api";
import Tabswiper from "../components/tabswiper";
import { FreeTalkItemI } from "../types/communityType";

export default function Communitytab() {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
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

  if (isLoading) return null;

  return (
    <>
      <Hot />
      <Tabswiper
        data={
          data?.pages
            .map((page) => page.result.freeTalkResponseList)
            .flat() as FreeTalkItemI[]
        }
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
