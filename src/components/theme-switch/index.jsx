// ThemeSwitch.js

import React, { useEffect, useState } from 'react';
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
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
                    <DarkModeIcon as={MdDarkMode} fontSize="40" />
                ) : (
                    <DarkModeIcon as={CiLight} fontSize="40" />
                )}
            </DarkModeButton>
        </DarkModeButtonWrapper>
    );
}

const DarkModeButtonWrapper = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 20px;
    right: 20px;
`;

const DarkModeButton = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: #363f47 !important;
    cursor: pointer;
    box-shadow: 0px 5px 25px rgb(0 0 0 / 12%);
    backdrop-filter: blur(30px);
    z-index: 3;
`;

const DarkModeIcon = styled.div`
    color: white;
`;

export default ThemeSwitch;
