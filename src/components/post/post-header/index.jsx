import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiLink } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";
import { FaStream } from "react-icons/fa";

const PostHeader = ({ title, date, author, tags, series }) => {
  const urlRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState(null);

  useEffect(() => {
    // Check if running on the client side before accessing window
    if (typeof window !== "undefined") {
      urlRef.current.value = window.location.href;
    }
  }, []);

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      urlRef.current.select();
      document.execCommand("copy");

      setCopyStatus("Copied!");

      setTimeout(() => {
        setCopyStatus(null);
      }, 3000);
    }
  };

  const shareOnFacebook = () => {
    // Same check for the window object
    if (typeof window !== "undefined") {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`;
      window.open(shareUrl, "_blank");
    }
  };

  const shareOnTwitter = () => {
    // Same check for the window object
    if (typeof window !== "undefined") {
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <HeaderWrapper>
      <PostTitle>{title}</PostTitle>
      <Info>
        <Description>
          Posted by{' '}
          <PostAuthor>@{author}</PostAuthor>, {'   '}
          {date}
        </Description>
        <ShareLinkContainer>
          <ShareLink onClick={copyToClipboard}>
            <FiLink size="23" />
          </ShareLink>
          <ShareLink onClick={shareOnFacebook}>
            <FaFacebook size="23" />
          </ShareLink>
          <ShareLink onClick={shareOnTwitter}>
            <FaTwitterSquare size="27" />
          </ShareLink>
          {copyStatus && <CopyStatus>{copyStatus}</CopyStatus>}
        </ShareLinkContainer>
      </Info>
      {tags && tags.length > 0 && (
        <Tags>
          {tags.map((tag) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`/tags/${kebabCase(tag)}`}
              key={tag}
            >
              <Tag>{tag}</Tag>
            </Link>
          ))}
        </Tags>
      )}
      {series && (
        <SeriesContainer>
          <SeriesLabel>Series of</SeriesLabel>
          <Series to={`/series/${kebabCase(series)}/`}>
            <SeriesIcon size={12} />
            {series}
          </Series>
        </SeriesContainer>
      )}
      <HiddenInput type="text" readOnly ref={urlRef} />
    </HeaderWrapper>
  );
};

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const HeaderWrapper = styled.div`
  color: ${props => props.theme.main.text};
  margin-bottom: 80px;
  padding-bottom: 50px;
  border-bottom: 1px solid #626262;
`;

const PostTitle = styled.h1`
  font-size: 38px;
  margin-bottom: 25px;
  line-height: 1.2;
  font-weight: 800;
  word-break: break-all;
`;

const Description = styled.div`
  font-size: 15px;
  color: gray;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 40px;
`;

const ShareLinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ShareLink = styled.div`
  color: ${props => props.theme.main.text};
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
`;

const Tags = styled.div``;

const PostAuthor = styled.span`
  font-weight: 800;
  color: ${props => props.theme.main.text};
  font-size: 17px;
`;

const CopyStatus = styled.div`
  color: ${props => props.theme.post.copystatus.text};
  font-size: 14px;
  background-color: ${props => props.theme.post.copystatus.bg};
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 5px;
  opacity: 0;
  animation: ${fadeInOut} 3s ease-in-out;
`;

const Tag = styled.span`
  position: relative;
  color: ${props => props.theme.main.text};
  font-size: 14px;
  margin-right: 25px;
  margin-bottom: 8px;
  padding: 8px 15px;
  background-color: ${props => props.theme.tag.background};
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  transition: background-color 0.3s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -15px;
    border-width: 15.6px 0 15.6px 15.6px;
    border-style: solid;
    border-color: transparent transparent transparent ${props => props.theme.tag.background};
    transition: border-color 0.3s ease-in-out;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -3px;
    width: 6px;
    height: 6px;
    background-color: ${props => props.theme.tag.circle};
    border-radius: 50%;
    transform: translateY(-50%);
  }

  &:hover {
    background-color: ${props => props.theme.tag.hover};

    &::before {
      border-color: transparent transparent transparent ${props => props.theme.tag.hover};
    }
  }
`;

const SeriesContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const SeriesLabel = styled.span`
  font-size: 15px;
  margin-right: 10px;
  color: #8e8e8e;
`;

const Series = styled(Link)`
  font-size: 14px;
  font-weight: bold;
  padding: 5px;
  background-color: ${props => props.theme.post.series};
  border-radius: 6px;
  display: inline-block;
  color: ${props => props.theme.main.text};
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.tag.hover};
  }
`;

const SeriesIcon = styled(FaStream)`
  margin-right: 8px;
`;

export default PostHeader;
