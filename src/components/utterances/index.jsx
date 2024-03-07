import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { siteMetadata } from '../../../gatsby-config';
import { getValueFromLocalStorage } from '../../utils/localStorage';

const Utterances = () => {
  const [isDarkMode, setIsDarkMode] = useState(getValueFromLocalStorage('isDarkMode'));

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(getValueFromLocalStorage('isDarkMode'));
    };

    window.addEventListener('theme', handleThemeChange);

    return () => {
      window.removeEventListener('theme', handleThemeChange);
    };
  }, []);

  return (
    <CommentWrapper>
      <div
        ref={(elem) => {
          if (!elem) {
            return;
          }

          const scriptElem = document.createElement('script');
          scriptElem.src = 'https://utteranc.es/client.js';
          scriptElem.async = true;
          scriptElem.setAttribute('repo', siteMetadata.repo);
          scriptElem.setAttribute('issue-term', 'pathname');
          scriptElem.setAttribute('theme', isDarkMode ? 'github-dark' : 'github-light');
          scriptElem.setAttribute('label', 'blog-comment');
          scriptElem.crossOrigin = 'anonymous';
          elem.replaceChildren(scriptElem);
        }}
      />
    </CommentWrapper>
  );
};

const CommentWrapper = styled.section`
  margin-top: 70px;
`;

export default Utterances;
