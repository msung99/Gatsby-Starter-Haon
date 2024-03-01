import React from "react";
import styled from "styled-components";
import PostList from "../../postlist";

const SeriesContent = ({totalCount, posts}) => {
    const seriesDescription = `${totalCount} post${
        totalCount === 1 ? "" : "s"} found.`

    return (
        <div>
            <Count>{seriesDescription}</Count>       
            <PostList posts={posts}/>
        </div>
    )
}

const Count = styled.h3`
  color: white;
  font-size: 20px;
  margin-bottom: 50px;
  font-weight: 800;
`

export default SeriesContent