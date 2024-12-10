import styled from "styled-components";

const FooterWrapper = styled.footer`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #5c37ff;
  margin-bottom: 5px;
`;
const Contact = styled.div`
  font-size: 0.35rem;
  font-weight: 500;
`;
const Copyrights = styled.div`
  font-size: 0.35rem;
  font-weight: 500;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 15px;

  a {
    font-size: 0.5rem;
    color: #000;
    text-decoration: none;
    white-space: nowrap;
    text-overflow: hidden;
    overflow: hidden;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Info>
        <Logo>TRIM</Logo>
        <Contact>Contact: trimvelo@gmail.com</Contact>
        <Copyrights>all rights reserved.</Copyrights>
      </Info>
      <FooterLinks>
        <a href="/terms">이용 약관 및 정책</a>
        <a href="/privacy">개인정보 처리방침</a>
        <a href="/contact">Contact</a>
      </FooterLinks>
    </FooterWrapper>
  );
}
