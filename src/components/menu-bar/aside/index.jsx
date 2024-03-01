import React from "react";
import styled, { useTheme } from "styled-components";
import { useLocation } from "@reach/router";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { MdOutlineDarkMode, MdOutlineBookmarks } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { GiBlackBook } from "react-icons/gi";
import { Link } from "gatsby";
import { siteMetadata } from "../../../../gatsby-config";

const menuItems = [
  { to: '/', icon: <IoHomeOutline className="icon" size="33" />, text: 'Home' },
  { to: '/search', icon: <IoIosSearch className="icon" size="33" />, text: 'Search' },
  { to: '/tags', icon: <MdOutlineBookmarks className="icon" size="33" />, text: 'Tags' },
  { to: '/series', icon: <GiBlackBook className="icon" size="33" />, text: 'Series' },
  { to: '/about', icon: <GoPeople className="icon" size="33" />, text: 'About' },
  // { to: '/community', icon: <GoComment className="icon" size="30" />, text: 'Community' },
];

const AsideMenuBar = ({toggleTheme}) => {
  const location = useLocation();
  const theme = useTheme();

  return (
    <SideMenuBarStyle>
      <Link to={"/"} style={{ textDecoration: 'none' }}>
        <Title>{siteMetadata.title}</Title>
      </Link>
      <div>
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} active={location.pathname === item.to} />
        ))}
      </div>
      <ToggleWrapper> 
        <IconRail theme={theme.name}>
          <MdOutlineDarkMode className="icon" onClick={toggleTheme} size="40"/> 
          <MdOutlineLightMode className="icon" onClick={toggleTheme} size="40"/> 
        </IconRail>
      </ToggleWrapper>
      <Link to={"/community"} style={{ textDecoration: 'none' }}>
        <SocialMenu>
          <SocialImage/>
          <SocialText>{siteMetadata.author} / Social</SocialText>
        </SocialMenu>
      </Link>
    </SideMenuBarStyle>
  );
};

const ToggleWrapper = styled.div`
  width: 20px;
  height: 24px;
  margin-right: 15px;
  overflow: hidden;
  box-sizing: border-box;
`

const IconRail = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40px;
  top: ${props => (props.theme === "light" ? "-19px" : "0px")};
  transition: top 0.4s;

  & > svg {
    transition: opacity 0.25s;
  }

  & > svg:first-child {
    opacity: ${props => (props.theme === "light" ? 0 : 1)};
  }

  & > svg:last-child {
    opacity: ${props => (props.theme === "dark" ? 0 : 1)};
  }
`


const SocialMenu = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  margin-top: 40px;

  padding-top: 10px;
  padding-right: 60px;
  padding-left: 5px;
  padding-bottom: 10px;
  transition: background-color 0.2s ease-in-out;
  border-radius: 8px;

  &:hover {
    background-color: ${(props) => (props.active ?  "#1e1e1e" : "#282828")};
  }
`

const SocialText = styled.p`
  font-size: 17px;
  color: white;
  margin-left: 10px;
  margin-top: 5px;
`

const profileImageUrl =
  typeof window !== "undefined" && window.location.host === "localhost:8000"
    ? "http://localhost:8000"
    : siteMetadata.siteUrl


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

  @media(max-width: 1300px) {
    display: none;
  }
`;

const SideMenu = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  padding-right: 80px;
  padding: 10px;
  padding-right: 60px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? "#1e1e1e" : "transparent")};

  &:hover {
    background-color: ${(props) => (props.active ?  "#1e1e1e" : "#282828")};
  }
`;


const MenuText = styled.p`
  margin-left: 10px;
  margin-right: 30px;
  font-size: 18px;
`;

const Title = styled.div`
  font-size: 35px;
  color: white;
  margin-top: 30px;
  margin-bottom: 40px;
  font-family: "Oswald";
  font-weight: 600;
`;

export default AsideMenuBar;
