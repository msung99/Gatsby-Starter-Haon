import React from "react"
import { graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"
import Profile from "../components/profile"
import Utterances from "../components/utterances/index.jsx"
import styled from "styled-components"

const CommunityTemplate = ({ data }) => {
  const title = data.site.siteMetadata?.title || `Title`
  const description = data.site.siteMetadata.description
  const author = data.site.siteMetadata.author
  const siteUrl = data.site.siteMetadata.siteUrl
  const keywords = data.site.siteMetadata.keywords
  
  return (
    <PageLayout>
      <Profile author={author} description={description} siteUrl={siteUrl} keywords = {keywords}/>
      <Description>Leave a comment to connect with this author 👋</Description>
      <Description>페이스북, 인스타 이모티콘들</Description>
      <Utterances repo='msung99/Gatsby-Starter-Haon' theme='github-dark' />
    </PageLayout>
  )
}


const Description = styled.p`
  font-size: 18px;
  color: white;
`

export default CommunityTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        keywords
      }
    }
  }
`