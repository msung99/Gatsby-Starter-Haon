import React, { useEffect, useState } from "react";
import DarkMode from "./dark";
import LightMode from "./light";
import { getValueFromLocalStorage } from "../../../../utils/localStorage";

const CodeHighLight = () => {
  const [isDarkMode, setIsDarkMode] = useState(getValueFromLocalStorage('isDarkMode'));

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(getValueFromLocalStorage('isDarkMode'));
    };

    window.addEventListener('themeChange', handleThemeChange);

    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  return (
    <>
      {isDarkMode ? <DarkMode/> : <LightMode/>}
    </>
  );
}

export default CodeHighLight;
