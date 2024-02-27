import React from "react"
import kebabCase from "lodash.kebabcase"
import { Link } from "gatsby";
import styled from "styled-components";

const AllTagList = ({ tags, allCount }) => {
  return (
    <TagListStyle>
      <div>
        <TagTitle>Tags.</TagTitle>
        <Description>{allCount} tags are found.</Description>
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
  line-height: 30px;
  display: flex;
  margin-left: 0px;
  padding-bottom: 60px;
  border-bottom: 1px solid #282828;
`

const TagTitle = styled.h1`
  font-size: 45px;
  color: #fff;
  font-style: italic;
  margin-bottom: 40x;
  padding-bottom: 50px;
  border-bottom: 1px solid #282828;
`

const Description = styled.h2`
  color: white;
  font-size: 20px;
  margin-bottom: 30px;
  margin-left: 5px;
`

const TagCountStyle = styled.span`
  color: gray;
  font-size: 13px;
  transition: color 1s;

  &:hover {
    color: #999; 
  }
`

const TagStyle = styled.span`
  position: relative;
  color: white;
  font-size: 15px;
  margin-right: 30px;
  margin-bottom: 10px;
  padding: 0.1px 10px 4px 8px;
  background-color: #3C3A39;
  display: inline-block;
  transition: background-color 0.3s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -18px;
    border-width: 17.9px 0 17.9px 17.9px; 
    border-style: solid;
    border-color: transparent transparent transparent #3C3A39;
    transition: border-color 0.3s ease-in-out; /* Add transition property for border color */
  }

  &::after {
    content: '';
    position: absolute;
    top: 48%;
    right: -4px;
    width: 7px;
    height: 7px;
    background-color: white;
    border-radius: 50%;
    transform: translateY(-50%);
  }

  &:hover {
    background-color: #555;

    &::before {
      border-color: transparent transparent transparent #555;
    }
  }
`;



export default AllTagList;
