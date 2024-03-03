import React from "react";
import styled from "styled-components"
import TableOfContents from "../../toc";

const PostContent = ({html, toc}) => {
  return (
    <ContentWrapper>
      <TableOfContents content={toc}/>
      <HtmlWrapper>
        <section dangerouslySetInnerHTML={{ __html: html}} itemProp="postContent" />
      </HtmlWrapper>
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
  position: relative;
`;  


const HtmlWrapper = styled.div`
  section > h1 {
    font-size: 2rem;
    color: ${props => props.theme.post.content.text};
    margin-top: 70px;
    margin-bottom: 40px;
    word-break: break-all;
    font-weight: 700;
  }

  section > h2 {
    font-size: 1.7rem;
    color: ${props => props.theme.post.content.text};
    margin-top: 70px;
    margin-bottom: 40px;
    word-break: break-all;
    font-weight: 700;
  }

  section > h3 {
    font-size: 1.4rem;
    color: ${props => props.theme.post.content.text};
    margin-top: 70px;
    margin-bottom: 40px;
    word-break: break-all;
    font-weight: 700;
  }

  section > h4 {
    font-size: 1.1rem;
    color: ${props => props.theme.post.content.text};
    margin-top: 40px;
    margin-bottom: 40px;
    word-break: break-all;
    font-weight: 700;
  }

  section > h5 {
    font-size: 0.9rem;
    color: ${props => props.theme.post.content.text};
    margin-top: 40px;
    margin-bottom: 40px;
    word-break: break-all;
    font-weight: 700;
  }

  section > h6 {
    font-size: 0.7rem;
    color: ${props => props.theme.post.content.text};
    margin-top: 40px;
    margin-bottom: 40px;
    font-weight: 700;
  }

  section > p {
    font-size: 16px;
    line-height: 180%; 
    color: ${props => props.theme.post.content.text};
    margin-bottom: 35px;
    word-break: break-all;

    span {
      margin-top: 40px;
      margin-bottom: 40px;
      font-size: 100px;
    }
  }

  blockquote {
    padding-left: 18px;
    padding-right: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 50px; 
    margin-top: 50px;
    background-color: ${props => props.theme.post.content.blockquote.body};
    line-height: 170%;
    color: ${props => props.theme.post.content.blockquote.text};
    border-left: 6px solid ${props => props.theme.post.content.blockquote.left};
    word-break: break-all;
  }

  hr {
    height: 2px;
    border: 0;
    background-color: ${props => props.theme.post.content.hr};
    margin-top: 50px;
    margin-bottom: 50px;
    word-break: break-all;
  }

  a {
    color: ${props => props.theme.post.content.a};
    word-break: break-all;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  ul {
    line-height: 180%; 
    word-break: break-all;
  }

  li {
    color: ${props => props.theme.post.content.li};
    list-style-type: disc;
  }

  .gatsby-highlight {
    font-size: 14px;
    margin-bottom: 80px;
    word-break: break-all;
  }
  
  .language-text {
    background-color: ${props => props.theme.post.content.language.bg};
    padding: -10px;
    font-size: 15px;
    color: ${props => props.theme.post.content.language.text};
    width: 100%;
    height: 100%;
    word-break: break-all;
  }
}
`

export default PostContent