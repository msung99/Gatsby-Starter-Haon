import React from "react"
import { Link, graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"
import TagList from "../components/side-taglist"
import styled from "styled-components"

const TagListTemplate = ({ data, location }) => {
  const tags = data.allMarkdownRemark.group
  const tagsCount = tags.length
  
  return (
    <PageLayout>
        <TagListWrapper>
          <TagList tags={tags}></TagList>
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
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`