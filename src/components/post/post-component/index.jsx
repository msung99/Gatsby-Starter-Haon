
import styled from "styled-components"
import PostHeader from "../post-header"
import PostContent from "../post-content"

const Post = styled.section`
  width: 50%;
  margin: 0 auto;
`

Post.Header = PostHeader
Post.Content = PostContent

export default Post
