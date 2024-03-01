import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "gatsby";
import AsideMenuBar from "../../menu-bar/aside";
import HeaderMenuBar from "../../menu-bar/header";

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PageNavigator = () => {
  const [showHaonBlog, setShowHaonBlog] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowHaonBlog(window.innerWidth < 1300);
    };

    // Set initial state based on window width
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {showHaonBlog ? (
        <HeaderMenuBar/>
      ) : (
        <SideMenuBarWrapper show={!showHaonBlog}>
          <AsideMenuBar/>
        </SideMenuBarWrapper>
      )}
    </>
  );
};

const SideMenuBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: ${({ show }) => (show ? "0" : "-100%")};
  width: 300px;
  height: 100%;
  background: ${props => props.theme.menuBar.wrapper};
  padding-top: 60px;
  animation: ${({ show }) => (show ? slideIn : slideOut)} 0.7s ease-in-out;
`;




export default PageNavigator;
