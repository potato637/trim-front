import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { HomeDataStateI } from "../recoil/data";
import Item from "./item";

const StyledSwiper = styled(Swiper)`
  position: absolute;
  width: 100%;
  height: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    width: 80%;
    padding: 0;
    margin: 0 auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #855ff3;
    width: 2px;

    &::after {
      font-size: 0.7rem;
    }
  }
`;

export default function HomeSwiper({ data }: { data: HomeDataStateI[] }) {
  return (
    <StyledSwiper
      modules={[Navigation, Grid]}
      slidesPerView={3}
      slidesPerGroup={3}
      navigation
      grid={{
        fill: "row",
        rows: 2,
      }}
      loop={false}
    >
      {data.map((item, idx) => {
        return (
          <SwiperSlide key={idx}>
            <Item {...item} />
          </SwiperSlide>
        );
      })}
    </StyledSwiper>
  );
}
