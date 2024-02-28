import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const PostFooter = ({ previous, next }) => {
    return (
        <div>
            <More>More.</More>
            <FooterWrapper>
                <PostMoveButton to={previous ? previous.fields.slug : "#"} hasContent={!!previous}>
                    <Description>{previous ? "🪐" : "😵"} prev</Description>
                    <ButtonText>{previous ? previous.frontmatter.title : "Oops.. There is no contents!"}</ButtonText>
                </PostMoveButton>
                <PostMoveButton to={next ? next.fields.slug : "#"} hasContent={!!next}>
                    <Description>{next ? "🚀" : "😵"} next</Description>
                    <ButtonText>{next ? next.frontmatter.title : "Oops.. There is no contents!"}</ButtonText>
                </PostMoveButton>
            </FooterWrapper>
        </div>
    );
};

const FooterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 100px;
`;

const More = styled.div`
  font-size: 35px;
  border-top: 1px solid #484848;
  padding-top: 70px;
  color: white;
  font-style: italic;
  font-weight: bold;
  margin-bottom: 30px;
`

const Description = styled.p`
    font-size: 18px;
    margin-bottom: 8px;
    margin-top: 0;
`;

const PostMoveButton = styled(Link)`
    color: white;
    font-size: 15px;
    padding: 5px 40px;
    width: 35%;
    height: 60px;
    text-align: center;
    border-radius: 15px;
    background-color: #3c3a39;
    text-align: center;
    overflow: hidden;
    cursor: ${props => (props.hasContent ? "pointer" : "default")};
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: ${props => (props.hasContent ? "#555555" : "#3c3a39")};
        transform: ${props => (props.hasContent ? "scale(1.03)" : "none")};
    }

    ${props => !props.hasContent && `
        cursor: default;
        &:hover {
            background-color: #3c3a39;
            transform: none;
        }
    `}
`;

const ButtonText = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 20px;
`;

export default PostFooter;
