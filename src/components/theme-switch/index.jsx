import React, { useEffect, useState } from 'react';
import { MdDarkMode } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import { FaSun } from "react-icons/fa";

import { getValueFromLocalStorage, setValueToLocalStorage } from '../../utils/localStorage';
import styled from 'styled-components';

function ThemeSwitch() {
    const [isDarkMode, setIsDarkMode] = useState(getValueFromLocalStorage('isDarkMode'));
    const [hideText, setHideText] = useState(typeof window !== "undefined" && window.innerWidth <= 768);

    useEffect(() => {
        setValueToLocalStorage('isDarkMode', isDarkMode);
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== "undefined") {
                setHideText(window.innerWidth <= 768);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <DarkModeButtonWrapper>
            <DarkModeButton onClick={() => setIsDarkMode((isDark) => !isDark)}>
                <ButtonWrapper>
                    <DarkModeIcon as={isDarkMode ? MdDarkMode : MdSunny} fontSize="32" isSmallScreen={window.innerWidth <= 1300} />
                    {!hideText && <ThemeText>{isDarkMode ? 'Dark' : 'Light'}</ThemeText>}
                </ButtonWrapper>
            </DarkModeButton>
        </DarkModeButtonWrapper>
    );
}

const DarkModeButtonWrapper = styled.div``;

const DarkModeButton = styled.div`
    margin-top: 30px;
    padding-right: 80px;
    padding: 10px;
    font-size: 16px;
    transition: background-color 0.2s ease-in-out;
    border-radius: 8px;
    background-color: ${(props) => (props.active ? props.theme.menuBar.sideMenu : "transparent")};

    &:hover {
        background-color: ${(props) => (props.active ? props.theme.menuBar.sideMenu : props.theme.menuBar.sideMenuHover)};
    }

    @media (max-width: 768px) {
        padding-right: 10px;
        margin-left: -15px;
        margin-top: 0;
    }

    @media (max-width: 1300px) {
        padding-right: 10px;
        margin-left: -15px;
        margin-top: 0;

        &:hover {
            background-color: ${(props) => (props.active ? props.theme.menuBar.sideMenu : "transparent")};
        }
    }
`;

const DarkModeIcon = styled.div`
    color: ${props => props.theme.main.text};

    @media (max-width: 1300px) {
        font-size: 29px;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ThemeText = styled.p`
    margin-left: 10px;
    margin-right: 30px;
    font-size: 15px;
    color: ${props => props.theme.main.text};

    @media (max-width: 1300px) {
        display: none;
    }
`;

export default ThemeSwitch;
