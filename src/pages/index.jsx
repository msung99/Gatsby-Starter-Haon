import React from "react"
import { Link, graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"

const PostListTemplate = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <PageLayout>
        <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug
            const description = post.frontmatter.description
            const date = post.frontmatter.date;

            return (
            <li key={post.fields.slug}>
                <div>
                    <h1>
                        <Link to = {post.fields.slug}>
                            <span itemProp="headline">{title}</span>
                        </Link>
                    </h1>
                    <p>{date}</p>
                    <p>{description}</p>
                </div>
                <section>
                  <p dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt 
                  }}
                  itemProp="description"
                  />
                </section>
            </li>
            )
        })}
        </ol>
    </PageLayout>
  )
}

export default PostListTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
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
        }
      }
    }
  }
`