/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { Helmet } from "react-helmet"
import { siteMetadata } from "../../../gatsby-config";
import {ogImage} from "../../../static/og-image.png"

const Seo = ({ title, description }) => {
  const url =
  typeof window !== "undefined" &&
  window.location.host === "localhost:8000"
    ? "http://localhost:8000"
    : siteMetadata.siteUrl;

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta property="og:url" content={url}/>
        <meta property="og:title" content={title}/>
        <meta property="og:image" content={ogImage}/>
        <meta property="og:url" content={url}/>
        <meta property="og:description" content={description}/>
      </Helmet>
    </div>
  )
}
export default Seo
