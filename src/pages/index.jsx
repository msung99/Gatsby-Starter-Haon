// index.jsx
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
  const filteredPosts = posts.filter(post => !post.frontmatter.isPrivate);
  const tags = data.allMarkdownRemark.group

  // 공개인 포스트의 태그와 비공개인 포스트의 태그를 구분하여 개수 계산
  const publicTags = data.allMarkdownRemark.group
    .filter(tag => tag.nodes.some(post => !post.frontmatter.isPrivate))
    .map(tag => ({ ...tag, totalCount: tag.nodes.filter(post => !post.frontmatter.isPrivate).length }));

  // 필터링된 태그의 개수
  const filteredTagsCount = tags.length - publicTags.reduce((acc, tag) => acc + tag.totalCount, 0);

  return (
    <PageLayout>
      <Seo title={author} description={description}/>
      <Profile author={author} description={description} siteUrl={siteUrl} keywords={keywords}/>
      <SimpleTagList tags={publicTags} allCount={filteredTagsCount}/>
      <PostCount>All Posts ({filteredPosts.length})</PostCount>
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
          isPrivate
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
        nodes {
          frontmatter {
            isPrivate
          }
        }
      }
    }
  }
`

// ... (이전 SimpleTagList 컴포넌트 코드 생략)
