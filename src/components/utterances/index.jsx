import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from 'styled-components';
import { siteMetadata } from '../../../gatsby-config';

const Utterances = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext.mode === 'dark';

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
