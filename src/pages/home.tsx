import styled from "styled-components";
import { FaComments, FaThumbsUp, FaChessQueen } from "react-icons/fa6";
import { PiEyesFill } from "react-icons/pi";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  homeDataState,
  categoryState,
  CategoryStateI,
  getData,
} from "../recoil/data";
import { faker } from "../faker";
import HomeSwiper from "../components/homeswiper";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BannerContainer = styled.div`
  display: flex;
  flex: 3.5;
  width: 100%;
  margin: 5px 5px 0 5px;
  border-radius: 5px;
  background: linear-gradient(90deg, #855ff3, #9ce2cf);
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;
const Banner = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  color: white;
`;
const BannerDescription = styled.div`
  display: flex;
  width: 90%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  flex: 2;
  font-size: 0.8rem;
  font-weight: 550;
`;
const BannerTitle = styled.div`
  display: flex;
  width: 90%;
  justify-content: flex-start;
  align-items: center;
  flex: 5;
  font-size: 1.6rem;
  font-weight: 600;
`;
const BannerContent = styled.div`
  display: flex;
  width: 90%;
  justify-content: flex-start;
  align-items: center;
  flex: 3;
  font-size: 0.7rem;
`;
const BannerActivity = styled.div`
  display: flex;
  width: 90%;
  justify-content: flex-start;
  align-items: center;
  flex: 2;
  margin-bottom: 10px;
  font-size: 0.5rem;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 7;
  width: 100%;
  margin: 0 5px 5px 5px;
`;
const TabBar = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  div {
    color: black;
    font-size: 0.45rem;
    font-weight: 400;
  }
`;
const Tab = styled.div`
  display: flex;
  column-gap: 1.5rem;
`;
const TabDiv = styled.div``;
const TabAnchor = styled.a`
  padding: 3px;
  &:hover {
    cursor: pointer;
  }
`;
const TabSpan = styled.span`
  &:hover {
  }
`;
const Ranking = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RankinigTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: #855ff3;
  }
  padding-right: 5px;
`;
const RankingSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const Rank = styled.div``;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 15;
`;
const Writings = styled.div`
  position: relative;
  background-color: #f5f3ff;
  border-radius: 5px;
  width: 78%;
`;

const Side = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const AboutR = styled.div`
  position: relative;
  display: flex;
  flex: 5.5;
  background-color: #f5f3ff;
  border-radius: 5px;
`;
const AboutA = styled.div`
  position: absolute;
`;
const Survey = styled.div`
  display: flex;
  flex: 5;
`;
const Text = styled.p``;

export default function Home() {
  const setHomeData = useSetRecoilState(homeDataState);
  const [category, setCategory] = useRecoilState(categoryState);
  const data = useRecoilValue(getData(category));

  useEffect(() => {
    // API 요청 응답 시간을 1초 정도라 생각했을 때
    setTimeout(() => {
      setHomeData(faker);
    }, 1000);
  }, []);

  function handleTabClick(e: CategoryStateI) {
    setCategory(e);
  }

  return (
    <Container>
      <BannerContainer>
        <Banner>
          <BannerDescription>
            <Text>이번주 HOT 게시글🔥</Text>
          </BannerDescription>
          <BannerTitle>
            <Text>2번 빠지고 A+ 받는 법</Text>
          </BannerTitle>
          <BannerContent>
            <Text>
              제가 알아낸 엄청난 사실에 대해 알려드리겠습니다. 그것은 학교를
              안가도 ..
            </Text>
          </BannerContent>
          <BannerActivity>
            <Text>
              <FaComments size={10} /> 300 <FaThumbsUp size={10} /> 73{" "}
              <PiEyesFill size={10} /> 1.6k
              {/* 👀 */}
            </Text>
          </BannerActivity>
        </Banner>
      </BannerContainer>
      <ContentContainer>
        <TabBar>
          <Tab>
            <TabDiv>
              <TabAnchor onClick={() => handleTabClick("all")}>
                <TabSpan>전체</TabSpan>
              </TabAnchor>
            </TabDiv>
            <TabDiv>
              <TabAnchor onClick={() => handleTabClick("question")}>
                <TabSpan>질문</TabSpan>
              </TabAnchor>
            </TabDiv>
            <TabDiv>
              <TabAnchor onClick={() => handleTabClick("community")}>
                <TabSpan>커뮤니티</TabSpan>
              </TabAnchor>
            </TabDiv>
            <TabDiv>
              <TabAnchor onClick={() => handleTabClick("share")}>
                <TabSpan>지식공유</TabSpan>
              </TabAnchor>
            </TabDiv>
            <TabDiv>
              <TabAnchor onClick={() => handleTabClick("survey")}>
                <TabSpan>설문</TabSpan>
              </TabAnchor>
            </TabDiv>
          </Tab>
          <Ranking>
            <RankinigTitle>
              <RankingSpan>
                이달의 랭킹 <FaChessQueen size={8} color="#855ff3" />
              </RankingSpan>
            </RankinigTitle>
            <Rank>
              <RankingSpan>1. 가곽고 2. 나눈넝 3. 다돋두</RankingSpan>
            </Rank>
          </Ranking>
        </TabBar>
        <Content>
          <Writings>
            <HomeSwiper data={faker} />
          </Writings>
          <Side>
            <AboutR></AboutR>
            <Survey></Survey>
          </Side>
        </Content>
      </ContentContainer>
    </Container>
  );
}
