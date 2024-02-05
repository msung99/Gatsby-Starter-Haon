import React from "react";
import styled from "styled-components";

const PostHeader = ({title, date, author}) => {
    return (
        <PostMargin>
            <PostTitle>
                {title}
            </PostTitle>
            <PostInformation>
                Posted by{' '} 
                <PostAuthor>@{author}</PostAuthor>,
                {'   '}{date}
            </PostInformation>
        </PostMargin>
    )
}

const PostMargin = styled.div`
  color: #fff;
`

const PostTitle = styled.h1`
  font-size: 40px;
`

const PostInformation = styled.div`
  font-size: 18px;
  font-weight: 250;
  color: gray;
  padding-bottom: 50px;
  border-bottom: 1px solid #626262;
`

const PostAuthor = styled.span`
  font-weight: 800;
  color: #fff;
`

export default PostHeader