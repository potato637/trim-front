import React from "react";
import styled from "styled-components";
import { QuestionItemI } from "../types/questionType";
import { KnowledgeItemI } from "../types/knowledgeType";
import { FreeTalkItemI } from "../types/communityType";

const Container = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 20px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const ItemBox = styled.div`
  background: #f0f0f0;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  font-size: var(--font-size-medium);
`;
const LoadMoreButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function Tabswiper({
  data,
  fetchNextPage,
  hasNextPage,
}: {
  data: QuestionItemI[] | KnowledgeItemI[] | FreeTalkItemI[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
}) {
  return (
    <Container>
      <GridContainer>
        {data.map((item) => (
          <ItemBox>{Object.values(item)[0].title}</ItemBox>
        ))}
      </GridContainer>
      {hasNextPage && (
        <LoadMoreButton onClick={fetchNextPage}>Load More</LoadMoreButton>
      )}
    </Container>
  );
}
