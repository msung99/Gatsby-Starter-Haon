import React from "react"
import styled from "styled-components";

const PageFooterStyle = styled.footer` 
  margin-top: 20px;
  text-align: center;
  color: gray;
  height: 0px;
  position : relative;
  transform : translateY(-100%);
`

const PageFooter = () => {
    return (
        <PageFooterStyle>
            @2024 Lee Min Sung, powered by Gatsby Haon Blog
        </PageFooterStyle>
    )
}

export default PageFooter