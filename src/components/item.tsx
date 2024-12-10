import styled from "styled-components";
import { HomeDataStateI } from "../recoil/data";

const Container = styled.div`
  width: 80%;
  max-width: 150px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #e4dfff;
  border-radius: 5px;
  margin: 0;
`;
const Info = styled.div`
  span {
    font-size: 0.4rem;
    display: block;
  }
`;
const Title = styled.div`
  overflow: hidden;
  span {
    font-size: 0.5rem;
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
