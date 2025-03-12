import React from "react";
import styled from "styled-components";
import { QuestionItemI } from "../types/questionType";
import { KnowledgeItemI } from "../types/knowledgeType";
import Questionitem from "./questionitem";
import Knowledgeitem from "./knowledgeitem";

const Container = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 20px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
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

export default function Tabswiper({
  type,
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  type: "question" | "knowledge";
  data: QuestionItemI[] | KnowledgeItemI[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) {
  return (
    <Container>
      <GridContainer>
        {type === "question"
          ? data.map((item, index) => (
              <Questionitem key={index} data={item as QuestionItemI} />
            ))
          : data.map((item, index) => (
              <Knowledgeitem key={index} data={item as KnowledgeItemI} />
            ))}
      </GridContainer>
      {hasNextPage && (
        <LoadMoreButton onClick={fetchNextPage} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Show More"}
        </LoadMoreButton>
      )}
    </Container>
  );
}
