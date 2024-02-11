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
  border-bottom: 3px solid #282828;
  background-color: #1d1d1d;
  padding-top: 10px;
  padding-bottom: 10px;
  opacity: 0.9;
`
//   border-bottom: 1px solid gray;

const PageNavigatorTitle = styled.div`
  font-size: 28px;
  margin-left: 30px;
  color: white;
`

export default PageNavigator