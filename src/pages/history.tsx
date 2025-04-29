import styled from "styled-components";
import Profilecontroller from "../components/profilecontroller";
import { BiLike } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import { useState } from "react";

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ControllerContainer = styled.div`
  position: absolute;
  top: 100px;
  left: -50px;
`;
const ShowHistory = styled.div`
  margin-top: 60px;
  width: 70%;
  & > div:first-child {
    display: flex;
    gap: 10px;
  }
`;
const OptionBtn = styled.button<{ selected: boolean }>`
  border: none;
  background: ${({ selected }) =>
    selected ? "var(--color-purple-hover)" : "var(--color-comment-input)"};
  padding: 10px 15px;
  border-radius: 20px;
  color: var(--color-white);
  cursor: pointer;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 70px;
  padding: 10px 0;
  border-top: 0.3px solid var(--color-light-purple-border);
  cursor: pointer;
`;
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  font-size: var(--font-size-medium);
  color: var(--color-black);
`;
const MetaData = styled.div`
  display: flex;
  gap: 5px;
  font-size: var(--font-size-extra-small);
`;
const CreatedAt = styled.div`
  color: var(--color-date);
`;
const LikeIcon = styled(BiLike)`
  color: var(--color-like);
`;
const Like = styled.div`
  color: var(--color-like);
`;
const CommentIcon = styled(FaRegComments)`
  color: var(--color-comment);
`;
const Comment = styled.div`
  color: var(--color-comment);
`;
const Content = styled.div`
  font-size: var(--font-size-small);
`;

export default function History() {
  const [selectedBtn, setSelectedBtn] = useState<string>("write");

  return (
    <Container>
      <ControllerContainer>
        <Profilecontroller />
      </ControllerContainer>
      <ShowHistory>
        <div>
          <OptionBtn
            onClick={() => setSelectedBtn("write")}
            selected={selectedBtn === "write"}
          >
            작성글
          </OptionBtn>
          <OptionBtn
            onClick={() => setSelectedBtn("scrap")}
            selected={selectedBtn === "scrap"}
          >
            스크랩
          </OptionBtn>
          <OptionBtn
            onClick={() => setSelectedBtn("answer")}
            selected={selectedBtn === "answer"}
          >
            답변글
          </OptionBtn>
          <OptionBtn
            onClick={() => setSelectedBtn("comment")}
            selected={selectedBtn === "comment"}
          >
            댓글
          </OptionBtn>
        </div>
        {/* <Item
                      key={index}
                      onClick={() =>
                        navigate(`/community/${item.freeTalkResponse.freeTalkId}`, {
                          state: { id: item.freeTalkResponse.freeTalkId },
                        })
                      }
                    >
                      <TopContainer>
                        <Title>{item.freeTalkResponse.title}</Title>
                        <MetaData>
                          <CreatedAt>
                            {formatDate(item.freeTalkResponse.createdAt)}
                          </CreatedAt>
                          <LikeIcon />
                          <Like>{item.likeCount}</Like>
                          <CommentIcon />
                          <Comment>{item.commentCount}</Comment>
                        </MetaData>
                      </TopContainer>
                      <Content>{item.freeTalkResponse.content}</Content>
                    </Item> */}
      </ShowHistory>
    </Container>
  );
}
