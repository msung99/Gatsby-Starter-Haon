import React from "react";
import styled from "styled-components";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  background: ${props => (props.active ? props.theme.postlist.pagnigation : "transparent")};
  color: ${props => props.theme.main.text};
  border-radius: 10px;
  transition: background 0.3s ease, color 0.3s ease;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;

const StyledFaArrowCircleLeft = styled(FaArrowCircleLeft)`
  margin-right: 5px;
`;

const StyledFaArrowCircleRight = styled(FaArrowCircleRight)`
  margin-left: 5px;
`;

const Ellipsis = styled.span`
  margin: 0 5px;
  color: ${props => props.theme.main.text};
`;

const PostPagination = ({ totalPosts, postsPerPage, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageButtons = () => {
    const buttons = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      if (
        i === 1 ||
        i === currentPage - 1 ||
        i === currentPage ||
        i === currentPage + 1 ||
        i === Math.ceil(totalPosts / postsPerPage)
      ) {
        buttons.push(
          <PageButton key={i} onClick={() => paginate(i)} active={currentPage === i}>
            {i}
          </PageButton>
        );
      } else if (
        i === currentPage - 2 ||
        i === currentPage + 2
      ) {
        buttons.push(<Ellipsis key={i}>...</Ellipsis>);
      }
    }

    return buttons;
  };

  return (
    <PaginationContainer>
      <PageButton onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
        <IconWrapper>
          <StyledFaArrowCircleLeft className="icon" size="23" />
        </IconWrapper>
      </PageButton>
      {renderPageButtons()}
      <PageButton onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}>
        <IconWrapper>
          <StyledFaArrowCircleRight className="icon" size="23" />
        </IconWrapper>
      </PageButton>
    </PaginationContainer>
  );
};

export default PostPagination;
