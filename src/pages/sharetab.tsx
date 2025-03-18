import React, { useState } from "react";
import Hot from "../components/hot";
import Searchwithtag from "../components/searchwithtag";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { datasAPI, hotAPI } from "../api";
import Tabswiper from "../components/tabswiper";
import { KnowledgeItemI } from "../types/knowledgeType";

export default function Sharetab() {
  const queryClient = useQueryClient();
  const [majorType, setMajorType] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<{
    majorType: string;
    tags: string[];
  }>({
    majorType: "",
    tags: [],
  });

  const { data: hot, isLoading: hot_isLoading } = useQuery({
    queryKey: ["question_hot"],
    queryFn: hotAPI.knowledge_hot,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: data_isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["knowledges", searchParams.majorType, searchParams.tags],
    queryFn: ({ pageParam = 0 }) =>
      datasAPI.knowledge({ currentPage: pageParam, ...searchParams }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.result.page + 1;
      return nextPage < lastPage.result.totalPages ? nextPage : undefined;
    },
  });

  const handleTagSearch = () => {
    setSearchParams({ majorType, tags });
    queryClient.invalidateQueries({ queryKey: ["knowledges"] });
  };

  const isLoading = hot_isLoading || data_isLoading;
  if (isLoading) return null;

  const options = [
    { value: "", label: "전체" },
    { value: "engineering", label: "공학" },
    { value: "education", label: "교육" },
    { value: "social-sciences", label: "사회" },
    { value: "arts-physical-education", label: "예체능" },
    { value: "medicine-pharmacy", label: "의약" },
    { value: "humanities", label: "인문" },
    { value: "natural-sciences", label: "자연" },
    { value: "etc", label: "기타" },
  ];

  return (
    <>
      <Hot data={hot.result} category="지식공유" />
      <Searchwithtag
        majorType={majorType}
        setMajorType={setMajorType}
        tags={tags}
        setTags={setTags}
        handleTagSearch={handleTagSearch}
        options={options}
      />
      <Tabswiper
        isFetchingNextPage={isFetchingNextPage}
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
