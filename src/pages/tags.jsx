import React from "react"
import { Link, graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"
import TagList from "../components/side-taglist"

const TagListTemplate = ({ data, location }) => {
  const tags = data.allMarkdownRemark.group
  const tagsCount = tags.length
  
  return (
    <PageLayout>
        <TagList tags={tags}></TagList>
    </PageLayout>
  )
}

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