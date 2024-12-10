import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { HomeDataStateI } from "../recoil/data";
import Item from "./item";

const StyledSwiper = styled(Swiper)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    font-size: 1rem;
    border-radius: 10px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #855ff3;
  }
`;

interface HomeSwiperI {
  data: HomeDataStateI[];
}
export default function HomeSwiper({ data }: HomeSwiperI) {
  return (
    <StyledSwiper
      modules={[Navigation]}
      slidesPerView={3}
      spaceBetween={30}
      navigation
      loop={true}
      onSlideChange={() => console.log("Slide changed")}
      onSwiper={(swiper: any) => console.log(swiper)}
    >
      {data.map((item, idx) => (
        <Item item={item} />
      ))}
    </StyledSwiper>
  );
}
