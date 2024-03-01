import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TableOfContents = ({ content }) => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    setIsSticky(window.scrollY > 600);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <TocWrapper>
      <Toc isSticky={isSticky} dangerouslySetInnerHTML={{ __html: content }} />
    </TocWrapper>
  );
};

const TocWrapper = styled.div`
  position: relative;
`;

const Toc = styled.div`
  position: ${(props) => (props.isSticky ? "fixed" : "absolute")};
  left: ${(props) => (props.isSticky ? "80%" : "110%")};
  top: 15%;
  width: 230px;
  font-size: 14px;
  max-height: calc(100vh - 220px);
  overflow: auto;
  padding-right: 15px;
  border-left: 1px solid #808080;
  line-height: 130%;

  @media (max-width: 1300px) {
    display: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-top: 8px;
    margin-bottom: 6px;
    margin-left: 15px;

    p {
      margin: 10px;
    }

    a {
      color: #a0a0a0;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: #e8e8e8;
        transition: color 0.2s ease-in-out;
      }
    }
  }
`;

export default TableOfContents;
