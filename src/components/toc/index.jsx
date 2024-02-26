import React from "react";
import styled from "styled-components";

const TableOfContents = ({ content }) => {
  return (
    <Toc dangerouslySetInnerHTML={{ __html: content }} />
  );
}

const Toc = styled.div`
  position: sticky;
  top: 0;
  flex-grow: 0;
  max-width: calc(100% / 3);
  flex-basis: calc(100% / 3);
  margin-left: 1rem;
  max-width: 18rem;
  max-height: calc(100vh - 200px);
  overflow: auto;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    color: white;
    margin-bottom: 0.5rem;

    a {
      text-decoration: none;
      color: inherit;
    }
  }
`;
export default TableOfContents;
