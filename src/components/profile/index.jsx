import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";
import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

/*
  siteMetadata: {
    title: `Haon Blog`,
    description: `게츠비를 활용한 기술 블로그입니다.`,
    author: `Haon`,
    siteUrl: `https://github.com/msung99/Gatsby-Starter-Haon`,
    onImage: `/og-image.png`
  },
*/
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
  color: #e6edf4;
  margin-right: 13px;
  border-radius: 25px;
  padding: 5px;
  background-color: #333A41;
`


const Image = styled.div`
  background-image: url(http://localhost:8000/profile2.jpeg);
  width: 140px;
  height: 140px;
  border: 1px solid transparent;
  border-color: white;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;



export default Profile;