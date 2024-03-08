import React from "react"
import { Link, graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"
import styled from "styled-components"
import AllTagList from "../components/tags"
import Seo from "../components/seo"
import { siteMetadata } from "../../gatsby-config"

const TagListTemplate = ({ data, location }) => {
  const title = siteMetadata.title;

  const allPosts = data.allMarkdownRemark.nodes;
  const tagsWithPrivatePosts = data.allMarkdownRemark.group.map(tag => {
    const privatePosts = allPosts.filter(post => 
      post.frontmatter && 
      post.frontmatter.tags && 
      post.frontmatter.tags.includes(tag.fieldValue) && 
      post.frontmatter.isPrivate
    );
    const publicPosts = allPosts.filter(post => 
      post.frontmatter && 
      post.frontmatter.tags && 
      post.frontmatter.tags.includes(tag.fieldValue) && 
      !post.frontmatter.isPrivate
    );

    return {
      ...tag,
      privatePostsCount: privatePosts.length,
      publicPostsCount: publicPosts.length
    };
  });

  const tags = tagsWithPrivatePosts.filter(tag => tag.privatePostsCount === 0 || tag.publicPostsCount > 0);
  const allCount = tags.length;
  const author = data.site.siteMetadata.author;
  
  return (
    <PageLayout>
      <Seo title={title} description={tags}/>
      <TagListWrapper>
        <AllTagList tags={tags} allCount={allCount}></AllTagList>
      </TagListWrapper>
    </PageLayout>
  );
}


const TagListWrapper = styled.div`
  @media(max-width: 768px) {
    padding: 0 30px;
  }
`

export default TagListTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        keywords
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt(pruneLength: 500, truncate: true)
        fields {
          slug
        }
        frontmatter {
          title
          description
          date
          tags
          previewImage
          isPrivate
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
