import React from "react";
import styled from "styled-components";

const TableOfContents = ({ content }) => {
  const scrollToLink = (id) => {
    const targetElement = document.getElementById(id);

    if (targetElement) {
      const windowHeight = window.innerHeight;
      const elementHeight = targetElement.clientHeight;
      const offset = (windowHeight - elementHeight) / 2;

      const targetOffset = targetElement.offsetTop - offset;

      // 브라우저의 기본 스크롤 이벤트 막기
      document.body.style.overflow = "hidden";

      // 스크롤 애니메이션 적용
      window.scrollTo({
        top: targetOffset,
        behavior: "smooth",
      });

      // 애니메이션이 끝나면 다시 스크롤 이벤트 허용
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 500); // 애니메이션 기간과 맞춰 조절
    }
  };

  return (
    <Toc dangerouslySetInnerHTML={{ __html: content }} onClick={(e) => scrollToLink(e.target.getAttribute("data-link"))} />
  );
};

const Toc = styled.div`
  margin-left: 70px;
  margin-top: 30px;
  position: absolute;
  width: 220px;
  top: 50px;
  left: 100%;
  font-size: 15px;
  max-height: calc(100vh - 200px);
  overflow: auto;
  padding-right: 15px;
  border-right: 1px solid #9fa8b1;

  @media (max-width: 1300px) {
    display: None;
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
      color: inherit;
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
