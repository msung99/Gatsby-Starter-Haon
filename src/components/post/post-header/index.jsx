import React from "react";
import styled from "styled-components";

const PostHeader = ({title, date, author}) => {
    return (
        <HeaderWrapper>
            <PostTitle>
                {title}
            </PostTitle>
            <PostInformation>
                Posted by{' '}
                <PostAuthor>@{author}</PostAuthor>,
                {'   '}{date} 
            </PostInformation>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
  color: #fff;
  margin-bottom: 80px;
`

const PostTitle = styled.h1`
  font-size: 38px;
  margin-bottom: 25px;
  line-height: 1.2;
  font-weight: 800;
`

const PostInformation = styled.div`
  font-size: 16px;
  color: gray;
  padding-bottom: 50px;
  border-bottom: 1px solid #626262; 
`

const PostAuthor = styled.span`
  font-weight: 800;
  color: #fff;
`
export default PostHeader