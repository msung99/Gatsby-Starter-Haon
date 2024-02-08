import React from "react"
import styled from "styled-components"
import { useState, useEffect } from "react";

const PageNavigator = () => {  
  return (
    <PageNavigatorStyle>
      Haon.blog
  	</PageNavigatorStyle>
  )
}

const PageNavigatorStyle = styled.header`
  position: fixed;
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  background-color: #black; 
  opacity: 0.9;
  border-bottom: 1px light gray;
  margin-top: 0.8rem;
`

export default PageNavigator