import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";

const surveyJson = {
  elements: [
    {
      name: "First",
      title: "다니시는 대학교 지역이 어떻게 되나요?",
      type: "radiogroup",
      choices: ["서울", "강원", "경기", "제주"],
    },
    {
      name: "Second",
      title: "참여하시는 분의 학교 이름을 알려주세요",
      type: "text",
    },
    {
      name: "Third",
      title: "의견이 있으실 경우 적어주세요.",
      type: "comment",
    },
    {
      name: "Fourth",
      title: "보기에 좋은 것들을 골라 주세요.",
      type: "matrix",
      columns: ["1", "2", "3", "4", "5"],
      rows: ["A", "B", "C"],
    },
  ],
};

export default function Viewsurvey() {
  const survey = new Model(surveyJson);

  return <Survey model={survey} />;
}
