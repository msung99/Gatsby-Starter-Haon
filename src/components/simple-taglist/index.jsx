import React from "react";
import kebabCase from "lodash.kebabcase";
import { Link } from "gatsby";
import styled from "styled-components";

const SimpleTagList = ({ tags, allCount }) => {
  return (
    <TagListStyle>
      <div>
        <TagTitle>Tags ({allCount})</TagTitle>
        {tags.map(tag => (
          <TagStyle key={kebabCase(tag.fieldValue)}>
            <span>
              <StyledLink to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {kebabCase(tag.fieldValue)} <TagCountStyle>({tag.totalCount})</TagCountStyle>
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
  border-bottom: 1px solid #282828;
`;

const TagTitle = styled.div`
  font-size: 16px;
  margin-left: 7px;
  margin-bottom: 2px;
  color: ${props => props.theme.tag.simple.title};
  font-weight: bold;
`;

const TagStyle = styled.div`
  float: left;
  padding-left: 10px;
  font-size: 16px;
  transition: color 1s;

  &:hover {
    color: #f0f0f0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  transition: color 1s;
  color: ${props => props.theme.tag.simple.text};

  &:hover {
    color: #999;
  }
`;

const TagCountStyle = styled.span`
  color: ${props => props.theme.tag.simple.count};
  font-size: 13px;
  transition: color 1s;

  &:hover {
    color: #999;
  }
`;

export default SimpleTagList;
