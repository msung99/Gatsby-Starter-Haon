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

const AboutTemplate = ({ data, location}) => {
  const { frontmatter, html } = data.markdownRemark;
  const socialLinks = data.site.siteMetadata.socialLinks;
  const description = data.site.siteMetadata.description
  const author = data.site.siteMetadata.author
  const siteUrl = data.site.siteMetadata.siteUrl
  const keywords = data.site.siteMetadata.keywords

  return (
    <PageLayout>
      <Seo title={author} description={description}/>
      <Profile author={author} description={description} siteUrl={siteUrl} keywords = {keywords}/>
      <SocialLinks>
        {Object.entries(socialLinks).map(([key, value]) => (
          <Link key={key} to={value}>
            <EmojiLink>{socialEmojis[key]}</EmojiLink>
          </Link>
        ))}
      </SocialLinks>
      <Line/>
      <MarkdownContent dangerouslySetInnerHTML={{ __html: html || '' }} />
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

const MarkdownContent = styled.div`
 h1 {
  font-size: 2rem;
  color: ${props => props.theme.post.content.text};
  margin-top: 70px;
  margin-bottom: 40px;
  word-break: break-all;
  font-weight: 700;
}

 h2 {
  font-size: 1.7rem;
  color: ${props => props.theme.post.content.text};
  margin-top: 70px;
  margin-bottom: 40px;
  word-break: break-all;
  font-weight: 700;
}

 h3 {
  font-size: 1.4rem;
  color: ${props => props.theme.post.content.text};
  margin-top: 70px;
  margin-bottom: 40px;
  word-break: break-all;
  font-weight: 700;
}

 h4 {
  font-size: 1.1rem;
  color: ${props => props.theme.post.content.text};
  margin-top: 40px;
  margin-bottom: 40px;
  word-break: break-all;
  font-weight: 700;
}

 h5 {
  font-size: 0.9rem;
  color: ${props => props.theme.post.content.text};
  margin-top: 40px;
  margin-bottom: 40px;
  word-break: break-all;
  font-weight: 700;
}

 h6 {
  font-size: 0.7rem;
  color: ${props => props.theme.post.content.text};
  margin-top: 40px;
  margin-bottom: 40px;
  font-weight: 700;
}

 p {
  font-size: 16px;
  line-height: 180%; 
  color: ${props => props.theme.post.content.text};
  margin-bottom: 35px;
  word-break: break-all;

  span {
    margin-top: 40px;
    margin-bottom: 40px;
    font-size: 100px;
  }
}


blockquote {
  padding-left: 18px;
  padding-right: 20px;
  padding-top: 25px;
  padding-bottom: 1px;
  margin-bottom: 50px; 
  margin-top: 50px;
  background-color: ${props => props.theme.post.content.blockquote.body};
  line-height: 170%;
  color: ${props => props.theme.post.content.blockquote.text};
  border-left: 6px solid ${props => props.theme.post.content.blockquote.left};
  word-break: break-all;
}

hr {
  height: 2px;
  border: 0;
  background-color: ${props => props.theme.post.content.hr};
  margin-top: 50px;
  margin-bottom: 50px;
  word-break: break-all;
}

a {
  color: ${props => props.theme.post.content.a};
  word-break: break-all;
}

img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  margin-top: 40px;
  margin-bottom: 40px;
}

ul {
  line-height: 180%; 
  word-break: break-all;
}

li {
  color: ${props => props.theme.post.content.li};
  list-style-type: disc;
  margin-left: 20px;
}

.gatsby-highlight {
  font-size: 14px;
  margin-bottom: 80px;
  word-break: break-all;
}

.language-text {
  background-color: ${props => props.theme.post.content.language.bg};
  padding: -10px;
  font-size: 15px;
  color: ${props => props.theme.post.content.language.text};
  width: 100%;
  height: 100%;
  word-break: break-all;
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
