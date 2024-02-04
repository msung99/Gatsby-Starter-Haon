import React from "react"
import { Link, graphql } from "gatsby"
import Post from "../components/post/post-component"

export default ({ data, location }) => {
  const post = data.markdownRemark
  const { previous, next } = data

  const {title, description, date} = post.frontmatter;

  return (
    <Post>
      <Post.Header
        title={title}
        description={description}
        date={date}
      />
      <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="postBody"
      />
    </Post>
  )
}


export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`


/*
<PageLayout>
       <div>
          <h1> {post.frontmatter.title} </h1>
          <h3> {post.frontmatter.description} </h3>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          {previous && (
            <Link to={previous.fields.slug}>
              previous post ({previous.frontmatter.title})
            </Link>
          )}{" "}
          {next && (
            <Link to={next.fields.slug}>next post ({next.frontmatter.title})</Link>
          )}
         </div>
    </PageLayout>


export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
*/