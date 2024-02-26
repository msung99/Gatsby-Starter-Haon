import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { SideMenuBar } from "../../side-menu-bar";

const PageNavigator = () => {
  const [showSideMenuBar, setShowSideMenuBar] = useState(false);

  useEffect(() => {
    // Function to handle route changes
    const handleRouteChange = () => {
      // Set showSideMenuBar to true when navigating to a new page
      setShowSideMenuBar(true);
    };

    // Add event listener for route changes
    document.addEventListener("gatsbyRouteUpdate", handleRouteChange);

    // Remove event listener on component unmount
    return () => {
      document.removeEventListener("gatsbyRouteUpdate", handleRouteChange);
    };
  }, []);

  return (
    <>
      <PageNavigatorStyle show={showSideMenuBar}>
        <Link style={{ textDecoration: "none" }} to="/">
          <PageNavigatorTitle>Haon Blog</PageNavigatorTitle>
        </Link>
      </PageNavigatorStyle>
      <SideMenuBar show={showSideMenuBar} />
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
  opacity: 0.9;
  transition: opacity 0.5s ease; /* Add a fade-in transition */

  ${({ show }) => !show && `
    opacity: 0; /* Hide when showSideMenuBar is false */
  `}
`;

const PageNavigatorTitle = styled.div`
  font-size: 28px;
  margin-left: 30px;
  color: white;
`;

export default PageNavigator;
