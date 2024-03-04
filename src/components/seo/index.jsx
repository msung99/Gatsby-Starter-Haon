/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { Helmet } from "react-helmet"
import { siteMetadata } from "../../../gatsby-config";

const Seo = ({ title, description, url }) => {
  return (
    <Helmet
      meta={[
          { property: "og:title", content: {title} },
          { property: "og:url", content: {url} },
          { property: "og:image", content: `${siteMetadata.siteUrl}/og-image.png`},
          { name: "og:description", content: {description} },
          { property: "og:description", content: {description} },
        ]}
    />
  )
}

export default Seo
