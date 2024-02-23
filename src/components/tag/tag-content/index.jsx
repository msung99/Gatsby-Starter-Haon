import React from "react";
import PostList from "../../postlist";
import styled from "styled-components";

const TagsContent = ({posts, totalCount}) => {
    const description = `${totalCount} post${totalCount === 1 ? "" : "s"} found`;
    return (
        <div>
            <PostDescription>{description}</PostDescription>
            <PostList posts={posts}/>
        </div>
    )
}

const PostDescription = styled.span`
  color: white;
  font-size: 18px;
  margin-bottom: 20px;
`

export default TagsContent