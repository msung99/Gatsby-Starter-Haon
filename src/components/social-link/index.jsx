import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { FaInstagram, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiVelog } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import { BsFillRssFill } from "react-icons/bs";

const EmojiLink = styled.span`
  cursor: pointer;
  color: ${props => props.theme.emoji};
`;

const RssLink = styled(EmojiLink)`
  color: ${props => props.theme.emoji};
`;

const StyledRssIcon = styled(BsFillRssFill)`
  color: ${props => props.theme.emoji};
`;

const socialEmojis = {
  github: <FaGithub className="icon" size="26" />,
  instagram: <FaInstagram className="icon" size="26" />,
  facebook: <FaFacebook className="icon" size="26" />,
  linkedin: <FaLinkedin className="icon" size="26" />,
  velog: <SiVelog className="icon" size="26" />,
  email: <MdOutlineEmail className="icon" size="26" />,
};

const StyledSocialLinks = styled.div`
  display: flex;
  gap: 14px;
  margin-left: 15px;
  margin-bottom: 30px;
`;

const SocialLinks = ({ socialLinks }) => {
  return (
    <StyledSocialLinks>
      <RssLink>
        <Link to="/rss.xml">
          <StyledRssIcon className="icon" size="26" />
        </Link>
      </RssLink>
      {Object.entries(socialLinks).map(([key, link]) => (
        key === 'email' ? (
          <a key={key} href={`mailto:${link}`}>
            <EmojiLink>
              {socialEmojis[key]}
            </EmojiLink>
          </a>
        ) : (
          <Link key={key} to={link}>
            <EmojiLink>
              {socialEmojis[key]}
            </EmojiLink>
          </Link>
        )
      ))}
    </StyledSocialLinks>
  );
};

export default SocialLinks;