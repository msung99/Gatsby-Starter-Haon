import React from "react";
import styled from "styled-components";

const PageContent = ({contents}) => {
    return <PageContentStyle>{contents}</PageContentStyle>
}

const PageContentStyle = styled.div`
  padding-top: 80px;
  padding-left: 450px;
`

export default PageContent