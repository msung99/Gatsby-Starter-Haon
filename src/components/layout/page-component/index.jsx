import React from "react";
import styled from "styled-components";
import PageContent from "../page-content";
import PageFooter from "../page-footer";
import PageNavigator from "../page-navigator";

const PageLayoutStyle = styled.div`
  background-color: #1d1d1d;
  width: 100%;
`



const PageLayout = ({ children }) => {
  return (
    <PageLayoutStyle>
      <PageNavigator/>
      <PageContent contents={children}/>
      <PageFooter/>
    </PageLayoutStyle>
  )
}

export default PageLayout