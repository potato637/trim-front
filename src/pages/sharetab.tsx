import Hot from "../components/hot";
import Searchwithtag from "../components/searchwithtag";
import ShareSwiper from "../components/shareswiper";

export default function Sharetab() {
  return (
    <>
      <Hot />
      <Searchwithtag />
      <ShareSwiper itemsPerPage={10} />
    </>
  );
}
