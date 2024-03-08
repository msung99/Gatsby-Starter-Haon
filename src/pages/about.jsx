import React from "react";
import { graphql } from "gatsby";
import PageLayout from "../components/layout/page-component";
import Utterances from "../components/utterances/index.jsx";
import styled from "styled-components";
import { Link } from "gatsby";
import { FaInstagram, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiVelog } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import Profile from "../components/profile/index.jsx";
import Seo from "../components/seo/index.jsx";
import { ContentWrapper, HtmlWrapper } from "../components/post/post-content/post-style/index.jsx";
import TableOfContents from "../components/toc/index.jsx";
import { siteMetadata } from "../../gatsby-config.js";

const AboutTemplate = ({ data, location}) => {
  const { frontmatter, html } = data.markdownRemark;
  const description = data.site.siteMetadata.description
  const author = data.site.siteMetadata.author
  const siteUrl = data.site.siteMetadata.siteUrl
  const keywords = data.site.siteMetadata.keywords
  const title = data.site.siteMetadata.title

  const post = data.markdownRemark;
  const toc = post.tableOfContents;

  const socialLinks = siteMetadata.socialLinks;

  return (
    <PageLayout>
      <Seo title={title} description={description}/>
      <Profile author={author} description={description} siteUrl={siteUrl} keywords={keywords}/>
      <SocialLinks>
        {Object.entries(socialLinks).map(([key, link]) => (
          <Link key={key} link={link}>
            {socialEmojis[key] && socialEmojis[key]}
          </Link>
        ))}
      </SocialLinks>
      <Line/>
      <ContentWrapper>
        <TableOfContents content={toc}/>
        <HtmlWrapper>
          <section dangerouslySetInnerHTML={{ __html: html}} itemProp="postContent" />
        </HtmlWrapper>
      </ContentWrapper>
      <Utterances/>
    </PageLayout>
  );
};

const Line = styled.div`
  margin-bottom: 80px;
  border-bottom: 1.5px solid ${props => props.theme.main.border};
`

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

export default AboutTemplate;

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
    markdownRemark(fields: { slug: { eq: "/default/about/" } }) {
      tableOfContents(maxDepth: 3)
      frontmatter {
        title
        description
        date
        tags
        series
        isPrivate
      }
      html
    }
  }
`;
