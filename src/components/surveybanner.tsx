import styled from "styled-components";
import surveyImg from "../assets/survey.jpeg";

const Banner = styled.div`
  display: flex;
  width: 100%;
  background-color: #f5f3ff;
  min-height: 80px;
  margin-top: 20px;
  border-radius: 6px;
  overflow: hidden;
`;
const LeftContainer = styled.div`
  flex: 5;
  background: url(${surveyImg}) center/cover no-repeat;
`;
const RightContainer = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function SurveyBanner() {
  return (
    <Banner>
      <LeftContainer />
      <RightContainer></RightContainer>
    </Banner>
  );
}
