import React from "react";
import styled from "styled-components";

const PageContent = ({contents}) => {
    return <PageContentStyle>{contents}</PageContentStyle>
}

const PageContentStyle = styled.div`
  padding-top: 80px;
  padding-left: 370px;
`

export default PageContent