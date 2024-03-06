/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { Helmet } from "react-helmet"
import { siteMetadata } from "../../../gatsby-config";


const Seo = ({ title, description }) => {

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta property="og:url" content={siteMetadata.siteUrl}/>
        <meta property="og:title" content={title}/>
        <meta property="og:image" content={`${siteMetadata.siteUrl}/og-image.png`}/>
        <meta property="og:url" content={siteMetadata.siteUrl}/>
        <meta property="og:description" content={description}/>
      </Helmet>
    </div>
  )
}
export default Seo
