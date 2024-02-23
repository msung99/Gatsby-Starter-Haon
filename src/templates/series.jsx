import React from "react"
import { Link, graphql } from "gatsby"
import PageLayout from "../components/layout/page-component"
import PostList from "../components/postlist"

const SeriesTemplate = ({pageContext, data}) => {
    const seriesName = pageContext.series
    const posts = data.posts.nodes
    const totalCount = posts.length

    return (
        <PageLayout>
            <Series>
                <Series.Header
                  seriesName={seriesName}
                />
                <Series.SeriesContent totalCount={totalCount} posts={posts}/>
            </Series>
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