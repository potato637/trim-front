import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: var(--font-size-medium);
  background-color: var(--color-white);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Logo = styled.div`
  font-size: var(--font-size-large);
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 5px;
`;
const Contact = styled.div`
  font-size: var(--font-size-small);
  font-weight: 400;
  margin-bottom: 2px;
`;
const Copyrights = styled.div`
  font-size: var(--font-size-small);
  font-weight: 400;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 15px;

  a {
    font-size: var(--font-size-small);
    font-weight: 400;
    color: var(--color-text);
    text-decoration: none;
    white-space: nowrap;
    text-overflow: hidden;
    overflow: hidden;
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
