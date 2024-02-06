import React from "react"
import styled from "styled-components"

//TODO: PageHeader 를 네비게이션 바로 대체 필요 /
// PageContent 내부에다 childern (EX. Post) 선언 필요
// PageFooter : 그대로 냅두면 됌
const PageHeader = () => {
    return (
         <PageHeaderStyle>
            Haon.blog
         </PageHeaderStyle>
    )
}

const PageHeaderStyle = styled.header`
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  background-color: green;
`

export default PageHeader