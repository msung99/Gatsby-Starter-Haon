import * as React from "react";
import { Link } from "gatsby";
import { TbError404 } from "react-icons/tb";
import styled from "styled-components";
import PageLayout from "../components/layout/page-component";
import Seo from "../components/seo";

const NotFoundWrapper = styled.div`
  text-align: center;
  margin: 50px auto;
`;

const NotFoundTitle = styled.h1`
  color: #333;
  font-size: 3rem;
`;

const NotFoundIcon = styled(TbError404)`
  margin: 20px 0;
  color: #fff;
`;

const NotFoundText = styled.p`
  color: #555;
  font-size: 1.2rem;
`;

const NotFoundLink = styled(Link)`
  color: #007bff;
  text-decoration: underline;
`;

const NotFoundPage = () => (
  <PageLayout>
    <NotFoundWrapper>
      <NotFoundTitle>404: Not Found</NotFoundTitle>
      <NotFoundIcon size="50" />
      <NotFoundText>
        You just hit a route that doesn&#39;t exist... the sadness.{" "}
        <NotFoundLink to="/">Go back to the home page</NotFoundLink>.
      </NotFoundText>
    </NotFoundWrapper>
  </PageLayout>
);

export const Head = () => <Seo title="404: Not Found" />;

export default NotFoundPage;
