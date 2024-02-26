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
  @media(max-width: 768px) {
    padding: 0 20px;
  }
`;

const HtmlWrapper = styled.div`
  section > h1 {
    font-size: 2rem;
    color: #e8e8e8;
    margin-top: 70px;
    margin-bottom: 40px;
  }

  section > h2 {
    font-size: 1.7rem;
    color: #e8e8e8;
    margin-top: 70px;
    margin-bottom: 40px;
  }

  section > h3 {
    font-size: 1.4rem;
    color: #e8e8e8;
    margin-top: 70px;
    margin-bottom: 40px;
  }

  section > h4 {
    font-size: 1.1rem;
    color: #e6e6e6;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  section > p {
    font-size: 17px;
    line-height: 160%; 
    color: #e8e8e8;
    margin-bottom: 35px;
  }

  blockquote {
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 30px; 
    margin-top: 40px;
    border-left: 6px solid #484848;
    font-size: 1.15rem;
    color: #e6e6e6;
  }

  hr {
    height: 1px;
    border: 0;
    color: white;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  a {
    color: #c9c9ca;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    margin-bottom: 30px;
  }

  li {
    line-height: 180%; 
    color: #e6e6e6;
  }

  .gatsby-highlight {
    font-size: 14px;
    margin-bottom: 60px;
  }
  
  .language-text {
    background-color: #606060;
    padding: -10px;
    font-size: 15px;
    color: #e6e6e6;
    width: 100%;
    height: 100%;
  }
}
`

export default PostContent