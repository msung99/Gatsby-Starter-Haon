import React from "react"
import { Link, graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"
import PostList from "../components/postlist"

const PostListTemplate = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  
  return (
    <PageLayout>
      <PostList posts={posts}></PostList>      
    </PageLayout>
  )
}

export default PostListTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
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
        }
      }
    }
  }
`