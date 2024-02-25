import React from "react";
import { graphql } from "gatsby";
import PageLayout from "../components/layout/page-component";
import Utterances from "../components/utterances/index.jsx";
import styled from "styled-components";
import { Link } from "gatsby";
import { FaInstagram, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiVelog } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";

const AboutTemplate = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;
  const socialLinks = data.site.siteMetadata.socialLinks;

  return (
    <PageLayout>
      <SocialLinks>
        {Object.entries(socialLinks).map(([key, value]) => (
          <Link key={key} to={value}>
            <EmojiLink>{socialEmojis[key]}</EmojiLink>
          </Link>
        ))}
      </SocialLinks>
      <MarkdownContent dangerouslySetInnerHTML={{ __html: html || '' }} />
      <Utterances repo="msung99/Gatsby-Starter-Haon" theme="github-dark" />
    </PageLayout>
  );
};

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

const MarkdownContent = styled.div`
 h1 {
  font-size: 2rem;
  color: #e8e8e8;
  margin-top: 20px;
  margin-bottom: 40px;
}

h2 {
  font-size: 1.7rem;
  color: #e8e8e8;
  margin-top: 20px;
  margin-bottom: 40px;
}

h3 {
  font-size: 1.4rem;
  color: #e8e8e8;
  margin-top: 20px;
  margin-bottom: 40px;
}

h4 {
  font-size: 1.1rem;
  color: #e6e6e6;
  margin-top: 20px;
  margin-bottom: 40px;
}

p {
  font-size: 17px;
  line-height: 160%; 
  color: #e8e8e8;
  margin-bottom: 45px;
}

blockquote {
  margin-left: 0px;
  margin-right: 0px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 30px; 
  margin-top: 40px;
  border-left: 6px solid #484848;
  font-size: 1.15rem;
  color: #e6e6e6;
}

hr {
  height: 1px;
  border: 0;
  color: white;
  margin-top: 40px;
  margin-bottom: 40px;
}

a {
  color: #c9c9ca;
}

img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  margin-bottom: 30px;
}

li {
  line-height: 180%; 
  color: #e6e6e6;
}

.gatsby-highlight {
  font-size: 14px;
  margin-bottom: 60px;
}

.language-text {
  background-color: #606060;
  padding: -10px;
  font-size: 15px;
  color: #e6e6e6;
  width: 100%;
  height: 100%;
}
}
`

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
    markdownRemark(fields: { slug: { eq: "/about/introduce/" } }) {
      frontmatter {
        title
        description
        date
        tags
        series
      }
      html
    }
  }
`;
