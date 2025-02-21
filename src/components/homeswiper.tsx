import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { HomeDataStateI } from "../recoil/data";
import Item from "./item";
import { useRef } from "react";

const SwiperContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledSwiper = styled(Swiper)`
  width: 95%;
  height: 90%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
`;
const Pagebutton = styled.button`
  position: absolute;
  z-index: 10;
  cursor: pointer;
  font-size: var(--font-size-small);

  &.prev {
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  &.next {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  background: none;
  border: none;
  color: var(--color-purple);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function HomeSwiper({ data }: { data: HomeDataStateI[] }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <SwiperContainer>
      <Pagebutton ref={prevRef} className="prev">
        <GrFormPrevious />
      </Pagebutton>
      <Pagebutton ref={nextRef} className="next">
        <GrFormNext />
      </Pagebutton>

      <StyledSwiper
        modules={[Navigation, Grid]}
        slidesPerView={3}
        slidesPerGroup={3}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        spaceBetween={10}
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
    </SwiperContainer>
  );
}
