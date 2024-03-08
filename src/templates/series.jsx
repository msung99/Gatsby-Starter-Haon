import React from "react"
import { graphql } from "gatsby"
import PageLayout from "../components/layout/page-component"
import Series from "../components/series/series-component"
import Seo from "../components/seo"
import { siteMetadata } from "../../gatsby-config"

const SeriesTemplate = ({pageContext, data, location}) => {
    const seriesName = pageContext.series
    const posts = data.allMarkdownRemark.nodes;
    const totalCount = posts.length
    const description = siteMetadata.description;

    return (
        <PageLayout>
            <Seo title={seriesName} description={description}/>
            <Series>
                <Series.Header
                  seriesName={seriesName}
                />
                <Series.Content totalCount={totalCount} posts={posts}/>
            </Series>
        </PageLayout>
    )
}


export default SeriesTemplate

export const pageQuery = graphql`
  query($series: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { series: { in: [$series] } } }
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
          series
        }
      }
    }
  }
`