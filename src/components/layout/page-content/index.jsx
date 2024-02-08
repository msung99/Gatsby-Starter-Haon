import React from "react";
import styled from "styled-components";

const PageContent = ({contents}) => {
    return <PageContentStyle>{contents}</PageContentStyle>
}

const PageContentStyle = styled.div`
  margin: 0 auto;
  padding-top: 80px;
  color: white;
`

export default PageContent