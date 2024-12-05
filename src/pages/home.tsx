import styled from "styled-components";
import { FaComments, FaThumbsUp } from "react-icons/fa6";
import { PiEyesFill } from "react-icons/pi";

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
  margin: 5px;
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
  flex: 7;
  width: 100%;
  margin: 0 5px 5px 5px;
`;
const Tab = styled.div`
  border-bottom: 1px solid #855;
`;
const Content = styled.div``;
const Writings = styled.div``;
const Side = styled.div``;
const About = styled.div``;
const Survey = styled.div``;
const Text = styled.p``;

export default function Home() {
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
        <Tab></Tab>
        <Content>
          <Writings></Writings>
          <Side>
            <About></About>
            <Survey></Survey>
          </Side>
        </Content>
      </ContentContainer>
    </Container>
  );
}
