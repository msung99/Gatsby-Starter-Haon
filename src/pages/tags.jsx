import React from "react"
import { Link, graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"
import styled from "styled-components"
import AllTagList from "../components/tags"
import Seo from "../components/seo"

const TagListTemplate = ({ data, location }) => {
  const tags = data.allMarkdownRemark.group
  const allCount = tags.length
  const author = data.site.siteMetadata.author
  
  return (
    <PageLayout>
      <Seo title={author} description={tags}/>
      <TagListWrapper>
        <AllTagList tags={tags} allCount={allCount}></AllTagList>
      </TagListWrapper>
    </PageLayout>
  )
}

const TagListWrapper = styled.div`
  @media(max-width: 768px) {
    padding: 0 30px;
  }
`

export default TagListTemplate

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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt(pruneLength: 500, truncate: true)
        fields {
          slug
        }
        frontmatter {
          title
          description
          date
          tags
          previewImage
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`