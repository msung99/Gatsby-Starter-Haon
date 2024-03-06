/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { siteMetadata } from "../../../gatsby-config";
import { Helmet } from "react-helmet-async";

const Seo = ({ title, description }) => {
  return (
      <Helmet>
        <title>{title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title}/>
        <meta property="og:site_name" content={siteMetadata.title} />
        <meta property="og:url" content={siteMetadata.siteUrl}/>
        <meta property="og:image" content={`${siteMetadata.siteUrl}/og-image.png`}/>
        <meta property="og:description" content={description}/>
      </Helmet>
  )
}
export default Seo
