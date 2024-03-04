import React from "react";
import PostList from "../../postlist";
import styled from "styled-components";

const TagsContent = ({posts, totalCount}) => {
    const tagDescription = `There are ${totalCount} post${
        totalCount === 1 ? "" : "s"} found.`

    return (
        <div>
            <Title>{tagDescription}</Title>
            <PostList posts={posts}/>
        </div>
    )
}

const Title = styled.h1`
  color: ${props => props.theme.main.text};
  font-size: 17px;
  font-weight: 700;
  margin-top: 30px;
`

export default TagsContent