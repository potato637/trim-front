import styled from "styled-components";
import Viewsurvey from "../components/viewsurvey";

const SurveyContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  .sv-title-actions {
    font-size: 0.1rem;
  }
`;

export default function Survey() {
  return (
    <SurveyContainer>
      <Viewsurvey />
    </SurveyContainer>
  );
}
