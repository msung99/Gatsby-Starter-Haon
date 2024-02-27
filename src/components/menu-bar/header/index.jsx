import { Link } from "gatsby";
import React from "react"
import styled from "styled-components";
import { useLocation } from "@reach/router";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { MdOutlineDarkMode, MdOutlineBookmarks } from "react-icons/md";
import { GiBlackBook } from "react-icons/gi";

const menuItems = [
    { to: '/search', icon: <IoIosSearch className="icon" size="25" />, text: 'Search' },
    { to: '/bright-mode', icon: <MdOutlineDarkMode className="icon" size="28" />, text: 'Dark/Light Mode' },
    { to: '/tags', icon: <MdOutlineBookmarks className="icon" size="25" />, text: 'Tags' },
    { to: '/series', icon: <GiBlackBook className="icon" size="25" />, text: 'Series' },
    { to: '/about', icon: <GoPeople className="icon" size="25" />, text: 'About' },
    { to: '/community', icon: <GoComment className="icon" size="25" />, text: 'Community' },
];


const HeaderMenuBar = () => {
    const location = useLocation();

    return (
        <NavigatoWrapper>
            <Link style={{ textDecoration: "none" }} to="/">
                <Title>Haon Blog</Title>
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
  color: white;
  font-weight: bold;
  margin-left: 20px;
  background-color: #1d1d1d;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const NavigatoWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2.5px solid #282828;
  width: 100%;
  background-color: #1d1d1d;
  z-index: 1000;
`;

const MenuContainer = styled.div`
  display: flex;
  margin-right: 40px;
  max-width: 40%;
`;

const SideMenu = styled.span`
  margin-right: 12px; 
  color: white;
  transition: background-color 0.2s ease-in-out;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? "#1e1e1e" : "transparent")};

  &:hover {
    background-color: ${(props) => (props.active ?  "#1e1e1e" : "#282828")};
  }
`;

export default HeaderMenuBar;
