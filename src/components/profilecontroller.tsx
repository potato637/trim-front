import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 130px;
  height: 170px;
  background-color: var(--color-white-gray);
  box-shadow: 0px 4px 14px 0px rgba(97, 96, 96, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const Top = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 13px;
  color: var(--color-date);
  font-size: var(--font-size-small);
  & > span {
    cursor: pointer;
  }
`;
const MenuItem = styled.span<{ isActive: boolean }>`
  cursor: pointer;
  color: ${({ isActive }) =>
    isActive ? "var(--color-primary)" : "var(--color-date)"};
  font-weight: ${({ isActive }) => (isActive ? "600" : "400")};
  transition: all 0.2s ease;

  &:hover {
    color: var(--color-primary);
    transform: translateX(2px);
  }
`;
const Line = styled.hr`
  width: 80%;
  margin: 0 auto;
  border: 0.4px solid var(--color-comment-input);
`;
const Bottom = styled.div`
  width: 80%;
  text-align: center;
  color: var(--color-purple-hover);
  font-weight: 600;
  cursor: pointer;
`;

export default function Profilecontroller() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container>
      <Top>
        <MenuItem
          isActive={location.pathname === "/profile"}
          onClick={() => navigate("/profile")}
        >
          프로필 설정
        </MenuItem>
        <MenuItem
          isActive={location.pathname === "/badges"}
          onClick={() => navigate("/badges")}
        >
          뱃지 전체 보기
        </MenuItem>
      </Top>
      <Line />
      <Bottom>
        <span onClick={() => navigate("/edit-avatar")}>Edit Avatar</span>
      </Bottom>
    </Container>
  );
}
