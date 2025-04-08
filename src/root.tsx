import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./layouts/header";
import { Outlet } from "react-router-dom";
import Footer from "./layouts/footer";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Controller from "./components/controller";
import "../src/styles/global.css";
import { useSyncAuthWithCookie } from "./utils";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  html {
    font-size: 16px;
    overflow-y: scroll;
  }
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .markdown-content {
  line-height: 1.6;
  font-size: 1rem;
  color: #333;
}

.markdown-content h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.markdown-content h2 {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
}

.markdown-content h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.6rem;
}

.markdown-content p {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.markdown-content ul, .markdown-content ol {
  padding-left: 1.5rem;
}

.markdown-content li {
  margin-bottom: 0.5rem;
}

.markdown-content strong {
  font-weight: bold;
}

.markdown-content em {
  font-style: italic;
}

.markdown-content blockquote {
  border-left: 4px solid #ccc;
  padding-left: 1rem;
  color: #555;
}

.markdown-content pre {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
}
`;
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 1400px;
  margin: 0;
`;
const ContentWrapper = styled.div`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-width: 1400px;
  min-height: 100vh;
`;
const MainWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 20px;
  width: 1000px;
`;

const queryClient = new QueryClient();

function Root() {
  useSyncAuthWithCookie();

  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <AppWrapper>
          <ContentWrapper>
            <Header />
            <MainWrapper>
              <Controller />
              <Outlet />
            </MainWrapper>
            <Footer />
          </ContentWrapper>
        </AppWrapper>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default Root;
