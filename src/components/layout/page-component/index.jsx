import React from "react";
import styled from "styled-components";
import PageHeader from "../page-header";
import PageContent from "../page-content";
import PageFooter from "../page-footer";

const PageLayoutStyle = styled.div`
  background-color: black;
`

const PageLayout = ({innerObject}) => {
  return (
    <PageLayoutStyle>
      <PageHeader/>
      <PageContent>{innerObject}</PageContent>
      <PageFooter/>
    </PageLayoutStyle>
  )
}

export default PageLayout