import React from "react"
import styled from "styled-components";

const PageFooterStyle = styled.footer` 
  margin-top: 3rem;
  padding: 1.5rem;
  border-top: 5px solid gray;
  text-align: center;
`

const PageFooter = () => {
    return (
        <PageFooterStyle>
            @2024 Lee Min Sung, powered by Gatsby Haon Blog
        </PageFooterStyle>
    )
}

export default PageFooter