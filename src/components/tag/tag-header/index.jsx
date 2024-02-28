import styled from "styled-components";
import React from "react";
import kebabCase from "lodash.kebabcase";
import { Link } from "gatsby";
import { FaTags } from "react-icons/fa";

const TagsHeader = ({tagName, tags }) => {
    return (
      <TagsHeaderStyle>
        <Title>#{tagName}</Title>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px"}}>
              <span style={{marginBottom: "2px"}}>
                  <FaTags className="icon" size="23" color="white"/>
              </span>
              <RelatedDescription>Related Tags ({tags.length})</RelatedDescription>
          </div>
         <div>
              {tags.map((relatedTag) => (
              <Link style={{ textDecoration: "none" }} to={`/tags/${kebabCase(relatedTag)}`} key={relatedTag}>
                  <RelatedTag>
                      {relatedTag}
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
  margin-left: 10px;
`

const Name = styled.span`
  font-size: 20px;
  text-underline-offset: 5px;
  text-decoration: underline;
`

const RelatedTag = styled.span`
  position: relative;
  color: white;
  font-size: 14px; 
  margin-right: 25px; 
  margin-bottom: 8px; /* Adjusted margin-bottom for better alignment */
  padding: 8px 15px; /* Adjusted padding for better alignment */
  background-color: #3C3A39;
  display: inline-block;
  line-height: 1; /* Adjusted line-height to 1 for better alignment */
  vertical-align: middle; /* Adjusted vertical-align for better alignment */
  transition: background-color 0.3s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -15px;
    border-width: 15.6px 0 15.6px 15.6px; 
    border-style: solid;
    border-color: transparent transparent transparent #3C3A39;
    transition: border-color 0.3s ease-in-out; 
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
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







export default TagsHeader