// TagsHeader.jsx
import styled from "styled-components";
import React from "react";
import kebabCase from "lodash.kebabcase";
import { Link } from "gatsby";
import { FaTags } from "react-icons/fa";

const TagsHeader = ({tagName, tags, posts }) => {
    const relatedTags = tags.filter(relatedTag =>
        posts.some(post => 
            post.frontmatter.tags.includes(relatedTag) && !post.frontmatter.isPrivate
        )
    );

    return (
        <TagsHeaderStyle>
            <Title>#{tagName}</Title>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px"}}>
                <TagIcon/>
                <RelatedDescription>Related Tags ({relatedTags.length})</RelatedDescription>
            </div>
            <div>
                {relatedTags.map((relatedTag) => (
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

const TagIcon = styled(FaTags)`
    font-size: 25px;
    color: ${props => props.theme.main.text};
    margin-bottom: 15px;
`;

const TagsHeaderStyle = styled.div`
    padding-bottom: 50px;
    border-bottom: 1px solid  ${props => props.theme.main.border};
`;

const Title = styled.h1`
    color: ${props => props.theme.main.text};
    background-color: ${props => props.theme.tag.background};
    display: inline-block;
    padding: 10px 10px 20px 10px;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 40px;
`;

const RelatedDescription = styled.h2`
    color: ${props => props.theme.main.text};
    font-size: 20px;
    margin-bottom: 20px;
    margin-left: 10px;
    font-weight: 600;
`;

const RelatedTag = styled.span`
    position: relative;
    color: ${props => props.theme.main.text};
    font-size: 14px; 
    margin-right: 25px; 
    margin-bottom: 8px; 
    padding: 8px 15px;
    background-color: ${props => props.theme.tag.background};
    display: inline-block;
    line-height: 1; 
    vertical-align: middle; 
    transition: background-color 0.3s ease-in-out;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: -15px;
        border-width: 15.6px 0 15.6px 15.6px; 
        border-style: solid;
        border-color: transparent transparent transparent ${props => props.theme.tag.background};
        transition: border-color 0.3s ease-in-out; 
    }

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -3px;
        width: 6px;
        height: 6px;
        background-color: ${props => props.theme.tag.circle};
        border-radius: 50%;
        transform: translateY(-50%);
    }

    &:hover {
        background-color: ${props => props.theme.tag.hover};

        &::before {
            border-color: transparent transparent transparent ${props => props.theme.tag.hover};
        }
    }
`;

export default TagsHeader;
