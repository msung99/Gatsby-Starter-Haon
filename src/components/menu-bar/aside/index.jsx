import React from "react";
import styled from "styled-components";
import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import { siteMetadata } from "../../../../gatsby-config";
import { IoBookmarks } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoHome, IoSearch } from "react-icons/io5";
import ThemeSwitch from "../../theme-switch";

const menuItems = [
  { to: '/', icon: <IoHome className="icon" size="30" />, text: 'Home' },
  { to: '/search', icon: <IoSearch className="icon" size="30" />, text: 'Search' },
  { to: '/tags', icon: <IoBookmarks className="icon" size="30" />, text: 'Tags' },
  { to: '/series', icon: <FaBook className="icon" size="30" />, text: 'Series' },
  { to: '/about', icon: <BsFillPeopleFill className="icon" size="30" />, text: 'About' },
];

const AsideMenuBar = () => {
  const location = useLocation();

  return (
    <SideMenuBarStyle>
      <Link to={"/"} style={{ textDecoration: 'none' }}>
        <Title>{siteMetadata.title}</Title>
      </Link>
      <div>
        {menuItems.slice(0, 1).map((item, index) => (
          <MenuItem key={index} {...item} active={location.pathname === item.to} />
        ))}
        <ThemeSwitch />
        {menuItems.slice(1).map((item, index) => (
          <MenuItem key={index} {...item} active={location.pathname === item.to} />
        ))}
      </div>
      <Link to={"/community"} style={{ textDecoration: 'none' }}>
        <SocialMenu>
          <SocialImage />
          <SocialText>{siteMetadata.author} / Social</SocialText>
        </SocialMenu>
      </Link>
    </SideMenuBarStyle>
  );
};

const MenuItem = ({ to, icon, text }) => {
  const location = useLocation();
  const isActive = to === '/' ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <SideMenu active={isActive}>
        {icon}
        <MenuText>{text}</MenuText>
      </SideMenu>
    </Link>
  );
};

const SideMenuBarStyle = styled.div`
  position: fixed;
  left: 0;
  height: 100%;
  max-width: 210px;
  margin-left: 30px;
  padding-right: 10px;
  background: ${props => props.theme.menuBar.wrapper};
  color: ${props => props.theme.main.text};
  z-index: 10;

  @media (max-width: 1300px) {
    display: none;
  }
`;

const SideMenu = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 10px;
  color: ${props => props.theme.main.text};
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? props.theme.menuBar.sideMenu : "transparent")};

  &:hover {
    background-color: ${(props) => (props.active ? props.theme.menuBar.sideMenu : props.theme.menuBar.sideMenuHover)};
  }
`;

const MenuText = styled.p`
  margin-left: 10px;
  margin-right: 30px;
  font-size: 16px;
`;

const Title = styled.div`
  font-size: 32px;
  color: ${props => props.theme.main.text};
  margin-top: 30px;
  margin-left: 5px;
  margin-bottom: 40px;
  font-family: "Source Code Pro", sans-serif;
  font-weight: 800;
`;

const SocialMenu = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  padding-top: 10px;
  padding-right: 40px;
  padding-bottom: 10px;
  transition: background-color 0.2s ease-in-out;
  border-radius: 8px;

  &:hover {
    background-color: ${(props) => (props.active ? props.theme.menuBar.sideMenu : props.theme.menuBar.sideMenuHover)};
  }
`;

const SocialText = styled.p`
  font-size: 15px;
  color: ${props => props.theme.main.text};
  margin-left: 7px;
  margin-top: 10px;
  line-height: 125%;
`;

const profileImageUrl =
  typeof window !== "undefined" && window.location.host === "localhost:8000"
    ? "http://localhost:8000"
    : siteMetadata.siteUrl;

const SocialImage = styled.div`
  background-image: url(${profileImageUrl}/profile.png);
  width: 38px;
  height: 38px;
  border: 1px solid transparent;
  border-color: white;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

export default AsideMenuBar;
