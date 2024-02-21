import React from "react";
import styled from "styled-components";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineBookmarks } from "react-icons/md";
import { GiBlackBook } from "react-icons/gi";


const SideMenuBar = () => {
    return (
        <SideMenuBarStyle>
            <SideMenu>
                <IoHomeOutline className = "icon" size = "30"/>
                <MenuText>Home</MenuText>
            </SideMenu>
            <SideMenu>
                <IoIosSearch className = "icon" size = "30"/>
                <MenuText>Search</MenuText>
            </SideMenu>
            <SideMenu>
                <MdOutlineDarkMode className = "icon" size = "30"/>
                <MenuText>Dark/Light Mode</MenuText>
            </SideMenu>
            <SideMenu>
                <MdOutlineBookmarks className = "icon" size = "30"/>
                <MenuText>Tags</MenuText>
            </SideMenu>
            <SideMenu>
                <GiBlackBook className = "icon" size = "30"/>
                <MenuText>Series</MenuText>
            </SideMenu>
            <SideMenu>
                <GoPeople className = "icon" size = "30"/>
                <MenuText>About</MenuText>
            </SideMenu>
            <SideMenu>
                <GoComment className = "icon" size = "30"/>
                <MenuText>Community</MenuText>
            </SideMenu>
        </SideMenuBarStyle>
    );
}

const SideMenuBarStyle = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 40px;
  padding-right: 10px;
  border-right: 1px solid gray;
  height: 100%;

  @media (max-width: 1100px) {
    display: none;
  }
`
  

const SideMenu = styled.div`
  margin-top: 8px;
  padding-right: 50px;
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
  margin-left: 15px;
  font-size: 18px;
`

export default SideMenuBar