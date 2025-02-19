import Addtag from "../components/addtag";
import Mde from "../components/mde";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-top: 10px;
`;

export default function Questionnew() {
  return (
    <Container>
      <Mde />
      <Addtag />
    </Container>
  );
}
