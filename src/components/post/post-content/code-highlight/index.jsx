import React, { useEffect, useState } from "react";
import DarkMode from "./dark";
import LightMode from "./light";
import { getValueFromLocalStorage, setValueToLocalStorage } from "../../../../utils/localStorage";


const CodeHighLight = () => {
    const [isDarkMode, setIsDarkMode] = useState(getValueFromLocalStorage('isDarkMode'));
  
    useEffect(() => {
      setValueToLocalStorage('isDarkMode', isDarkMode);
      document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);
  
    return (
      <>
        {isDarkMode ? <DarkMode/> : <LightMode/>}
      </>
    );
  }
  
  export default CodeHighLight;