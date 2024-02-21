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

const SideMenuBar = () => {
    return (
        <SideMenuBarStyle>
            <Link style={{ textDecoration: "none"}} to = "/">
                <SideMenu>
                    <IoHomeOutline className = "icon" size = "30"/>
                    <MenuText>Home</MenuText>
                </SideMenu>
            </Link>
            <Link style={{ textDecoration: "none"}} to = "/search">
                <SideMenu>
                    <IoIosSearch className = "icon" size = "30"/>
                    <MenuText>Search</MenuText>
                </SideMenu>
            </Link>
            <Link style={{ textDecoration: "none"}} to = "/bright-mode">
                <SideMenu>
                    <MdOutlineDarkMode className = "icon" size = "30"/>
                    <MenuText>Dark/Light Mode</MenuText>
                </SideMenu>
            </Link>
            <Link style={{ textDecoration: "none"}} to = "/tags">
                <SideMenu>
                    <MdOutlineBookmarks className = "icon" size = "30"/>
                    <MenuText>Tags</MenuText>
                </SideMenu>
            </Link>
            <Link style={{ textDecoration: "none"}} to = "/series">
                <SideMenu>
                    <GiBlackBook className = "icon" size = "30"/>
                    <MenuText>Series</MenuText>
                </SideMenu>
            </Link>
            <Link style={{ textDecoration: "none"}} to = "/about">
                <SideMenu>
                    <GoPeople className = "icon" size = "30"/>
                    <MenuText>About</MenuText>
                </SideMenu>
            </Link>
            <Link style={{ textDecoration: "none"}} to = "/community">
                <SideMenu>
                    <GoComment className = "icon" size = "30"/>
                    <MenuText>Community</MenuText>
                </SideMenu>
            </Link>
        </SideMenuBarStyle>
    );
}

const SideMenuBarStyle = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 40px;
  border-right: 1px solid gray;
  height: 100%;

  @media (max-width: 1100px) {
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
  font-size: 17px;
`

export default SideMenuBar