import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
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
    margin: 0;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #855ff3;
    width: 2px;

    &::after {
      font-size: 0.7rem;
    }
  }

  .swiper-pagination-progressbar {
    left: 50%;
    transform: translateX(-50%); /* Adjust for the left offset */
    height: 2px; /* Thickness of the progress bar */
    background: #e0e0e0; /* Background for the progress bar (inactive part) */
    border-radius: 1px; /* Smooth edges for the bar */
    overflow: hidden; /* Ensure progress is contained within rounded corners */
    width: 100%;
  }

  .swiper-pagination-progressbar-fill {
    background: linear-gradient(90deg, #6a5acd, #855ff3); /* Gradient fill */
    border-radius: 1px; /* Smooth edges for the fill */
    height: 100%; /* Ensure the fill covers the height */
    transition: transform 0.3s ease; /* Smooth transition for progress */
  }
`;

export default function HomeSwiper({ data }: { data: HomeDataStateI[] }) {
  return (
    <StyledSwiper
      modules={[Navigation, Grid, Pagination]}
      slidesPerView={3}
      slidesPerGroup={3}
      navigation
      pagination={{
        type: "progressbar",
      }}
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
