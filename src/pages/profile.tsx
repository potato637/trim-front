import styled from "styled-components";
import Profilecontroller from "../components/profilecontroller";

const Container = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: yellow;
`;
const ControllerContainer = styled.div``;

export default function Profile() {
  return (
    <Container>
      <ControllerContainer>
        <Profilecontroller />
      </ControllerContainer>
      <div>fdfsd</div>
      <div>fdfsd</div>
    </Container>
  );
}
