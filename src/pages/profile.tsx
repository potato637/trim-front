import styled from "styled-components";
import Profilecontroller from "../components/profilecontroller";
import { useState } from "react";

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
const Input = styled.input<{ disabled: boolean }>`
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: ${({ disabled }) => (disabled ? "#e9e9e9" : "white")};
  color: ${({ disabled }) => (disabled ? "#666" : "black")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};

  &:focus {
    outline: none;
    border: 1px solid var(--color-purple);
  }
`;
const EditButton = styled.button`
  background: none;
  border: none;
  color: var(--color-purple);
  cursor: pointer;
  font-size: var(--font-size-small);
`;
const SaveButton = styled.button`
  background-color: var(--color-purple);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: var(--font-size-small);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-purple-hover);
  }
`;
const CancelButton = styled.button`
  background-color: #666;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: var(--font-size-small);
  transition: all 0.2s ease;

  &:hover {
    background-color: #555;
  }
`;

export default function Profile() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");

  // 편집 모드 관리: 각 필드별로 true/false
  const [editing, setEditing] = useState({
    name: false,
    nickname: false,
    introduce: false,
    school: false,
    major: false,
  });
  // 임시 값 관리
  const [temp, setTemp] = useState({
    name: "",
    nickname: "",
    introduce: "",
    school: "",
    major: "",
  });
  // 편집 중인지 전체 판단
  const isAnyEditing = Object.values(editing).some(Boolean);

  // 편집 버튼 클릭
  const handleEdit = (field: keyof typeof editing, value: string) => {
    setEditing((prev) => ({ ...prev, [field]: true }));
    setTemp((prev) => ({ ...prev, [field]: value }));
  };
  // input 변경
  const handleTempChange = (field: keyof typeof temp, value: string) => {
    setTemp((prev) => ({ ...prev, [field]: value }));
  };
  // 저장
  const handleSaveAll = () => {
    setName(temp.name);
    setNickname(temp.nickname);
    setIntroduce(temp.introduce);
    setSchool(temp.school);
    setMajor(temp.major);
    setEditing({
      name: false,
      nickname: false,
      introduce: false,
      school: false,
      major: false,
    });
  };
  // 취소
  const handleCancelAll = () => {
    setTemp({ name, nickname, introduce, school, major });
    setEditing({
      name: false,
      nickname: false,
      introduce: false,
      school: false,
      major: false,
    });
  };

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
              <EditButton onClick={() => handleEdit("name", name)}>
                편집
              </EditButton>
            </div>
            <div>
              <span>닉네임</span>
              <EditButton onClick={() => handleEdit("nickname", nickname)}>
                편집
              </EditButton>
            </div>
          </Half>
          <Half>
            <Input
              value={editing.name ? temp.name : name}
              onChange={(e) =>
                editing.name
                  ? handleTempChange("name", e.target.value)
                  : setName(e.target.value)
              }
              disabled={!editing.name}
            />
            <Input
              value={editing.nickname ? temp.nickname : nickname}
              onChange={(e) =>
                editing.nickname
                  ? handleTempChange("nickname", e.target.value)
                  : setNickname(e.target.value)
              }
              disabled={!editing.nickname}
            />
          </Half>
          <Full />
          <Full />
          <Full>
            <div>
              <span>한줄 소개</span>
              <EditButton onClick={() => handleEdit("introduce", introduce)}>
                편집
              </EditButton>
            </div>
            <span>
              {editing.introduce ? temp.introduce.length : introduce.length}/150
            </span>
          </Full>
          <Input
            value={editing.introduce ? temp.introduce : introduce}
            onChange={(e) =>
              editing.introduce
                ? handleTempChange("introduce", e.target.value)
                : setIntroduce(e.target.value)
            }
            disabled={!editing.introduce}
          />
          <Full />
          <Full />
          <Half>
            <div>
              <span>학교</span>
              <EditButton onClick={() => handleEdit("school", school)}>
                편집
              </EditButton>
            </div>
            <div>
              <span>전공</span>
              <EditButton onClick={() => handleEdit("major", major)}>
                편집
              </EditButton>
            </div>
          </Half>
          <Half>
            <Input
              value={editing.school ? temp.school : school}
              onChange={(e) =>
                editing.school
                  ? handleTempChange("school", e.target.value)
                  : setSchool(e.target.value)
              }
              disabled={!editing.school}
            />
            <Input
              value={editing.major ? temp.major : major}
              onChange={(e) =>
                editing.major
                  ? handleTempChange("major", e.target.value)
                  : setMajor(e.target.value)
              }
              disabled={!editing.major}
            />
          </Half>
          {/* 하단 저장/취소 버튼 */}
          {isAnyEditing && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
                marginTop: 24,
              }}
            >
              <SaveButton onClick={handleSaveAll}>저장</SaveButton>
              <CancelButton onClick={handleCancelAll}>취소</CancelButton>
            </div>
          )}
        </InputContainer>
      </EditProfile>
    </Container>
  );
}
