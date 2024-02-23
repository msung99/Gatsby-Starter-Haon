import React from "react"
import { Link, graphql } from "gatsby"
import PageLayout from "../components/layout/page-component"

const Series = ({pageContext, data}) => {
    const seriesName = pageContext.series
    const posts = data.posts.nodes

    return (
        <PageLayout>

        </PageLayout>
    )
}

export default Series

export const pageQuery = graphql`
  query BlogSeriesBySeriesName($series: String) {
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { series: { eq: $series } } }
    ) {
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
`