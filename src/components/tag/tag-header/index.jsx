import styled from "styled-components";
import React from "react";
import kebabCase from "lodash.kebabcase";
import { Link } from "gatsby";

const TagsHeader = ({tagName, tags }) => {
    return (
      <TagsHeaderStyle>
        <Title>#{tagName}</Title>
        <RelatedDescription>Related Tags ({tags.length})</RelatedDescription>
        <div>
            {tags.map((relatedTag) => (
            <Link style={{ textDecoration: "none" }} to={`/tags/${kebabCase(relatedTag)}`} key={relatedTag}>
                <RelatedTag>
                    # {relatedTag}
                </RelatedTag>
            </Link>
            ))}
        </div>
      </TagsHeaderStyle>
    );
};

const TagsHeaderStyle = styled.div`
  margin-bottom: 50px;
  padding-bottom: 50px;
  border-bottom: 1px solid #282828;
`

const Title = styled.h1`
  color: white;
  background-color: #3C3A39;
  display: inline-block;
  padding: 5px;
  font-size: 30px;
  margin-bottom: 10px;
`

const RelatedDescription = styled.h2`
  color: white;
  font-size: 20px;
  margin-bottom: 20px;
`

const Name = styled.span`
  font-size: 20px;
  text-underline-offset: 5px;
  text-decoration: underline;
`

const RelatedTag = styled.span`
  color: white;
  font-size: 16px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 8px 12px;
  background-color: #3C3A39;
  border-radius: 20px;
  display: inline-block;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #555;
  }
`;

export default TagsHeader