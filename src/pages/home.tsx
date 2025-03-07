import React, { useEffect } from "react";
import styled from "styled-components";
import { FaComments, FaThumbsUp, FaRegComments } from "react-icons/fa6";
import { PiEyesFill } from "react-icons/pi";
import { useState } from "react";
import { datasAPI } from "../api";
import { formatDate } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { BiLike } from "react-icons/bi";
import { QuestionDataI, QuestionItemI } from "../types/questionType";
import { KnowledgeDataI, KnowledgeItemI } from "../types/knowledgeType";
import { FreeTalkDataI, FreeTalkItemI } from "../types/communityType";
import { useNavigate } from "react-router-dom";

const BannerContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 240px;
  border-radius: 6px;
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
  min-height: 45px;
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
  align-items: stretch;
  gap: 10px;
  flex: 15;
`;
const Writings = styled.div`
  flex: 13;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white-gray);
  border-radius: 5px;
`;
const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 95%;
  height: 90%;
`;
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 150px;
  background: var(--color-white);
  border-radius: 10px;
  padding: 15px;
  gap: 20px;
  box-shadow: 0px 4px 14px 0px rgba(97, 96, 96, 0.15);
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
  background-color: var(--color-purple);
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
    gap: 3px;
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
const Side = styled.div`
  flex: 4;
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

export default function Home() {
  type TabI = "question" | "knowledge" | "community";
  // tab 클릭
  const [selectedTab, setSelectedTab] = useState<TabI>("question");
  const [selectedData, setSelectedData] = useState<
    QuestionDataI | KnowledgeDataI | FreeTalkDataI | null
  >(null);
  function handleTabClick(e: TabI) {
    setSelectedTab(e);
  }

  // data fetching
  const { data: home_question, isLoading: loading_question } = useQuery({
    queryKey: ["home_question"],
    queryFn: () => datasAPI.question({ currentPage: 0, pageSize: 6 }),
  });
  const { data: home_knowledge, isLoading: loading_knowledge } = useQuery({
    queryKey: ["home_knowledge"],
    queryFn: () => datasAPI.knowledge({ currentPage: 0, pageSize: 6 }),
  });
  const { data: home_community, isLoading: loading_community } = useQuery({
    queryKey: ["home_community"],
    queryFn: () => datasAPI.community({ currentPage: 0, pageSize: 6 }),
  });
  // const { data: home_survey, isLoading: loading_survey } = useQuery({
  //   queryKey: ["home_survey"],
  //   queryFn: () => datasAPI.question({ currentPage: 0, pageSize: 6 }),
  // });

  const CategoryMapping = {
    question: "질문게시판",
    knowledge: "지식공유",
    community: "자유게시판",
  };
  const dataMapping = {
    question: home_question,
    knowledge: home_knowledge,
    community: home_community,
    // survey: home_survey,
  };
  const isLoading = loading_question || loading_knowledge || loading_community;
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedData(dataMapping[selectedTab]);
  }, [selectedTab, isLoading]);

  if (isLoading) return null;

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
            isSelected={selectedTab === "question"}
            onClick={() => handleTabClick("question")}
          >
            <span>질문게시판</span>
          </TabAnchor>
          <TabAnchor
            isSelected={selectedTab === "knowledge"}
            onClick={() => handleTabClick("knowledge")}
          >
            <span>지식공유</span>
          </TabAnchor>
          <TabAnchor
            isSelected={selectedTab === "community"}
            onClick={() => handleTabClick("community")}
          >
            <span>자유게시판</span>
          </TabAnchor>
          {/* <TabAnchor
            isSelected={selectedTab === "survey"}
            onClick={() => handleTabClick("survey")}
          >
            <span>설문</span>
          </TabAnchor> */}
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
        <Writings>
          <ItemContainer>
            {selectedData &&
              Object.values(selectedData["result"])[0].map(
                (
                  item: QuestionItemI | KnowledgeItemI | FreeTalkItemI,
                  index: number
                ) => (
                  <ItemBox
                    key={index}
                    onClick={() => navigate(`/${selectedTab}`)}
                  >
                    <ItemMeta>
                      <Category>
                        <span>{CategoryMapping[selectedTab]}</span>
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
                )
              )}
          </ItemContainer>
        </Writings>
        <Side>
          <AboutR></AboutR>
          <SurveyContainer>
            <SurveyText>지금 진행 중인 설문조사</SurveyText>
            <Surveys>
              {surveysData &&
                surveysData.slice(0, 4).map((item, index) => (
                  <Survey key={index}>
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
