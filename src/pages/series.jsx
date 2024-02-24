import React from "react"
import { graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"
import SeriesList from "../components/series-list/SeriesList"

const SeriesListTemplate = ({ data, location }) => {
    const seriesList = data.allMarkdownRemark.group
    const totalCount = seriesList.length

    return (
        <PageLayout>
            <SeriesList seriesList={seriesList} totalCount={totalCount}/>
        </PageLayout>
    )
}

export default SeriesListTemplate

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
          series
        }
      }
      group(field: frontmatter___series) {
        fieldValue
        totalCount
      }
    }
  }
`