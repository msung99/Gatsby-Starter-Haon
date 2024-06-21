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

    // 테마 변경 이벤트 리스너 등록
    window.addEventListener('themeChange', handleThemeChange);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
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
