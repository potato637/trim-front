import styled from "styled-components";
import { FaArrowUp, FaArrowLeft } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ControllerContainer = styled.div`
  position: fixed;
  top: 10%;
  right: 13%;
  width: 2rem;
  z-index: 1000;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 13px;
  background-color: #fbfbfb;
  border: 0.5px solid #cbcdd6;
  border-radius: 30px;
  padding: 10px 0px;
  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #6129e9;
    gap: 4px;
    cursor: pointer;
  }
  & > div > span {
    font-size: 0.4rem;
  }
`;
const TopContainer = styled.div``;
const BackContainer = styled.div``;
const WriteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6129e9;
  font-size: 0.8rem;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  cursor: pointer;
`;

export default function Controller() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <ControllerContainer>
      <PageContainer>
        <TopContainer onClick={scrollToTop}>
          <FaArrowUp />
          <span>TOP</span>
        </TopContainer>
        <BackContainer onClick={goBack}>
          <FaArrowLeft />
          <span>BACK</span>
        </BackContainer>
      </PageContainer>
      <WriteContainer
        onClick={() => {
          navigate(`/${location.pathname.split("/").filter(Boolean)[0]}/new`);
        }}
      >
        <HiPencil color="white" />
      </WriteContainer>
    </ControllerContainer>
  );
}
