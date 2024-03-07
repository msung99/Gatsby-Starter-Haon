import React from "react";
import styled from "styled-components"
import TableOfContents from "../../toc";
import { ContentWrapper, HtmlWrapper } from "./post-style";

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



export default PostContent