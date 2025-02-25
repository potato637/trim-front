import React from "react";
import styled from "styled-components";

const Banner = styled.div`
  display: flex;
  width: 100%;
  background-color: var(--color-light-purple);
  min-height: 130px;
  margin-top: 20px;
  border-radius: 6px;
  overflow: hidden;
`;
const LeftContainer = styled.div`
  flex: 5;
  background: url("/assets/survey.jpeg") center/cover no-repeat;
`;
const RightContainer = styled.div`
  flex: 7;
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
