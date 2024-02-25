import React from 'react';
import styled from 'styled-components';
import { repo } from "../../../gatsby-config"

const Utterances = () => {
  return (
    <CommentWrapper>
      ref={(elem) => {
        if (!elem) {
          return;
        }
        const scriptElem = document.createElement('script');
        scriptElem.src = 'https://utteranc.es/client.js';
        scriptElem.async = true;
        scriptElem.setAttribute('repo', {repo});
        scriptElem.setAttribute('issue-term', 'pathname');
        scriptElem.setAttribute('theme', 'github-dark');
        scriptElem.setAttribute('label', 'blog-comment');
        scriptElem.crossOrigin = 'anonymous';
        elem.replaceChildren(scriptElem);
      }}
    </CommentWrapper>
  );
};

const CommentWrapper = styled.section`
`;

export default Utterances;
