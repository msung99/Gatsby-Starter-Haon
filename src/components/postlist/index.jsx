import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import kebabCase from "lodash.kebabcase";
import { GoBookmarkFill } from "react-icons/go";
import { MdOutlineDateRange } from "react-icons/md";


const PostList = ({ posts }) => {
  const [postCount, setPostCount] = useState(10);

  useEffect(() => {
    setPostCount(10);
  }, [posts]);

  return (
    <PostListContainer>
      {posts.slice(0, postCount).map((post, index) => {
        const { title, description, date, tags, series } = post.frontmatter;
        const slug = post.fields.slug;

        return (
          <PostLink to={slug} key={index}>
            <PostCard>
              <PostTitle>{title || slug}</PostTitle>
              <PostTags>
                {tags.map((tag) => (
                  <PostTag key={kebabCase(tag)}>
                    #{tag}
                  </PostTag>
                ))}
              </PostTags>
              <PostDescription>{description}</PostDescription>
              <PostMeta>
                {series && (
                  <MetaWrapper>
                    <GoBookmarkFill style={{ marginRight: "8px" }} />
                    {series}
                  </MetaWrapper>
                )}
                <Separator />
                <MetaWrapper>
                    <MdOutlineDateRange style={{ marginRight: "8px" }} />
                    Created at {date}
                  </MetaWrapper>
              </PostMeta>
            </PostCard>
          </PostLink>
        );
      })}
    </PostListContainer>
  );
};

const PostListContainer = styled.div``;

const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const PostCard = styled.div`
  border-bottom: 2px solid #282828;
  margin-top: 40px;
  cursor: pointer;
  padding-bottom: 50px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const PostTitle = styled.h1`
  color: white;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const PostTag = styled.span`
  color: #cdd4d9;
  opacity: 0.8;
  font-size: 15px;
  margin-right: 25px;
`;

const PostDescription = styled.p`
  margin-top: 40px;
  margin-bottom: 16px;
  font-size: 15px;
  color: #e9e9e9;
  line-height: 1.5;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
`;

const Separator = styled.div`
  background-color: #282828;
  margin-right: 15px;
`;

const MetaWrapper = styled.span`
  display: flex;
  align-items: center;
  color: white;
  background-color: #3c3a39;
  padding: 8px;
  font-size: 14px;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4c4a49;
  }
`;

const PostDate = styled.p`
  font-size: 14px;
  color: #e9e9e9;
  margin-top: 16px;
`;

export default PostList;
