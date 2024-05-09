import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const PageFooter = () => {
  return (
    <PageFooterWrapper>
      <Text>@2024 Lee Min Sung, powered by </Text>
      <StyledLink to="https://github.com/msung99/Gatsby-Starter-Haon.git">
        Gatsby-Starter-Haon Theme (Open Source) ✍️
      </StyledLink>
    </PageFooterWrapper>
  );
};

const Text = styled.span`
  margin-right: 5px;
  color: gray;
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.post.content.text};
`;

const PageFooterWrapper = styled.footer`
  margin-top: 120px;
  padding-bottom: 38px;
  text-align: center;
  font-size: 13.5px;
  color: gray;
  height: 30px;
  position: relative;
  transform: translateY(-100%);
`;

export default PageFooter;
