import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
    background: ${props => props.theme.background};
  }

  #___gatsby,
  #gatsby-focus-wrapper {
    height: 100%;
  }
`;

export default GlobalStyle;
