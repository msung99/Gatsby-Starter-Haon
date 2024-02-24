import React from "react"
import { Link, graphql } from "gatsby"
import PageLayout from "../components/layout/page-component"
import Tags from "../components/tag/tag-component"
import PostList from "../components/postlist"
import TagsContent from "../components/tag/tag-content"

const TagListTemplate = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const posts = data.allMarkdownRemark.nodes;
  const totalCount = data.allMarkdownRemark.totalCount;
  const currentTag = tag; // Save the current tag
  const tags = Array.from(
    new Set(posts.flatMap(post => post.frontmatter.tags))
  ).filter(tag => tag !== currentTag); // Collect all tags excluding the current tag

  return (
    <PageLayout>
      <Tags>
        <Tags.Header
          tagName={currentTag}
          tags={tags}
        />
        <TagsContent totalCount={totalCount} posts={posts}/>
      </Tags>
    </PageLayout>
  );
}

export default TagListTemplate

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
        }
      }
    }
  }
`