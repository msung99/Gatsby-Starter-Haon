import React from "react"
import kebabCase from "lodash.kebabcase"
import { Link } from "gatsby";
import styled from "styled-components";

const TagList = ({ tags }) => {
    return (
        <TagListStyle>
            <TagListTitle>Tag List</TagListTitle>
            <SplitLine/>
            <div>
                {tags.map(tag => (
                    <TagStyle>
                        <span key={kebabCase(tag.fieldValue)}>
                            <Link style={{ textDecoration: "none", color: "white"}} to={`/tags/${kebabCase(tag.fieldValue)} `}>
                                {kebabCase(tag.fieldValue)} <TagCountStyle>({tag.totalCount})</TagCountStyle>
                            </Link>
                        </span>
                    </TagStyle>
                ))}
            </div>
        </TagListStyle>
    )
}

const TagListStyle = styled.aside`
  position: fixed;
  font-size: 16px;
  margin-left: 50px;
  line-height: 30px;
  width: 20%;

  @media(max-width: 900px) {
    display: none;
  }
`

const SplitLine = styled.div`
  
`

const TagListTitle = styled.h3`
  font-size: 20px;
  color: gray;
`

const TagStyle = styled.div`
  &:hover {
    opacity: 0.8;
  }
  float: left;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 20px;
  border: 2px solid gray;
  margin-right: 5px;
`

const TagCountStyle = styled.span`
  color: gray;
`

// border-radius: 20px;


export default TagList;
