import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
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

const PageNavigator = () => {
  const [showHaonBlog, setShowHaonBlog] = useState(true);
  const [showSideMenu, setShowSideMenu] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setShowHaonBlog(window.innerWidth < 1300);
    };

    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        // Scroll down
        setShowSideMenu(false);
      } else {
        // Scroll up
        setShowSideMenu(true);
      }
      setLastScrollTop(st <= 0 ? 0 : st);
    };

    // Set initial state based on window width
    handleResize();

    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Remove event listeners on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <>
      {showHaonBlog ? (
        <HeaderMenuBar />
      ) : (
        <SideMenuBarWrapper show={showSideMenu}>
          <AsideMenuBar />
        </SideMenuBarWrapper>
      )}
    </>
  );
};

const SideMenuBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background: ${props => props.theme.menuBar.wrapper};
  padding-top: 60px;
  transform: translateX(${({ show }) => (show ? "0" : "-100%")});
  transition: transform 0.7s ease-in-out;
  z-index: 10;
`;

export default PageNavigator;
