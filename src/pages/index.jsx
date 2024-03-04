import React from "react"
import { graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"
import PostList from "../components/postlist"
import Profile from "../components/profile"
import SimpleTagList from "../components/simple-taglist"
import styled from "styled-components"
import Seo from "../components/seo"

const PostListTemplate = ({ data, location }) => {
  const description = data.site.siteMetadata.description
  const author = data.site.siteMetadata.author
  const siteUrl = data.site.siteMetadata.siteUrl
  const keywords = data.site.siteMetadata.keywords

  const posts = data.allMarkdownRemark.nodes
  const tags = data.allMarkdownRemark.group
  const tagsCount = tags.length
  
  return (
    <PageLayout>
      <Seo title={author} description={description}/>
      <Profile author={author} description={description} siteUrl={siteUrl} keywords={keywords}/>
      <SimpleTagList tags={tags} allCount={tagsCount}/>
      <PostCount>All Posts ({posts.length})</PostCount>
      <PostList posts={posts}></PostList>
    </PageLayout>
  )
}

const PostCount = styled.div`
  font-size: 15px;
  color: ${props => props.theme.tag.text};
  font-weight: bold;
  margin-left: 10px;
  padding-top: 30px;
`

export default PostListTemplate

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
          date(formatString: "MMMM DD, YYYY")
          tags
          series
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