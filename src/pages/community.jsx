import React from "react"
import { graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"
import Profile from "../components/profile"

const CommunityTemplate = ({ data }) => {
  const title = data.site.siteMetadata?.title || `Title`
  const description = data.site.siteMetadata.description
  const author = data.site.siteMetadata.author
  const siteUrl = data.site.siteMetadata.siteUrl
  const keywords = data.site.siteMetadata.keywords
  
  return (
    <PageLayout>
      <Profile author={author} description={description} siteUrl={siteUrl} keywords = {keywords}/>
    </PageLayout>
  )
}

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