import React from "react";
import styled from "styled-components";
import PageContent from "../page-content";
import PageFooter from "../page-footer";
import PageNavigator from "../page-navigator";

const PageLayoutStyle = styled.div`
  background-color: black;
`

const PageLayout = ({innerObject}) => {
  return (
    <PageLayoutStyle>
      <PageNavigator/>
      <PageContent>{innerObject}</PageContent>
      <PageFooter/>
    </PageLayoutStyle>
  )
}

export default PageLayout