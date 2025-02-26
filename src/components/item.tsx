import React from "react";
import styled from "styled-components";
import { HomeDataStateI } from "../recoil/data";

const Container = styled.div`
  width: 100%;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--color-white);
  border-radius: 5px;
`;
const Info = styled.div`
  span {
    font-size: var(--font-size-small);
  }
`;
const Title = styled.div`
  overflow: hidden;
  span {
    font-size: var(--font-size-medium);
    color: var(--color-black);
    font-weight: 300;
  }
`;

export default function Item(item: HomeDataStateI) {
  const date = new Date(+item.createDate);
  const formattedDate = date.toISOString().split("T")[0];

  const category = {
    question: "질문게시판",
    community: "자유게시판",
    share: "지식공유",
    survey: "설문조사",
  };
  return (
    <Container>
      <Info>
        <span>{`${
          category[item.category as keyof typeof category]
        } ${formattedDate} ${item.view} ${item.comment}`}</span>
      </Info>
      <Title>
        <span>{item.title}</span>
      </Title>
    </Container>
  );
}
