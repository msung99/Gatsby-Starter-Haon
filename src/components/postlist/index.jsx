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
                 <>
                    <Excerpt>{description}</Excerpt>
                </>
            )
        })}
        </PostListStyle>
    )
}

const Excerpt = styled.p`
  margin-bottom: 32px;
  line-height: 3.0;
  font-size: 18px;
  color: white;
`


const PostListStyle = styled.div`
`

export default PostList