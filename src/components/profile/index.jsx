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
          <div>
              <Author>{author}</Author>
              <Description>{description}</Description>
          </div>
        </ProfileStyle>
    );
}

const ProfileStyle = styled.div`
  display: flex;
  align-items: center;
`

const Author = styled.div`
`

const Description = styled.div`
`

const Image = styled.div`
  background-image: ${siteUrl => {
    if (siteUrl === null || siteUrl === '' || siteUrl === undefined) {
      return `url(http://localhost:8000/profile.png)`;
    } else {
      return `url({${siteUrl}/profile.png)`;
    }
  }};
  background-size: cover;
  background-position: center;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border-style: solid;
  border-width: 1px;
  border-color: white;
`;


export default Profile;