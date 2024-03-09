import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const PageFooter = () => {
  return (
    <PageFooterWrapper>
      <Text>@2024 Lee Min Sung,</Text>
      <StyledLink to="https://github.com/msung99/Gatsby-Starter-Haon.git">
        Gatsby-Starter-Haon Theme
      </StyledLink>
    </PageFooterWrapper>
  );
};

const Text = styled.span`
  margin-right: 5px;
`;

const StyledLink = styled(Link)`
  color: gray;
`;

const PageFooterWrapper = styled.footer`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: gray;
  height: 30px;
  position: relative;
  transform: translateY(-100%);
`;

export default PageFooter;
