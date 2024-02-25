import React from "react";
import { graphql } from "gatsby";
import PageLayout from "../components/layout/page-component";
import Profile from "../components/profile";
import Utterances from "../components/utterances/index.jsx";
import styled from "styled-components";
import { GoComment } from "react-icons/go";
import { Link } from "gatsby";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiVelog } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";


const CommunityTemplate = ({ data }) => {
  const title = data.site.siteMetadata?.title || `Title`;
  const description = data.site.siteMetadata.description;
  const author = data.site.siteMetadata.author;
  const siteUrl = data.site.siteMetadata.siteUrl;
  const keywords = data.site.siteMetadata.keywords;
  const socialLinks = data.site.siteMetadata.socialLinks;

  return (
    <PageLayout>
      <Profile author={author} description={description} siteUrl={siteUrl} keywords={keywords} />
      <SocialLinks>
        {Object.entries(socialLinks).map(([key, value]) => (
          <Link key={key} to={value}>
            <EmojiLink>{socialEmojis[key]}</EmojiLink>
          </Link>
        ))}
      </SocialLinks>
      <Description>Leave a comment to connect with this author 👋</Description>
      <Utterances repo="msung99/Gatsby-Starter-Haon" theme="github-dark" />
    </PageLayout>
  );
};

const Title = styled.h1`
  font-size: px;
  color: white;
`;

const Description = styled.p`
  font-size: 18px;
  color: white;
  margin-left: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 14px;
  margin-left: 20px;
  margin-bottom: 30px;
`;

const EmojiLink = styled.span`
  cursor: pointer;
  color: #E2E2E2;
`;

const socialEmojis = {
  github: <FaGithub className="icon" size="30" />,
  instagram: <FaInstagram className="icon" size="30"/>,
  facebook: <FaFacebook className="icon" size="30"/>,
  linkedin: <FaLinkedin className="icon" size="30"/>,
  velog: <SiVelog className="icon" size="30"/>,
  email: <MdOutlineEmail className="icon" size="30"/>
};

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
        socialLinks {
          github
          instagram
          facebook
          linkedin
          velog
          email
        }
      }
    }
  }
`;