import React from "react"
import { Link, graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"
import PostList from "../components/postlist"
import TagList from "../components/side-taglist"
import Seo from "../components/seo"
import SideMenuBar from "../components/side-menu-bar"
import Profile from "../components/profile"

const PostListTemplate = ({ data, location }) => {
  const title = data.site.siteMetadata?.title || `Title`
  const description = data.site.siteMetadata.description
  const author = data.site.siteMetadata.author
  const siteUrl = data.site.siteMetadata.siteUrl

  const posts = data.allMarkdownRemark.nodes
  const tags = data.allMarkdownRemark.group
  
  return (
    <PageLayout>
      <Profile author={author} description={description} title={title} siteUrl={siteUrl}/>
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
        description
        author
        siteUrl
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