import React from "react";
import { graphql } from "gatsby";
import PageLayout from "../components/layout/page-component";
import Profile from "../components/profile";
import Utterances from "../components/utterances/index.jsx";
import styled from "styled-components";
import { Link } from "gatsby";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiVelog } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Seo from "../components/seo/index.jsx";
import { siteMetadata } from "../../gatsby-config.js";

const CommunityTemplate = ({ data }) => {
  const title = data.site.siteMetadata.title;
  const description = data.site.siteMetadata.description;
  const author = data.site.siteMetadata.author;
  const siteUrl = data.site.siteMetadata.siteUrl;
  const keywords = data.site.siteMetadata.keywords;

  const socialLinks = siteMetadata.socialLinks;

  return (
    <PageLayout>
      <Seo title={title} description={description}/>
      <Profile author={author} description={description} siteUrl={siteUrl} keywords={keywords} socialLinks={socialLinks}/>
      <Description>Leave a comment to connect with this author 👋</Description>
      <Line/>
      <Utterances/>
    </PageLayout>
  );
};


const Description = styled.p`
  font-size: 18px;
  color: ${props => props.theme.main.text};
  margin-left: 20px;
`;


const Line = styled.div`
  padding-bottom: 40px;
  border-bottom: 1px solid ${props => props.theme.main.border};
`

export default CommunityTemplate;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        keywords
      }
    }
  }
`;
