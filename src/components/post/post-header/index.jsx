import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiLink } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";

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

const PostHeader = ({ title, date, author, tags }) => {
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
      <div>
        {tags.map((tag) => (
          <Link style={{ textDecoration: "none" }} to={`/tags/${kebabCase(tag)}`} key={tag}>
            <Tag>{tag}</Tag>
          </Link>
        ))}
      </div>
      <HiddenInput
        type="text"
        readOnly
        ref={urlRef}
      />
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  color: #fff;
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
  font-size: 16px;
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
  color: white;
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
  color: #fff;
`;

const CopyStatus = styled.div`
  color: #fff;
  font-size: 14px;
  background-color: gray;
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 5px;
  opacity: 0;
  animation: ${fadeInOut} 3s ease-in-out;
`;

const Tag = styled.span`
  position: relative;
  color: white;
  font-size: 14px;
  margin-right: 25px;
  margin-bottom: 8px;
  padding: 8px 15px;
  background-color: #3C3A39;
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
    border-color: transparent transparent transparent #3C3A39;
    transition: border-color 0.3s ease-in-out;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -3px;
    width: 6px;
    height: 6px;
    background-color: white;
    border-radius: 50%;
    transform: translateY(-50%);
  }

  &:hover {
    background-color: #555;

    &::before {
      border-color: transparent transparent transparent #555;
    }
  }
`;

export default PostHeader;
