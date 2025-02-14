import CommunitySwiper from "../components/communityswiper";
import Hot from "../components/hot";

export default function Communitytab() {
  return (
    <>
      <Hot />
      <CommunitySwiper itemsPerPage={10} />
    </>
  );
}
