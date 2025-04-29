import styled from "styled-components";
import Profilecontroller from "../components/profilecontroller";

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: yellow;
`;
const ControllerContainer = styled.div`
  position: absolute;
  top: 100px;
  left: -50px;
`;
const EditBadges = styled.div`
  margin-top: 60px;
  width: 70%;
`;

export default function Badges() {
  return (
    <Container>
      <ControllerContainer>
        <Profilecontroller />
      </ControllerContainer>
      <EditBadges></EditBadges>
    </Container>
  );
}
