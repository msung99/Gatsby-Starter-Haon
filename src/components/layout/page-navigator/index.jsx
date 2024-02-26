import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "gatsby";
import SideMenuBar from "../../side-menu-bar";

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

const PageNavigator = () => {
  const [showHaonBlog, setShowHaonBlog] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowHaonBlog(window.innerWidth < 1200);
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
        <PageNavigatorStyle>
          <Link style={{ textDecoration: "none" }} to="/">
            <PageNavigatorTitle>
              Haon Blog
            </PageNavigatorTitle>
          </Link>
        </PageNavigatorStyle>
      ) : (
        <SideMenuBarWrapper show={!showHaonBlog}>
          <SideMenuBar />
        </SideMenuBarWrapper>
      )}
    </>
  );
};

const PageNavigatorStyle = styled.header`
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

const PageNavigatorTitle = styled.div`
  font-size: 28px;
  margin-left: 30px;
  color: white;
`;

const SideMenuBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: ${({ show }) => (show ? "0" : "-100%")};
  width: 300px;
  height: 100%;
  background-color: #1d1d1d;
  padding-top: 60px;
  animation: ${({ show }) => (show ? slideIn : slideOut)} 0.5s ease;
  z-index: 999; /* Ensure it's above other content */

  @media (max-width: 1200px) {
    display: none;
  }
`;

export default PageNavigator;
