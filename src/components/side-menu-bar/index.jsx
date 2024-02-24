import React from "react";
import styled from "styled-components";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineBookmarks } from "react-icons/md";
import { GiBlackBook } from "react-icons/gi";
import { Link } from "gatsby";

const menuItems = [
  { to: '/', icon: <IoHomeOutline className="icon" size="30" />, text: 'Home' },
  { to: '/search', icon: <IoIosSearch className="icon" size="30" />, text: 'Search' },
  { to: '/bright-mode', icon: <MdOutlineDarkMode className="icon" size="30" />, text: 'Dark/Light Mode' },
  { to: '/tags', icon: <MdOutlineBookmarks className="icon" size="30" />, text: 'Tags' },
  { to: '/series', icon: <GiBlackBook className="icon" size="30" />, text: 'Series' },
  { to: '/about', icon: <GoPeople className="icon" size="30" />, text: 'About' },
  { to: '/community', icon: <GoComment className="icon" size="30" />, text: 'Community' },
];
  
const MenuItem = ({ to, icon, text }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <SideMenu>
      {icon}
      <MenuText>{text}</MenuText>
    </SideMenu>
    </Link>
);
  
const SideMenuBar = () => (
  <SideMenuBarStyle>
    <Link to={"/"} style={{ textDecoration:'none'}}>
      <Title>Haon Blog</Title>
    </Link>
    <div>
      {menuItems.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </div>
  </SideMenuBarStyle>
);
  
const Title = styled.div`
  font-size: 30px;
  color: white;
  margin-top: 30px;
  margin-bottom: 50px;
  font-family: GmarketSansTTFLight, sans-serif, Arial;
`

const SideMenuBarStyle = styled.div`
  position: fixed;
  left: 0;
  height: 100%;
  width: 200px;
  margin-left: 30px;
  border-right: 1px solid gray;
  padding-right: 10px;

  @media (max-width: 1300px) {
    display: none;
  }
`
  

const SideMenu = styled.div`
  margin-top: 8px;
  padding-right: 40px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  border-radius: 8px;

  &:hover {
    background-color: #282828;
  }
`;

const MenuText = styled.p`
  margin-left: 10px;
  margin-right: 30px;
  font-size: 17px;
`

export default SideMenuBar