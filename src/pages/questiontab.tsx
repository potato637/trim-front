import Hot from "../components/hot";
import QuestionSwiper from "../components/questionswiper";
import Searchwithtag from "../components/searchwithtag";

export default function Questiontab() {
  return (
    <>
      <Hot />
      <Searchwithtag />
      <QuestionSwiper itemsPerPage={10} />
    </>
  );
}
