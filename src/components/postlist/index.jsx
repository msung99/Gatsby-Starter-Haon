import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import kebabCase from "lodash.kebabcase";


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
                <Date>
                  {date}
                </Date>
                <PostDescription>
                  {description || truncate(body, 80)}
                </PostDescription>  
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
  border-bottom: 1px solid ${props => props.theme.postlist.border};
  z-index: 1000;
  margin-top: 1px;
  cursor: pointer;
  padding-bottom: 50px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Date = styled.div`
  margin-top: 25px;
  font-size: 14px;
  color: ${props => props.theme.postlist.date};
  opacity: 0.8;
`

const PostTitle = styled.h1`
  color: ${props => props.theme.main.text};
  font-size: 1.8rem;
  margin-top: 40px;
  margin-bottom: 20px;
  word-break: break-all;
  font-weight: 800;
  line-height: 140%;
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
  margin-bottom: 1.5px;
`;

const PostDescription = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 15.5px;
  line-height: 170%;
  color: ${props => props.theme.postlist.text};
`;

const EmptySpace = styled.div`
  height: 80vh;
`;


export default PostList;
