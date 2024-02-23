import React from "react";
import styled from "styled-components";

const PageContent = ({contents}) => {
    return <PageContentStyle>{contents}</PageContentStyle>
}

const PageContentStyle = styled.div`
  padding-top: 130px;
  width: 700px;
  margin-left: 150px;
`

export default PageContent