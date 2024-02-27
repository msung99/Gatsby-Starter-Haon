import React from "react";
import styled from "styled-components";
import PageContent from "../page-content";
import PageFooter from "../page-footer";
import PageNavigator from "../page-navigator";

const PageLayoutStyle = styled.div`
  @media(max-width: 768px) {
    padding: 0 10px;
  }
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