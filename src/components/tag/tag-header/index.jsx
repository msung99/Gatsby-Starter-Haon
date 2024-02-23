import styled from "styled-components";
import React from "react";
import kebabCase from "lodash.kebabcase";
import { Link } from "gatsby";

const TagsHeader = ({totalCount, tagName, tags}) => {
    const tagDescription = `There are ${totalCount} post${
        totalCount === 1 ? "" : "s"
    } tagged with`

    return (
        <div>
            <Title>#{tagName}</Title>
            <Description>
                {tagDescription} <Name>#{tagName}</Name>
            </Description>
            <RelatedTags>
                <Description>
                    Related Tags
                </Description>
                {tags.map((relatedTag) => (
                      <RelatedTag key={relatedTag}>
                        {relatedTag}
                      </RelatedTag>
                ))}
            </RelatedTags>
        </div>
    )
}

const Title = styled.h2`
  color: white;
  background-color: #3C3A39;
  display: inline-block;
  padding: 5px;
  font-size: 30px;
  margin-bottom: 1px;
`

const Description = styled.h3`
  color: white;
  font-size: 18px;
  margin-bottom: 1px;
`

const Name = styled.span`
  font-size: 20px;
  text-underline-offset: 5px;
  text-decoration: underline;
`

const RelatedTags = styled.div`
  color; white;
  font-size: 20px;
`

const RelatedTag = styled.span`
  color: white;
`

const TagStyle = styled.span`
  color: white;
  font-size: 20px;
  margin-left: 10px;
`

export default TagsHeader