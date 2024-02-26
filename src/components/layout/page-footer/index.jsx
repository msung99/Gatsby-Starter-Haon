import React from "react"
import styled from "styled-components";

const PageFooterStyle = styled.footer` 
  margin-top: 20px;
  padding: 10px 0;
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