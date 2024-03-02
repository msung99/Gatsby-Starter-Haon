import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import kebabCase from "lodash.kebabcase";
import { siteMetadata } from "../../../gatsby-config";

const PostList = ({ posts }) => {
  const [postCount, setPostCount] = useState(10);

  useEffect(() => {
    setPostCount(10);
  }, [posts]);

  return (
    <PostListContainer>
      {posts.length === 0 ? (
        <EmptySpace />
      ) : (
        posts.slice(0, postCount).map((post, index) => {
          const { title, description, date, tags, series, previewImage } = post.frontmatter;
          const slug = post.fields.slug;
          const body = post.excerpt || (post.rawMarkdownBody && truncate(post.rawMarkdownBody, 80));

          return (
            <PostLink to={slug} key={index}>
              <PostCard>
                <PostContent>
                  <PostTitle>{title || slug}</PostTitle>
                  {tags && (
                    <PostTags>
                      {tags.map((tag) => (
                        <PostTag key={kebabCase(tag)}>
                          #{tag}
                        </PostTag>
                      ))}
                    </PostTags>
                  )}
                  <Date>{date}</Date>
                  <PostDescription>
                    {description || truncate(body, 80)}
                  </PostDescription>  
                </PostContent>
                <ImageWrapper>
                  <Image previewImage={previewImage} />
                </ImageWrapper>
              </PostCard>
            </PostLink>
          );
        })
      )}
    </PostListContainer>
  );
};

const truncate = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const PostListContainer = styled.div``;

const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
`;

const PostCard = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.postlist.border};
  z-index: 1000;
  cursor: pointer;
  padding: 20px;
  width: 100%;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const PostContent = styled.div`
  flex: 1;
`;

const Date = styled.div`
  margin-top: 30px;
  font-size: 14px;
  color: ${props => props.theme.postlist.date};
  opacity: 0.8;
`;

const PostTitle = styled.h1`
  color: ${props => props.theme.main.text};
  font-size: 1.9rem;
  margin-top: 30px;
  margin-bottom: 15px;
  word-break: break-all;
  font-weight: 800;
  line-height: 130%;
`;

const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PostTag = styled.span`
  color: ${props => props.theme.postlist.tag};
  opacity: 0.8;
  font-size: 15px;
  margin-right: 13px;
  margin-bottom: 8px;
`;

const PostDescription = styled.p`
  margin-top: 10px;
  margin-bottom: 70px;
  font-size: 15.5px;
  line-height: 170%;
  color: ${props => props.theme.postlist.text};
`;

const EmptySpace = styled.div`
  height: 80vh;
`;

const basicUrl =
  typeof window !== "undefined" && window.location.host === "localhost:8000"
    ? "http://localhost:8000"
    : siteMetadata.siteUrl;

    const ImageWrapper = styled.div`
    width: 150px;
    height: 150px;
    margin-left: 30px;
    overflow: hidden;
    border-radius: 50%;
    background-repeat: no-repeat;
  `;
  
  const Image = styled.div`
  background-image: url(${props => (props.previewImage ? `${basicUrl}/${props.previewImage}` : `${basicUrl}/default.png`)});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;
  


export default PostList;
