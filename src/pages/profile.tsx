import styled from "styled-components";
import Profilecontroller from "../components/profilecontroller";

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ControllerContainer = styled.div`
  position: absolute;
  top: 100px;
  left: -50px;
`;
const EditProfile = styled.div`
  margin-top: 60px;
  width: 70%;
  & > h2 {
    font-size: var(--font-size-extra-medium);
  }
`;
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  padding: 30px;
  background-color: #f6f6f6;
  box-shadow: 0px 4px 14px 0px rgba(97, 96, 96, 0.15);
  font-size: var(--font-size-small);
`;
const Half = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  & > div,
  & > input {
    flex: 1;
  }
`;
const Full = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Input = styled.input`
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 5px;
  &:focus {
    outline: none;
    border: 1px solid var(--color-purple);
  }
`;

export default function Profile() {
  return (
    <Container>
      <ControllerContainer>
        <Profilecontroller />
      </ControllerContainer>
      <EditProfile>
        <h2>회원 정보</h2>
        <InputContainer>
          <Half>
            <div>
              <span>이름</span>
            </div>
            <div>
              <span>닉네임</span>
            </div>
          </Half>
          <Half>
            <Input></Input>
            <Input></Input>
          </Half>
          <Full />
          <Full />
          <Full>
            <span>한줄 소개</span>
            <span>27/150</span>
          </Full>
          <Input></Input>
          <Full />
          <Full />
          <Half>
            <div>
              <span>학교</span>
            </div>
            <div>
              <span>학과</span>
            </div>
          </Half>
          <Half>
            <Input></Input>
            <Input></Input>
          </Half>
          <Full />
          <Full />
          <Half>
            <div>
              <span>계열</span>
            </div>
            <div>
              <span>전공</span>
            </div>
          </Half>
          <Half>
            <Input></Input>
            <Input></Input>
          </Half>
        </InputContainer>
      </EditProfile>
    </Container>
  );
}
