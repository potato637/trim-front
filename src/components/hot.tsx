import styled from "styled-components";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";
import { QuestionItemI } from "../types/questionType";
import { KnowledgeItemI } from "../types/knowledgeType";
import { FreeTalkItemI } from "../types/communityType";
import { BiLike } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import { formatDate } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";

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
  gap: 5px;
`;
const Pagebutton = styled.button`
  font-size: var(--font-size-medium);
  background: none;
  border: 0.3px solid var(--color-border);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  color: var(--color-gray);
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
  gap: 10px;
`;
const HotHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const HotHeaderTitle = styled.text`
  font-size: var(--font-size-medium);
  color: var(--color-purple);
  font-weight: 600;
  letter-spacing: -0.5px;
`;
const HotBodyWrapper = styled.div`
  width: 100%;
`;
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 120px;
  background: var(--color-bg-light);
  padding: 20px;
  gap: 20px;
  border-radius: 10px;
  cursor: pointer;
`;
const ItemMeta = styled.div`
  display: flex;
  justify-content: space-between;
  & > div {
    font-size: var(--font-size-extra-small);
    height: 25px;
  }
`;
const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: 20px;
`;
const Extra = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  & > div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
const ItemDate = styled.div`
  color: var(--color-date);
`;
const Like = styled.div`
  color: var(--color-like);
`;
const LikeIcon = styled(BiLike)`
  font-size: var(--font-size-small);
`;
const Comment = styled.div`
  color: var(--color-comment);
`;
const CommentIcon = styled(FaRegComments)`
  font-size: var(--font-size-small);
`;
const ItemTitle = styled.div`
  color: var(--color-gray);
  font-size: var(--font-size-medium);
  font-weight: 400;
`;

export default function Hot({
  data,
  category,
}: {
  data: QuestionItemI[] | KnowledgeItemI[] | FreeTalkItemI[];
  category: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const to = location.pathname.split("/").filter(Boolean)[0];
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

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
            spaceBetween={15}
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
            {data.map(
              (
                item: QuestionItemI | KnowledgeItemI | FreeTalkItemI,
                index: number
              ) => {
                return (
                  <SwiperSlide key={index}>
                    <ItemBox
                      key={index}
                      onClick={() =>
                        navigate(
                          `/${to}/${Object.values(Object.values(item)[0])[0]}`
                        )
                      }
                    >
                      <ItemMeta>
                        <Category>
                          <span>{category}</span>
                        </Category>
                        <Extra>
                          <ItemDate>
                            <span>
                              {formatDate(Object.values(item)[0].createdAt)}
                            </span>
                          </ItemDate>
                          <Like>
                            <LikeIcon />
                            <span>{item.likeCount}</span>
                          </Like>
                          <Comment>
                            <CommentIcon />
                            <span>
                              {"answerCount" in item
                                ? item.answerCount
                                : item.commentCount}
                            </span>
                          </Comment>
                        </Extra>
                      </ItemMeta>
                      <ItemTitle>
                        <span>{Object.values(item)[0].title}</span>
                      </ItemTitle>
                    </ItemBox>
                  </SwiperSlide>
                );
              }
            )}
          </StyledSwiper>
        </SwiperContainer>
      </HotBodyWrapper>
    </HotContainer>
  );
}
