// TagsContent.jsx
import React from "react";
import PostList from "../../postlist";
import styled from "styled-components";

const TagsContent = ({posts}) => {
    const filteredPosts = posts.filter(post => !post.frontmatter.isPrivate);
    const totalCount = filteredPosts.length;

    const tagDescription = `There ${totalCount === 1 ? "is" : "are"} ${totalCount} post${
        totalCount === 1 ? "" : "s"} found.`;

    return (
        <div>
            <Title>{tagDescription}</Title>
            <PostList posts={filteredPosts}/>
        </div>
    )
}

const Title = styled.h1`
  color: ${props => props.theme.main.text};
  font-size: 17px;
  font-weight: 700;
  margin-top: 30px;
`

export default TagsContent;
