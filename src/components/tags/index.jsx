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
            <span>
              <Link style={{ textDecoration: "none"}} to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                <Tag>
                  {kebabCase(tag.fieldValue)} <TagCountStyle>({tag.totalCount})</TagCountStyle>
                </Tag>
              </Link>
            </span>
        ))}
      </div>
    </TagListStyle>
  )
}


const TagTitle = styled.h1`
  font-size: 45px;
  color: ${props => props.theme.main.text};
  font-style: italic;
  margin-bottom: 40px;
  padding-bottom: 50px;
  border-bottom: 1px solid ${props => props.theme.main.border};
  font-weight: 700;
`

const Description = styled.h2`
  color: ${props => props.theme.main.text};
  font-size: 18px;
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
`;

const Tag = styled.span`
  position: relative;
  color: ${props => props.theme.main.text};
  font-size: 14px; 
  margin-right: 25px; 
  margin-bottom: 12px; 
  padding: 5px 10px 8px 10px;
  background-color: ${props => props.theme.tag.background};
  display: inline-block;
  transition: background-color 0.3s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -15px;
    border-width: 15.9px 0 15.9px 15.9px; 
    border-style: solid;
    border-color: transparent transparent transparent ${props => props.theme.tag.background};
    transition: border-color 0.3s ease-in-out; 
  }

  &::after {
    content: '';
    position: absolute;
    top: 44%;
    right: -3px;
    width: 6px;
    height: 6px;
    background-color: ${props => props.theme.tag.circle};
    border-radius: 50%;
    transform: translateY(-50%);
  }

  &:hover {
    background-color:${props => props.theme.tag.hover};

    &::before {
      border-color: transparent transparent transparent ${props => props.theme.tag.hover};
    }
  }
`;



export default AllTagList;
