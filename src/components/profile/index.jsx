import kebabCase from "lodash.kebabcase";
import React from "react";
import styled from "styled-components";
import { siteMetadata } from "../../../gatsby-config";

const Profile = ({ author, description, siteUrl, keywords }) => {
  return (
    <ProfileStyle>
      <Image siteUrl={siteUrl} />
      <Text>
        <Author>{author}</Author>
        <Description>{description}</Description>
        <KeyWordsStyle>
          {keywords.map(keyword => (
                      <KeyWordStyle key={kebabCase(keyword)}>
                        {kebabCase(keyword)}
                      </KeyWordStyle>
          ))}
      </KeyWordsStyle>
      </Text>
    </ProfileStyle>
  );
};

const ProfileStyle = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 40px;
`

const Text = styled.div`
  margin-left: 30px;
`

const Author = styled.div`
  font-size: 30px;
  color: white;
  padding-bottom: 8px;
`

const Description = styled.div`
  font-size: 16px;
  color: #bababa;
`

const KeyWordsStyle = styled.div`
  margin-top: 20px;
`

const KeyWordStyle = styled.span`
  font-size: 17px;
  color: #fff;
  margin-right: 13px;
  border-radius: 15px;
  padding: 3px 8px;
  background-color: #484848;
`

const profileImageUrl =
  typeof window !== "undefined" && window.location.host === "localhost:8000"
    ? "http://localhost:8000"
    : siteMetadata.siteUrl


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