import styled from "styled-components";

const FooterWrapper = styled.footer`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
`;

const Logo = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #5c37ff;
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
      <Logo>TRIM</Logo>
      <FooterLinks>
        <a href="/terms">이용 약관 및 정책</a>
        <a href="/privacy">개인정보 처리방침</a>
        <a href="/contact">Contact</a>
      </FooterLinks>
    </FooterWrapper>
  );
}
