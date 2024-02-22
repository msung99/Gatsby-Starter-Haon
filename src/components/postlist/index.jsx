import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

const PostList = ({posts}) => { 
    const [postCount, setPostCount] = useState(10)

    useEffect(() => {
        setPostCount(10)
    }, [posts])

    return (
        <PostListStyle>
            {posts.slice(0, postCount).map((post, i) => {
               const title = post.frontmatter.title || post.fields.slug
               const description = post.frontmatter.description
               const date = post.frontmatter.date;
               
               return (
                <Link style={{ textDecoration: "none"}} to = {post.fields.slug}>
                  <PostStyle>
                      <PostTitle>{title}</PostTitle>
                      <Excerpt>{description}</Excerpt>
                      <PostDate>{date}</PostDate>
                  </PostStyle>
                </Link>
            )
        })}
        </PostListStyle>
    )
}

const PostStyle = styled.div`
  border-bottom: 1px solid #282828;
  cursor: pointer;
  padding-bottom: 50px;
  &:hover {
    opacity: 0.8;
  }
`

const PostTitle = styled.h1`
  color: white;
  font-size: 2rem;
  margin-top: 40px;
  margin-bottom: 40px;
`

const Excerpt = styled.p`
  margin-bottom: 32px;
  font-size: 17px;
  color: #e9e9e9;
  line-height: 150%;
`

const PostDate = styled.p`
  font-size 18px;
  color: gray;
`

const PostListStyle = styled.div`
  width: 70%;
`

export default PostList