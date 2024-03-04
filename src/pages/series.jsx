import React from "react"
import { graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"
import SeriesList from "../components/series-list/SeriesList"
import Seo from "../components/seo"

const SeriesListTemplate = ({ data, location }) => {
    const seriesList = data.allMarkdownRemark.group
    const totalCount = seriesList.length
    const author = data.site.siteMetadata.author
    const description = data.site.siteMetadata.description

    return (
        <PageLayout>
            <Seo title={author} description={description}/>
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
          previewImage
        }
      }
      group(field: frontmatter___series) {
        fieldValue
        totalCount
        nodes {
          frontmatter {
            date
          }
        }
      }
    }
  }
`;
