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
          <Tag key={kebabCase(tag.fieldValue)}>
            <span>
              <Link style={{ textDecoration: "none", color: "#cdd4d9" }} to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {kebabCase(tag.fieldValue)} <TagCountStyle>({tag.totalCount})</TagCountStyle>
              </Link>
            </span>
          </Tag>
        ))}
      </div>
    </TagListStyle>
  )
}


const TagTitle = styled.h1`
  font-size: 45px;
  color: #fff;
  font-style: italic;
  margin-bottom: 40px;
  padding-bottom: 50px;
  border-bottom: 1px solid #282828;
  font-weight: 700;
`

const Description = styled.h2`
  color: white;
  font-size: 20px;
  margin-bottom: 40px;
  margin-left: 5px;
  font-weight: 550;
`

const TagCountStyle = styled.span`
  color: gray;
  font-size: 13px;
  transition: color 1s;

  &:hover {
    color: #999; 
  }
`

const TagListStyle = styled.div`
  line-height: 17px; 
  display: flex;
  padding-bottom: 60px;
  border-bottom: 1px solid #282828;
`;

const Tag = styled.span`
  position: relative;
  color: white;
  font-size: 14px; 
  margin-right: 25px; 
  margin-bottom: 12px; 
  padding: 5px 10px 8px 10px;
  background-color: #3C3A39;
  display: inline-block;
  transition: background-color 0.3s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -15px;
    border-width: 15.9px 0 15.9px 15.9px; 
    border-style: solid;
    border-color: transparent transparent transparent #3C3A39;
    transition: border-color 0.3s ease-in-out; 
  }

  &::after {
    content: '';
    position: absolute;
    top: 44%;
    right: -3px;
    width: 6px;
    height: 6px;
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
