import React from "react"
import styled from "styled-components"
import { useState, useEffect } from "react";
import { Link } from "gatsby";

const PageNavigator = () => {
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  
    useEffect(() => {
    const handleScroll = () => {
      const moving = window.pageYOffset;
      setVisible(position > moving);
      setPosition(moving);
  	}
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position]);
  
  return (
    <PageNavigatorStyle visible={visible}>
        <Link to = {"/"}>Haon.blog</Link>
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