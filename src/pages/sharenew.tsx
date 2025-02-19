import styled from "styled-components";
import Mde from "../components/mde";
import Addtag from "../components/addtag";

const Container = styled.div`
  width: 100%;
  margin-top: 10px;
`;

export default function Sharenew() {
  return (
    <Container>
      <Mde />
      <Addtag />
    </Container>
  );
}
