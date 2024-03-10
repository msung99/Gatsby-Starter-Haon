import React, { useState } from "react";
import kebabCase from "lodash.kebabcase";
import { Link } from "gatsby";
import styled from "styled-components";

const SimpleTagList = ({ tags, allCount, posts }) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const maxVisibleTags = 40;

  const filteredPosts = posts || [];
  
  const filteredTags = tags.filter(tag => {
    const privatePosts = filteredPosts.filter(post => 
      post.frontmatter && 
      post.frontmatter.tags && 
      post.frontmatter.tags.includes(tag.fieldValue) && 
      post.frontmatter.isPrivate
    );

    return privatePosts.length === 0;
  });

  const visibleTags = showAllTags ? filteredTags : filteredTags.slice(0, maxVisibleTags);

  return (
    <TagListStyle>
      <div>
        <TagTitle>Tags ({filteredTags.length})</TagTitle>
        {filteredTags.length > maxVisibleTags && (
          <ShowMoreButton onClick={() => setShowAllTags(!showAllTags)}>
            {showAllTags ? 'Less' : 'More'}
          </ShowMoreButton>
        )}
        {visibleTags.map(tag => (
          <TagStyle key={kebabCase(tag.fieldValue)}>
            <span>
              <StyledLink to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {(tag.fieldValue)} <TagCountStyle>({tag.totalCount})</TagCountStyle>
              </StyledLink>
            </span>
          </TagStyle>
        ))}
      </div>
    </TagListStyle>
  );
};

const TagListStyle = styled.div`
  margin-left: 50px;
  line-height: 30px;
  display: flex;
  margin-left: 0px;
  padding-bottom: 40px;
  border-bottom: 1.5px solid ${props => props.theme.main.border};
  position: relative;
`;

const TagTitle = styled.div`
  font-size: 14px;
  margin-left: 7px;
  margin-bottom: 3px;
  color: ${props => props.theme.tag.text};
  font-weight: bold;
`;

const TagStyle = styled.div`
  float: left;
  padding-left: 10px;
  font-size: 13.5px;
  transition: color 1s;

  &:hover {
    color: #f0f0f0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  transition: color 1s;
  color: ${props => props.theme.tag.text};

  &:hover {
    color: #999;
  }
`;

const TagCountStyle = styled.span`
  color: ${props => props.theme.tag.count};
  font-size: 13px;
  transition: color 1s;

  &:hover {
    color: #999;
  }
`;

const ShowMoreButton = styled.button`
  background-color: ${props => props.theme.tag.background};
  border: none;
  cursor: pointer;
  color: ${props => props.theme.main.text};
  font-size: 12.5px;
  padding: 3px 6px;
  border-radius: 5px;
  margin-top: 10px;
  position: absolute; 
  bottom: 8px;
  left: 5px;
  transition: background-color 0.5s;

  &:hover {
    background-color: ${props => props.theme.tag.hover};
  }
`;


export default SimpleTagList;
