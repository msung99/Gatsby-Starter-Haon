import React from "react"
import styled from "styled-components"
import { useState, useEffect } from "react";
import { Link } from "gatsby";

const PageNavigator = () => {  
  return (
    <PageNavigatorStyle>
      <Link style={{ textDecoration: "none"}} to = "/">
        <PageNavigatorTitle>
          Haon Blog
        </PageNavigatorTitle>
      </Link>
  	</PageNavigatorStyle>
  )
}

const PageNavigatorStyle = styled.header`
  position: fixed;
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  opacity: 0.9;
  margin-top: 0.8rem;
  padding-bottom: 10px;
  border-bottom: 1px solid #282828;
`
//   border-bottom: 1px solid gray;

const PageNavigatorTitle = styled.div`
  font-size: 28px;
  margin-left: 30px;
  color: white;
`

export default PageNavigator