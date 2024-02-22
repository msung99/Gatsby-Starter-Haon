import React from "react"
import styled from "styled-components";

const PageFooterStyle = styled.footer` 
  position : relative;
  margin-top: 3rem;
  padding: 2rem;
  text-align: center;
  color: gray;
`

const PageFooter = () => {
    return (
        <PageFooterStyle>
            @2024 Lee Min Sung, powered by Gatsby Haon Blog
        </PageFooterStyle>
    )
}

export default PageFooter