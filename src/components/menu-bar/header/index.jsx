import { Link } from "gatsby";
import React from "react"
import styled from "styled-components";
import { useLocation } from "@reach/router";
import { MdOutlineDarkMode } from "react-icons/md";
import { siteMetadata } from "../../../../gatsby-config";
import { IoSearch } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";


const menuItems = [
    { to: '/search', icon: <IoSearch className="icon" size="25" />, text: 'Search' },
    { to: '/bright-mode', icon: <MdOutlineDarkMode className="icon" size="28" />, text: 'Dark/Light Mode' },
    { to: '/tags', icon: <IoBookmarks className="icon" size="25" />, text: 'Tags' },
    { to: '/series', icon: <FaBook className="icon" size="25" />, text: 'Series' },
    { to: '/about', icon: <BsFillPeopleFill className="icon" size="25" />, text: 'About' },
    { to: '/community', icon: <FaCommentAlt className="icon" size="23" />, text: 'Community' },
];


const HeaderMenuBar = () => {
    const location = useLocation();

    return (
        <NavigatoWrapper>
            <Link style={{ textDecoration: "none" }} to="/">
                <Title>{siteMetadata.title}</Title>
            </Link>
            <MenuContainer>
                {menuItems.map((item, index) => (
                    <MenuItem key={index} {...item} active={location.pathname === item.to} />
                ))}
            </MenuContainer>
        </NavigatoWrapper>
    )
}

const MenuItem = ({ to, icon, text }) => {
    const location = useLocation();
    const isActive = to === '/' ? location.pathname === to : location.pathname.startsWith(to);
  
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        <SideMenu active={isActive}>
          {icon}
        </SideMenu>
      </Link>
    );
};

const Title = styled.header`
  font-size: 24px;
  color: ${props => props.theme.main.text};
  font-weight: bold;
  margin-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const NavigatoWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2.5px solid  ${props => props.theme.menuBar.border};
  width: 100%;
  background-color: ${props => props.theme.menuBar.wrapper};
  z-index: 1000;
`;

const MenuContainer = styled.div`
  display: flex;
  margin-right: 40px;
  max-width: 40%;
`;

const SideMenu = styled.span`
  margin-right: 12px; 
  color: ${props => props.theme.main.text};
  transition: background-color 0.2s ease-in-out;
  border-radius: 8px;
`;

export default HeaderMenuBar;
