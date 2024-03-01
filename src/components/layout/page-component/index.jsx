import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import PageContent from "../page-content";
import PageFooter from "../page-footer";
import PageNavigator from "../page-navigator";
import ThemeSwitch from "../../theme-switch";
import { getValueFromLocalStorage } from "../../../utils/localStorage";
import { DARK_THEME_COLORS, LIGHT_THEME_COLORS } from "../../../constants/themeConstants";
import GlobalStyle from "../../../styles";

const PageLayout = ({ children }) => {
  const [theme, setTheme] = useState(getValueFromLocalStorage('isDarkMode') ? DARK_THEME_COLORS : LIGHT_THEME_COLORS);

  useEffect(() => {
    setTheme(getValueFromLocalStorage('isDarkMode') ? DARK_THEME_COLORS : LIGHT_THEME_COLORS);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <PageWrapper>
        <PageNavigator/>
        <PageContent contents={children} />
        <PageFooter/>
      </PageWrapper>
      <ThemeSwitch/>
    </ThemeProvider>
  );
};

const PageWrapper = styled.div`
  @media(max-width: 768px) {
    padding: 0 20px;
  }
`;

export default PageLayout;
