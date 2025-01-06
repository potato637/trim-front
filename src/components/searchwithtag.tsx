import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;
const SearchContainer = styled.div`
  width: 80%;
  background-color: yellow;
  height: 30px;
`;

export default function Searchwithtag() {
  return (
    <Container>
      <SearchContainer></SearchContainer>
    </Container>
  );
}
