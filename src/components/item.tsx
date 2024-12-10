import styled from "styled-components";
import { HomeDataStateI } from "../recoil/data";

const Container = styled.div`
  width: 130px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 90%;
`;
const Info = styled.div`
  span {
    font-size: 0.4rem;
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
