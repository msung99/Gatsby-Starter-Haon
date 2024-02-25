import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

const Utterances = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          repo
        }
      }
    }
  `);

  const repo = data.site.siteMetadata.repo;

  return (
    <CommentWrapper
      ref={(elem) => {
        if (!elem) {
          return;
        }
        <h1>repo</h1>
        const scriptElem = document.createElement('script');
        scriptElem.src = 'https://utteranc.es/client.js';
        scriptElem.async = true;
        scriptElem.setAttribute('repo', repo);
        scriptElem.setAttribute('issue-term', 'pathname');
        scriptElem.setAttribute('theme', 'github-dark');
        scriptElem.setAttribute('label', 'blog-comment');
        scriptElem.crossOrigin = 'anonymous';
        elem.replaceChildren(scriptElem);
      }}
    />
  );
};

const CommentWrapper = styled.section``;

export default Utterances;
