import styled from "styled-components";
import { Swiper, SwiperClass, SwiperProps, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { faker } from "../faker";

import "swiper/css";
import "swiper/css/navigation";
import Item from "./item";
import { useRef } from "react";

const SwiperContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledSwiper = styled(Swiper)`
  .swiper-slide {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1px;
`;
const Pagebutton = styled.button`
  font-size: 0.7rem;
  background: none;
  border: 0.3px solid #8b8b8b;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  color: #8b8b8b;
  border-radius: 50%;
  cursor: pointer;
`;

const HotContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding-top: 10px;
`;
const HotHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;
const HotHeaderTitle = styled.text`
  font-size: 0.55rem;
  color: #5c37ff;
  font-weight: 600;
  letter-spacing: -0.5px;
`;
const HotBodyWrapper = styled.div`
  width: 80%;
`;

export default function Hot() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const fakeData = faker.slice(0, 10);
  return (
    <HotContainer>
      <HotHeaderWrapper>
        <HotHeaderTitle>THIS WEEK HOT 🔥</HotHeaderTitle>
        <ButtonContainer>
          <Pagebutton ref={prevRef} className="prev">
            <GrFormPrevious />
          </Pagebutton>
          <Pagebutton ref={nextRef} className="next">
            <GrFormNext />
          </Pagebutton>
        </ButtonContainer>
      </HotHeaderWrapper>
      <HotBodyWrapper>
        <SwiperContainer>
          <StyledSwiper
            modules={[Navigation]}
            slidesPerView={3}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            spaceBetween={3}
            onBeforeInit={(swiper: SwiperClass) => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation !== "boolean"
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
          >
            {fakeData.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <Item {...item} />
                </SwiperSlide>
              );
            })}
          </StyledSwiper>
        </SwiperContainer>
      </HotBodyWrapper>
    </HotContainer>
  );
}
