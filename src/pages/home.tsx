import styled from "styled-components";
import { FaComments, FaThumbsUp } from "react-icons/fa6";
import { PiEyesFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { homeDataState, categoryState, getData } from "../recoil/data";
import { faker } from "../faker";
import HomeSwiper from "../components/homeswiper";

const BannerContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 240px;
  border-radius: 3px;
  background: linear-gradient(
    90deg,
    var(--color-purple) 0%,
    var(--color-mint-banner) 100%
  );
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
  color: var(--color-white);
  gap: 25px;
`;
const BannerDescription = styled.div`
  display: flex;
  width: 90%;
  justify-content: flex-start;
  align-items: center;
  font-size: var(--font-size-medium);
  font-weight: 600;
`;
const BannerTitle = styled.div`
  display: flex;
  width: 90%;
  justify-content: flex-start;
  align-items: center;
  font-size: var(--font-size-large);
  font-weight: 600;
  letter-spacing: 1px;
`;
const BannerContent = styled.div`
  display: flex;
  width: 90%;
  justify-content: flex-start;
  align-items: center;
  font-size: var(--font-size-small);
  font-weight: 400;
  line-height: 1.5;
`;
const BannerActivity = styled.div`
  display: flex;
  width: 90%;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  font-size: var(--font-size-small);
  font-weight: 400;
`;
const Text = styled.p`
  width: 350px;
`;
const TabBar = styled.div`
  padding: 0 3px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid var(--color-border);
  & > div {
    color: var(--color-black);
    font-size: var(--font-size-small);
    font-weight: 400;
  }
`;
const Tab = styled.div`
  display: flex;
  gap: 1.5rem;
`;
const TabAnchor = styled.a<{ isSelected: boolean }>`
  color: ${(props) =>
    props.isSelected ? "var(--color-purple)" : "var(--color-black)"};
  padding: 3px;
  &:hover {
    cursor: pointer;
  }
`;
const Ranking = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
const Rank = styled.div`
  display: flex;
  gap: 10px;
`;
const Content = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex: 15;
`;
const Writings = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white-gray);
  border-radius: 5px;
  width: 72%;
  max-height: 450px;
`;

const Side = styled.div`
  width: 25%;
  max-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const AboutR = styled.div`
  position: relative;
  display: flex;
  flex: 5.5;
  background-color: #f5f3ff;
  border: 0.5px solid #d9c3ff;
  border-radius: 5px;
`;
const AboutA = styled.div`
  position: absolute;
`;
const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 5;
`;
const SurveyText = styled.p`
  margin-top: 15px;
  color: var(--color-black);
  font-size: var(--font-size-small);
  font-weight: 400;
  padding: 5px 0px;
`;
const Surveys = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #f5f3ff;
  border-top: 1px solid #acacac;
  border-bottom: 1px solid #acacac;
`;
const Survey = styled.div`
  flex: 1;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    font-size: var(--font-size-small);
    color: var(--color-gray);
    font-weight: 500;
  }
`;
const SurveyTitle = styled.div``;
const SurveyEndDate = styled.div``;

const surveysData = [
  { title: "디자인 인식 조사", endDate: "11.03" },
  { title: "디자인 인식 조사", endDate: "11.03" },
  { title: "디자인 인식 조사", endDate: "11.03" },
  { title: "디자인 인식 조사", endDate: "11.03" },
];

type TabI = "all" | "question" | "share" | "community" | "survey";

export default function Home() {
  const setHomeData = useSetRecoilState(homeDataState);
  const [category, setCategory] = useRecoilState(categoryState);
  const data = useRecoilValue(getData(category));
  const [selectedTab, setSelectedTab] = useState<TabI>("all");

  const getUser = async () => {
    try {
      const data = await (
        await fetch("http://localhost:8080/api/knowledge")
      ).json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setHomeData(faker);
    getUser();
  }, []);

  function handleTabClick(e: TabI) {
    setCategory(e);
    setSelectedTab(e);
  }

  return (
    <>
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
              안가도 성적을 잘 받는 방법이 있다는 ...
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
      <TabBar>
        <Tab>
          <TabAnchor
            isSelected={selectedTab === "all"}
            onClick={() => handleTabClick("all")}
          >
            <span>전체</span>
          </TabAnchor>
          <TabAnchor
            isSelected={selectedTab === "question"}
            onClick={() => handleTabClick("question")}
          >
            <span>질문</span>
          </TabAnchor>
          <TabAnchor
            isSelected={selectedTab === "share"}
            onClick={() => handleTabClick("share")}
          >
            <span>지식공유</span>
          </TabAnchor>
          <TabAnchor
            isSelected={selectedTab === "community"}
            onClick={() => handleTabClick("community")}
          >
            <span>커뮤니티</span>
          </TabAnchor>
          <TabAnchor
            isSelected={selectedTab === "survey"}
            onClick={() => handleTabClick("survey")}
          >
            <span>설문</span>
          </TabAnchor>
        </Tab>
        <Ranking>
          <RankinigTitle>
            <span>이달의 랭킹</span>
          </RankinigTitle>
          <Rank>
            <span>1. 가곽고</span>
            <span>2. 나눈넝</span>
            <span>3. 다돋두</span>
          </Rank>
        </Ranking>
      </TabBar>
      <Content>
        <Writings>{data && <HomeSwiper data={data} />}</Writings>
        <Side>
          <AboutR></AboutR>
          <SurveyContainer>
            <SurveyText>지금 진행 중인 설문조사</SurveyText>
            <Surveys>
              {surveysData &&
                surveysData.slice(0, 4).map((item) => (
                  <Survey>
                    <SurveyTitle>{item.title}</SurveyTitle>
                    <SurveyEndDate>~{item.endDate}</SurveyEndDate>
                  </Survey>
                ))}
            </Surveys>
          </SurveyContainer>
        </Side>
      </Content>
    </>
  );
}
