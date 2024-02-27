import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import kebabCase from "lodash.kebabcase"
import { FaTags } from "react-icons/fa"

const PostList = ({ posts }) => {
  const [postCount, setPostCount] = useState(10)

  useEffect(() => {
    setPostCount(10)
  }, [posts])

  return (
    <PostListStyle>
      {posts.slice(0, postCount).map((post, i) => {
        const title = post.frontmatter.title || post.fields.slug
        const description = post.frontmatter.description
        const date = post.frontmatter.date
        const tags = post.frontmatter.tags
        const series = post.frontmatter.series

        return (
          <Link style={{ textDecoration: "none" }} to={post.fields.slug} key={i}>
            <PostStyle>
              <PostTitle>{title}</PostTitle>
              <PostTags>
                {tags.map((tag) => (
                  <PostTag key={kebabCase(tag)}>
                    #{tag}
                  </PostTag>
                ))}
              </PostTags>
              <Excerpt>{description}</Excerpt>
              <EtcWrapper>
                <PostDate>{date} | </PostDate>
                <Horizontalspace />
                <PostSeries>Series: {series}</PostSeries>
              </EtcWrapper>
            </PostStyle>
          </Link>
        )
      })}
    </PostListStyle>
  )
}

const PostStyle = styled.div`
  border-bottom: 2px solid #282828;
  margin-top: 40px;
  cursor: pointer;
  padding-bottom: 50px;
  &:hover {
    opacity: 0.8;
  }
`

const PostTitle = styled.h1`
  color: white;
  font-size: 2rem;
  margin-bottom: 20px;
`

const Excerpt = styled.p`
  margin-top: 50px;
  margin-bottom: 32px;
  font-size: 16px;
  color: #e9e9e9;
  line-height: 150%;
`

const EtcWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Horizontalspace = styled.div`
  margin-right: 5px;
`

const PostDate = styled.p`
  font-size: 16px;
  color: gray;
  margin: 0;
`

const PostListStyle = styled.div``

const PostSeries = styled.p`
  font-size: 16px;
  color: gray;
  margin: 0;
`

const PostTags = styled.div`
  width: 100%;
`

const PostTag = styled.span`
  color: #cdd4d9;
  opacity: 0.8;
  font-size: 16px;
  margin-right: 35px;
`

export default PostList
