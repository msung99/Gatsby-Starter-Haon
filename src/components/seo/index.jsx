/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { siteMetadata } from "../../../gatsby-config";
import { Helmet } from "react-helmet";


const Seo = ({ title, description, url}) => {
  const seoImage = `${siteMetadata.siteUrl}/og-image.png`

  return (
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title}/>
        <meta property="og:site_title" content={title}/>
        <meta property="og:author" content={siteMetadata.author}/> 
        <meta property="og:type" content="website"/> 
        <meta property="og:image" content={seoImage}/>
        <meta property="og:description" content={description}/>
      </Helmet>
  )
}
export default Seo
