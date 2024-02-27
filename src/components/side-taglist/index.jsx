import React from "react"
import kebabCase from "lodash.kebabcase"
import { Link } from "gatsby";
import styled from "styled-components";

const TagList = ({ tags, allCount }) => {
  return (
    <TagListStyle>
      <div>
        <TagTitle>Tags ({allCount})</TagTitle>
        {tags.map(tag => (
          <TagStyle key={kebabCase(tag.fieldValue)}>
            <span>
              <Link style={{ textDecoration: "none", color: "#cdd4d9" }} to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {kebabCase(tag.fieldValue)} <TagCountStyle>({tag.totalCount})</TagCountStyle>
              </Link>
            </span>
          </TagStyle>
        ))}
      </div>
    </TagListStyle>
  )
}

const TagListStyle = styled.div`
  margin-left: 50px;
  line-height: 30px;
  display: flex;
  margin-left: 0px;
  padding-bottom: 40px;
  border-bottom: 1px solid #282828;
`

const TagTitle = styled.div`
  font-size: 18px;
  margin-left: 7px;
  margin-bottom: 2px;
  color: gray;
`

const TagStyle = styled.div`
  float: left;
  padding-left: 10px;
  font-size: 16px;
  transition: color 1s;

  &:hover {
    color: #f0f0f0; 
  }
`

const TagCountStyle = styled.span`
  color: gray;
  font-size: 13px;
  transition: color 1s;

  &:hover {
    color: #999; 
  }
`


export default TagList;
