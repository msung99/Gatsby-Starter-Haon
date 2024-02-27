import { Link } from "gatsby";
import React from "react"
import styled from "styled-components";

const HeaderMenuBar = () => {
    return (
        <NavigatoWrapper>
            <Link style={{ textDecoration: "none" }} to="/">
                <Title>Haon Blog</Title>
            </Link>
        </NavigatoWrapper>
    )
}

const Title = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  border-bottom: 3px solid #282828;
  background-color: #1d1d1d;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const NavigatoWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  border-bottom: 3px solid #282828;
  background-color: #1d1d1d;
  padding-top: 10px;
  padding-bottom: 10px;
`;


export default HeaderMenuBar