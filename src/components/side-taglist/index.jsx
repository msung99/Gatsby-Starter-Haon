import React from "react"
import kebabCase from "lodash.kebabcase"
import { Link } from "gatsby";
import styled from "styled-components";

const TagList = ({ tags }) => {
    return (
        <TagListStyle>
            <TagListTitle>Tag List</TagListTitle>
            <div>
                {tags.map(tag => (
                    <TagStyle>
                        <span key={kebabCase(tag.fieldValue)}>
                            <Link style={{ textDecoration: "none", color: "white"}} to={`/tags/${kebabCase(tag.fieldValue)} `}>
                                {kebabCase(tag.fieldValue)}
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
  width: 15%;

  @media(max-width: 900px) {
    display: none;
  }
`

const TagListTitle = styled.h3`
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
  max-width: 150px;
  max-height: 30px;
  
  text-overflow: ellipsis;
  overflow:hidden;
  white-space: nowrap;
`

// border-radius: 20px;


export default TagList;
