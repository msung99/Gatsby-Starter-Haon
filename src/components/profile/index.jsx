import kebabCase from "lodash.kebabcase";
import React from "react";
import styled from "styled-components";
import { siteMetadata } from "../../../gatsby-config";

const Profile = ({ author, description, siteUrl, keywords }) => {
  const truncatedDescription = truncateText(description, 50);

  return (
    <ProfileStyle>
      <Image siteUrl={siteUrl} />
      <Text>
        <Author>{author}</Author>
        <Description>{truncatedDescription}</Description>
        <KeyWordsStyle>
          {keywords.map((keyword) => (
            <KeyWordStyle key={kebabCase(keyword)}>
              {kebabCase(keyword)}
            </KeyWordStyle>
          ))}
        </KeyWordsStyle>
      </Text>
    </ProfileStyle>
  );
};

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const ProfileStyle = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 40px;
`;

const Text = styled.div`
  margin-left: 30px;
`;

const Author = styled.div`
  font-size: 25px;
  color: ${(props) => props.theme.main.text};
  padding-bottom: 8px;
  font-weight: 600;
`;

const Description = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.profile.description};
  padding-top: 5px;
  padding-bottom: 5px;
`;

const KeyWordsStyle = styled.div`
  margin-top: 30px;
  margin-left: -3px;
`;

const KeyWordStyle = styled.span`
  font-size: 15px;
  margin-right: 13px;
  border-radius: 15px;
  padding: 3px 8px;
  background-color: #484848;
  color: ${(props) => props.theme.main.text};
  background-color: ${(props) => props.theme.profile.keyword};
`;

const profileImageUrl =
  typeof window !== "undefined" &&
  window.location.host === "localhost:8000"
    ? "http://localhost:8000"
    : siteMetadata.siteUrl;

const Image = styled.div`
  background-image: url(${siteMetadata.siteUrl}/profile.png);
  width: 140px;
  height: 140px;
  border: 1px solid transparent;
  border-color: white;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

export default Profile;
