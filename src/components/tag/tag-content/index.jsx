import React from "react";
import PostList from "../../postlist";
import styled from "styled-components";

const TagsContent = ({posts, totalCount}) => {
    const tagDescription = `${totalCount} post${
        totalCount === 1 ? "" : "s"} found.`

    return (
        <div>
            <Title>{tagDescription}</Title>
            <PostList posts={posts}/>
        </div>
    )
}

const Title = styled.h1`
  color: white;
  font-size: 22px;
  margin-bottom: 50px;
`

export default TagsContent