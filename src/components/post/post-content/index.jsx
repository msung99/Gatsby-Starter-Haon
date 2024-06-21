import React from "react";
import styled from "styled-components"
import TableOfContents from "../../toc";
import { ContentWrapper, HtmlWrapper } from "./post-style";
import CodeHighLight from "./code-highlight";

const PostContent = ({html, toc}) => {
  return (
    <ContentWrapper>
      <TableOfContents content={toc}/>
      <CodeHighLight/>
      <HtmlWrapper>
        <section dangerouslySetInnerHTML={{ __html: html}} itemProp="postContent" />
      </HtmlWrapper>
    </ContentWrapper>
  )
}



export default PostContent