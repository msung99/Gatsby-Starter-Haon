import React from "react";
import styled from "styled-components";

const PageContent = ({innerObject}) => {
    return <PageContentStyle>{innerObject}</PageContentStyle>
}

const PageContentStyle = styled.div`
  margin: 0 auto;
  padding-top: 5rem;
  max-width: 680px;
`

export default PageContent