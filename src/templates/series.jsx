import React from "react"
import { Link, graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"
import SeriesList from "../components/series/Series"

const SeriesListTemplate = ({ data, location }) => {  
    const seriesList = data.allMarkdownRemark.nodes.frontmatter
    
    return (
      <PageLayout>
        <SeriesList series={series}></SeriesList>
      </PageLayout>
    )
  }
  
  export default PostListTemplate
  
  export const pageQuery = graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        nodes {
          excerpt(pruneLength: 500, truncate: true)
          fields {
            slug
          }
          frontmatter {
            series
          }
        }
      }
    }
  `