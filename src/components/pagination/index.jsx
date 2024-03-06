import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid ${props => props.theme.postlist.border};
  background: ${props => (props.active ? props.theme.postlist.hoverBackground : "transparent")};
  color: ${props => props.theme.main.text};
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: ${props => props.theme.postlist.hoverBackground};
  }
`;

const PostPagination = ({ totalPosts, postsPerPage, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      {pageNumbers.map(number => (
        <PageButton key={number} onClick={() => paginate(number)} active={currentPage === number}>
          {number}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default PostPagination;
