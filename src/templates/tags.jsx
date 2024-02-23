import React from "react"
import { Link, graphql } from "gatsby"
import PageLayout from "../components/layout/page-component"
import Tags from "../components/tag/tag-component"
import PostList from "../components/postlist"

const TagListTemplate = ({ pageContext, data, location }) => {
  const tag = pageContext
  const posts = data.allMarkdownRemark.nodes
  const totalCount = data.allMarkdownRemark.totalCount

  return (
    <PageLayout>
      <Tags>
        <Tags.Header
          totalCount={totalCount}
          tagName={tag}
        />
        <PostList posts={posts}/>
        <Link to="/tags">All tags</Link>
      </Tags>
    </PageLayout>
  )
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