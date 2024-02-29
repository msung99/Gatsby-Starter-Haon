import React from "react";
import styled, { ThemeProvider } from "styled-components";
import PageContent from "../page-content";
import PageFooter from "../page-footer";
import PageNavigator from "../page-navigator";
import ThemeSwitch from "../../theme-switch";
import GlobalStyle from "../../../styles/GloalStyle";
import { getValueFromLocalStorage } from "../../../utils/localStorage";
import { DARK_THEME_COLORS, LIGHT_THEME_COLORS } from "../../../constants/themeConstants";

const PageLayoutStyle = styled.div`
  @media(max-width: 768px) {
    padding: 0 10px;
  }
`


const PageLayout = ({ children }) => {
  const theme = getValueFromLocalStorage('isDarkMode') ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

  return (
    <ThemeProvider theme={theme}>
      <Wrap><h1>{theme.background}</h1></Wrap>
      <PageLayoutStyle>
        <GlobalStyle/>
        <PageNavigator/>
        <PageContent contents={children}/>
        <PageFooter/>
        <ThemeSwitch/>
      </PageLayoutStyle>
    </ThemeProvider>
  )
}

const Wrap = styled.h1`
  font-size: 100px;
  color: black;
`

export default PageLayout