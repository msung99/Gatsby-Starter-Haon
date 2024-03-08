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
      <Profile author={author} description={description} siteUrl={siteUrl} keywords={keywords} />
      <SocialLinks>
        {Object.entries(socialLinks).map(([key, link]) => (
          <Link key={key} to={link}>
            <EmojiLink>
              {socialEmojis[key] && socialEmojis[key]}
            </EmojiLink>
          </Link>
        ))}
      </SocialLinks>
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

const SocialLinks = styled.div`
  display: flex;
  gap: 14px;
  margin-left: 20px;
  margin-bottom: 30px;
`;

const EmojiLink = styled.span`
  cursor: pointer;
  color: ${props => props.theme.emoji};
`;

const socialEmojis = {
  github: <FaGithub className="icon" size="30" />,
  instagram: <FaInstagram className="icon" size="30"/>,
  facebook: <FaFacebook className="icon" size="30"/>,
  linkedin: <FaLinkedin className="icon" size="30"/>,
  velog: <SiVelog className="icon" size="30"/>,
  email: <MdOutlineEmail className="icon" size="30"/>
};

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
