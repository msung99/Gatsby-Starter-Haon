import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TableOfContents = ({ content }) => {
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // Adjust as needed
      const headings = document.querySelectorAll("h1, h2, h3, h4");

      let activeHeading = null;

      headings.forEach((heading) => {
        const top = heading.offsetTop;
        const bottom = top + heading.offsetHeight;

        if (scrollPosition >= top && scrollPosition <= bottom) {
          activeHeading = heading.id;
        }
      });

      setActiveLink(activeHeading);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToLink = (id) => {
    const targetElement = document.getElementById(id);

    if (targetElement) {
      const windowHeight = window.innerHeight;
      const elementHeight = targetElement.clientHeight;
      const offset = (windowHeight - elementHeight) / 2;

      const targetOffset = targetElement.offsetTop - offset;

      document.body.style.overflow = "hidden";

      window.scrollTo({
        top: targetOffset,
        behavior: "smooth",
      });

      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 500);
    }
  };

  return (
    <Toc
      dangerouslySetInnerHTML={{ __html: content }}
      onClick={(e) => scrollToLink(e.target.getAttribute("data-link"))}
      activeLink={activeLink}
    />
  );
};

const Toc = styled.div`
  position: sticky;
  top: 80px;
  left: 100%;
  width: 220px;
  font-size: 15px;
  max-height: calc(100vh - 220px);
  overflow: auto;
  padding-top: 10px;
  padding-right: 15px;
  border-right: 1px solid #9fa8b1;
  transition: left 0.3s ease-in-out;

  @media (max-width: 1300px) {
    display: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    color: #9fa8b1;
    margin-top: 7px;
    margin-left: 15px;

    p {
      white-space: normal;
    }

    a {
      color: ${(props) => (props.activeLink === props["data-link"] ? "#e8e8e8" : "inherit")};
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
