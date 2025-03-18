import React from "react";
import SurveyBanner from "../components/surveybanner";
// import SurveySwiper from "../components/surveyswiper";
import SurveyTag from "../components/surveytag";

export default function Surveytab() {
  return (
    <>
      <SurveyBanner />
      <SurveyTag />
      {/* <SurveySwiper itemsPerPage={10} /> */}
    </>
  );
}
