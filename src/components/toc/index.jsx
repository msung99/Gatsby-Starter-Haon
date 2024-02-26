import React from "react";
import styled from "styled-components";

const TableOfContents = ({ content }) => {
  return (
    <Toc dangerouslySetInnerHTML={{ __html: content }} />
  );
}

const Toc = styled.div`
  ul {
    margin-left: 0;
    li {
      color: blue;
      a {
        text-decoration: none;
      }
    }
  }
`;

export default TableOfContents;
