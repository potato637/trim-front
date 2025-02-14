import styled from "styled-components";
import shareImg from "../assets/answerImg.jpeg";
import userSVG from "../assets/userSVG.svg";
import { useState } from "react";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";

const MainContent = styled.div`
  width: 100%;
  border-bottom: 0.5px solid #cbcdd6;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
`;
const TitleContainer = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
`;
const WriterContainer = styled.div`
  font-size: 0.45rem;
  color: #37009c;
  display: flex;
  gap: 5px;
  align-items: center;
`;
const WriterSVG = styled.div`
  width: 1rem;
  height: 1rem;
  background: url(${userSVG}) center/cover no-repeat;
`;
const ShareText = styled.p`
  font-size: 0.5rem;
  line-height: 1.6;
`;
const ShareImg = styled.img`
  width: 100%;
`;
const Writer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  gap: 10px;
`;
const About = styled.div`
  display: flex;
  gap: 10px;
`;
const UserImg = styled.div`
  width: 70px;
  height: 70px;
  background: url(${userSVG}) center/cover no-repeat;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;
const UserName = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
`;
const UserEmail = styled.div`
  font-size: 0.4rem;
  color: #65686d;
`;
const Introducing = styled.div`
  font-size: 0.4rem;
  color: #65686d;
`;
const Infos = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 0.4rem;
`;
const CommentBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  cursor: pointer;
`;

interface ContentI {
  type: "text" | "image";
  content?: string;
  src?: string;
  alt?: string;
}
interface ShareDataI {
  title: string;
  name: string;
  scholar: string;
  upload: String;
  content: ContentI[];
  re?: CommentsI[];
}
interface CommentI {
  name: string;
  scholar: string;
  upload: string;
  main: string;
}
interface CommentsI {
  name: string;
  scholar: string;
  upload: string;
  main: string;
  re?: CommentI[];
}
const shareData: ShareDataI = {
  title: "2번 빠지고 A+ 받는 법",
  name: "이름름",
  scholar: "예체능",
  upload: "약 15시간 전",
  content: [
    {
      type: "image",
      src: shareImg,
      alt: "image",
    },
    {
      type: "text",
      content: "학점 잘 받는 비결",
    },
    {
      type: "text",
      content: "효율적인 공부와 시간 관리로 성과를 높이자",
    },
    {
      type: "text",
      content: "1. 학기 초반, 전략적으로 시작하기",
    },
    {
      type: "text",
      content:
        "학점을 잘 받으려면 학기 시작부터 체계적인 준비가 필수입니다. 강의 계획서(Syllabus)를 꼼꼼히 읽고 수업의 평가 기준, 과제 마감 기한, 시험 일정을 파악하세요. 이를 바탕으로 개인 학습 계획을 세우고, 주요 과제와 시험을 미리 준비하는 데 초점을 맞추세요. 초반에 강의 내용을 이해하고 질문하는 습관은 이후 학기 동안의 부담을 크게 줄여줍니다.",
    },
    {
      type: "text",
      content: "2. 강의 시간, 집중력을 극대화하자",
    },
    {
      type: "text",
      content:
        "수업 시간은 단순히 참석만 하는 것이 아니라, 집중적으로 참여하는 것이 중요합니다. 강의 중 교수님이 강조하는 부분을 메모하거나, 이해가 안 되는 부분은 즉시 질문하여 해결하세요. 강의 내용을 한 번 듣고 끝내는 대신, 노트를 정리하며 내용을 재구성하는 연습을 하면 기억력이 향상됩니다.",
    },
    {
      type: "text",
      content: "3. 효율적인 시험 준비 전략",
    },
    {
      type: "text",
      content:
        "시험을 준비할 때는 무작정 모든 내용을 암기하기보다, 중요한 개념과 시험에 자주 출제되는 주제를 우선적으로 학습하세요. 기출문제나 연습문제를 활용해 실전 감각을 키우는 것도 효과적입니다. 시험 기간에는 너무 많은 양을 한꺼번에 공부하기보다는, 분산 학습을 통해 꾸준히 준비하는 것이 성과를 높이는 비결입니다.",
    },
    {
      type: "text",
      content: "4. 과제와 프로젝트는 꼼꼼하게",
    },
    {
      type: "text",
      content:
        "과제는 단순한 점수 획득의 기회가 아니라, 자신의 이해도를 증명하는 중요한 과정입니다. 과제를 할 때는 요구사항을 철저히 검토하고, 논리적으로 구성된 결과물을 제출하세요. 특히, 팀 프로젝트에서는 적극적으로 참여하고, 역할 분담을 명확히 하여 협업 능력을 보여주는 것이 좋습니다.",
    },
    {
      type: "text",
      content: "5. 균형 잡힌 생활로 성과를 높이자",
    },
    {
      type: "text",
      content:
        "성적 향상을 위해서는 공부만큼이나 건강한 생활 습관이 중요합니다. 충분한 수면과 균형 잡힌 식사를 통해 체력을 유지하고, 규칙적인 운동으로 스트레스를 관리하세요. 또한, 여가 시간을 활용해 재충전의 기회를 가지는 것도 학업 효율을 높이는 데 큰 도움이 됩니다.",
    },
    {
      type: "text",
      content:
        "마무리하며 학점을 잘 받는 것은 단순히 노력만으로 이루어지지 않습니다. 효율적인 계획, 집중적인 학습, 그리고 건강한 생활의 조화가 필요합니다. 꾸준히 이러한 원칙을 실천한다면 누구든지 만족스러운 결과를 얻을 수 있을 것입니다.",
    },
  ],
};

export default function Share() {
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);

  const handleCommentBtnClick = () => {
    setIsCommentOpen((prev) => !prev);
  };
  return (
    <MainContent>
      <TitleContainer>{shareData.title}</TitleContainer>
      <WriterContainer>
        <WriterSVG />
        {`${shareData.name} · ${shareData.scholar} · ${shareData.upload}`}
      </WriterContainer>
      {shareData.content.map((item, index) =>
        item.type === "text" ? (
          <ShareText key={index}>{item.content}</ShareText>
        ) : (
          <ShareImg key={index} src={item.src} alt={item.alt} />
        )
      )}
      <Writer>
        <About>
          <UserImg />
          <UserInfo>
            <UserName>맘마모</UserName>
            <UserEmail>ldidid1234@gmail.com</UserEmail>
            <Introducing>
              한줄 소개... 팁... 웅성웅성... 팁.... 웅성웅성
            </Introducing>
          </UserInfo>
        </About>
        <Infos>
          <CommentBtn onClick={handleCommentBtnClick}>
            {`댓글 ${shareData.re?.length || "0"}개`}
            {isCommentOpen ? (
              <FaChevronCircleDown color="#6129e9" />
            ) : (
              <FaChevronCircleUp color="#6129e9" />
            )}
          </CommentBtn>
        </Infos>
      </Writer>
    </MainContent>
  );
}
