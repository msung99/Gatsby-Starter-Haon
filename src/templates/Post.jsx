import React from "react"
import { Link, graphql } from "gatsby"
import Post from "../components/post/post-component"
import Layout from "../components/layout";

export default ({ data, location }) => {
  const post = data.markdownRemark
  const {title, date} = post.frontmatter;
  const author = data.site.siteMetadata.author;

  return (
    <Layout>
      <Post>
        <Post.Header
          title={title}
          date={date}
          author={author}
        />
        <Post.Content>
          <section dangerouslySetInnerHTML={{ __html: post.html }} itemProp="postBody"/>
        </Post.Content>
        <Post.Footer/>
      </Post>
    </Layout>
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
        author
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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