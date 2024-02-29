import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import kebabCase from "lodash.kebabcase";
import { FaStream } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";


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
          const { title, description, date, tags, series } = post.frontmatter;
          const slug = post.fields.slug;
          const body = post.excerpt || (post.rawMarkdownBody && truncate(post.rawMarkdownBody, 80));

          return (
            <PostLink to={slug} key={index}>
              <PostCard>
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
                <PostDescription>
                  {description || truncate(body, 80)}
                </PostDescription>
                <PostMeta>
                  {series && (
                    <MetaWrapper>
                      <FaStream style={{ marginRight: "8px" }} />
                      {series}
                    </MetaWrapper>
                  )}
                  {series && <Separator />}
                  <MetaWrapper>
                    <MdOutlineDateRange style={{ marginRight: "8px" }} />
                    Created at {date}
                  </MetaWrapper>
                </PostMeta>
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
  font-size: 1.8rem;
  margin-bottom: 20px;
  word-break: break-all;
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
  margin-bottom: 1.5px;
`;

const PostDescription = styled.p`
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #e9e9e9;
  line-height: 160%;
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
font-size: 15px;
font-weight: bold;
padding: 5px;
background-color: #2c2c2c;
border-radius: 6px;
border: 1px solid #4a4a4a;
display: inline-block;
color: #fff;
text-decoration: none;
transition: background-color 0.3s ease-in-out;

&:hover {
  background-color: #555;
}
`;


const PostDate = styled.p`
  font-size: 14px;
  color: #e9e9e9;
  margin-top: 16px;
`;

const EmptySpace = styled.div`
  height: 80vh;
`;


export default PostList;
