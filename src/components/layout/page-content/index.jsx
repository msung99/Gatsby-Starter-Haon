import React from "react";
import styled from "styled-components";

const PageContent = ({contents}) => {
    return <PageContentStyle>{contents}</PageContentStyle>
}

const PageContentStyle = styled.div`
  padding-top: 130px;
  max-width: 700px;
  margin: 0 auto;
`

export default PageContent