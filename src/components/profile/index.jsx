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
const Profile = ({author, description, title, siteUrl}) => {
    return (
      <ProfileStyle>
          <Image siteUrl={siteUrl}/>
          <Text>
              <Author>{author}</Author>
              <Description>{description}</Description>
          </Text>
        </ProfileStyle>
    );
}

const ProfileStyle = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 80px;
  border-bottom: 1px solid #282828; 
  width: 70%;
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

const Image = styled.div`
  background-image: url(http://localhost:8000/profile2.jpeg);
  background-size: cover;
  background-position: center;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border-style: solid;
  border-width: 1px;
  border-color: white;
`;


export default Profile;