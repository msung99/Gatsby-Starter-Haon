import styled from "styled-components";
import React from "react";

const TagsHeader = ({totalCount, tagName}) => {
    const tagDescription = `${totalCount} post${
        totalCount === 1 ? "" : "s"
    } tagged with`

    return (
        <div>
            <Title>#TAG</Title>
            <Description>
                {tagDescription} <Name>#{tagName}</Name>
            </Description>
        </div>
    )
}

const Title = styled.h2`
  color: white;
  background-color: #3C3A39;
  display: inline-block;
  padding: 5px;
  font-size: 30px;
  margin-bottom: 3px;
`

const Description = styled.h3`
  color: white;
  margin-bottom: 60px;
  font-size: 25px;
`

const Name = styled.span`
  font-size: 30px;
  text-underline-offset: 5px;
  text-decoration: underline;
`

export default TagsHeader