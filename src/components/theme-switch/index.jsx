// ThemeSwitch.js

import React, { useEffect, useState } from 'react';
import { MdDarkMode } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import { FaSun } from "react-icons/fa";

import { getValueFromLocalStorage, setValueToLocalStorage } from '../../utils/localStorage';
import styled from 'styled-components';

function ThemeSwitch() {
    const [isDarkMode, setIsDarkMode] = useState(getValueFromLocalStorage('isDarkMode'));

    useEffect(() => {
        setValueToLocalStorage('isDarkMode', isDarkMode);
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <DarkModeButtonWrapper>
            <DarkModeButton onClick={() => setIsDarkMode((isDark) => !isDark)}>
                {isDarkMode ? (
                    <ButtonWrapper>
                        <DarkModeIcon as={MdDarkMode} fontSize="32" />
                        <ThemeText>Dark</ThemeText>
                    </ButtonWrapper>
                ) : (
                    <ButtonWrapper>
                        <DarkModeIcon as={MdSunny} fontSize="32" />
                        <ThemeText>Light</ThemeText>
                    </ButtonWrapper>
                )}
            </DarkModeButton>
        </DarkModeButtonWrapper>
    );
}

const DarkModeButtonWrapper = styled.div`
`;

const DarkModeButton = styled.div`
  margin-top: 30px;
  padding-right: 80px;
  padding: 10px;
  padding-right: 60px;
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? props.theme.menuBar.sideMenu : "transparent")};

  &:hover {
    background-color: ${(props) => (props.active ?  props.theme.menuBar.sideMenu : props.theme.menuBar.sideMenuHover)};
`;

const DarkModeIcon = styled.div`
  color: ${props => props.theme.main.text};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`

const ThemeText = styled.p`
  margin-left: 10px;
  margin-right: 30px;
  font-size: 17px;
  color: ${props => props.theme.main.text};
`;

export default ThemeSwitch;
