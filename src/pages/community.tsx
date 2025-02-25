import styled from "styled-components";
import Comments from "../components/comments";

const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-radius: 6px;
  background-color: #fbfbfb;
  box-shadow: 0px 4px 14px 0px rgba(97, 96, 96, 0.15);
  padding: 10px 15px;
`;
const TitleContainer = styled.div`
  font-size: 0.6rem;
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
  background: url("/assets/userSVG.svg") center/cover no-repeat;
`;
const CommunityText = styled.p`
  font-size: 0.45rem;
  line-height: 1.6;
  white-space: pre-line;
`;

const communityData = {
  title: "자유게시판 - 겨울과 봄의 경계 chatGPT",
  name: "이름름",
  scholar: "예체능",
  upload: "약 15시간 전",
  content:
    "겨울의 끝자락에서 바람은 여전히 차갑지만, 어딘가 봄의 기척이 스며든다. 창가에 앉아 커피잔을 손에 쥐고 있으면, 햇살이 유리창을 넘어와 살며시 손등을 어루만진다. 시간은 멈춘 듯 흐르고, 공기 중엔 희미한 변화의 냄새가 돈다.\n차가운 계절이 마지막 인사를 건네는 동안, 마음속에도 조용한 정리가 필요하다는 생각이 든다. 멀리서 들려오는 소란스러운 도시의 소리, 누군가는 약속을 향해 발걸음을 재촉하고, 또 누군가는 문득 걸음을 멈추고 하늘을 바라본다.\n우리 모두는 각자의 속도로 살아가고 있지만, 때때로 이렇게 순간을 느끼는 것이 중요하다. 변화는 늘 갑작스럽게 찾아오지만, 그 안에서도 자신만의 리듬을 찾을 수 있다면 어떨까.",
};
const commentsData = [
  {
    name: "이름름",
    scholar: "예체능",
    upload: "약 15시간 전",
    main: "안녕하세요 잘 봤어요!겨울의 끝자락에서 바람은 여전히 차갑지만, 어딘가 봄의 기척이 스며든다. 창가에 앉아 커피잔을 손에 쥐고 있으면, 햇살이 유리창을 넘어와 살며시 손등을 어루만진다. 시간은 멈춘 듯 흐르고, 공기 중엔 희미한 변화의 냄새가 돈다.",
    re: [
      {
        name: "이름름",
        scholar: "예체능",
        upload: "약 15시간 전",
        main: "안녕하세요 잘 봤어요",
      },
      {
        name: "아롱롱",
        scholar: "공학",
        upload: "약 15시간 전",
        main: "좋은 술과 저급한 웃음 꺼진 불 속 조용한 관음 내가 좋아하는 것들로만 주세요",
      },
    ],
  },
  {
    name: "이름름",
    scholar: "예체능",
    upload: "약 15시간 전",
    main: "나도 참 단순해요 까짓 게 싫다가도 다정해지고 미친 듯 울다가도",
    re: [
      {
        name: "이름름",
        scholar: "예체능",
        upload: "약 3시간 전",
        main: "잘 들었습니다!",
      },
    ],
  },
  {
    name: "이름름",
    scholar: "예체능",
    upload: "약 15시간 전",
    main: "나도 참 단순해요 까짓 게 싫다가도 다정해지고 미친 듯 울다가도",
  },
];

export default function Community() {
  return (
    <>
      <MainContent>
        <TitleContainer>{communityData.title}</TitleContainer>
        <WriterContainer>
          <WriterSVG />
          {`${communityData.name} · ${communityData.scholar} · ${communityData.upload}`}
        </WriterContainer>
        <CommunityText>{communityData.content}</CommunityText>
      </MainContent>
      <Comments commentsData={commentsData} />
    </>
  );
}
