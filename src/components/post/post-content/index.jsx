import React from "react";
import styled from "styled-components"

const PostContent = styled.div`
  section > h1 {
    font-size: 2rem;
    color: white;
    margin-bottom: 50px;
  }

  section > h2 {
    font-size: 1.7rem;
    color: white;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  section > h3 {
    font-size: 1.4rem;
    color: white;
    margin-top: 40px;
    margin-bottom: 50px;
  }

  section > h4 {
    font-size: 1.1rem;
    color: white;
    margin-bottom: 50px;
  }

  section > p {
    font-size: 17px;
    line-height: 160%; 
    color: white;
  }

  blockquote {
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 40px;
    margin-top: 40px;
    border-left: 6px solid #484848;
    font-size: 1.15rem;
  }

  hr {
    height: 1px;
    border: 0;
    margin-top: 70px;
    margin-bottom: 70px;
    background-color: gray;
  }

  a {
    color: white;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  li {
    line-height: 180%; 
  }

  .gatsby-highlight {
    font-size: 14px;
  }
  
  .language-text {
    background-color: #686868;
    padding: -10px;
    font-size: 14px;
    color: white;
    width: 100%;
    height: 100%;
  }
}
`

export default PostContent