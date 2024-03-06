/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { siteMetadata } from "../../../gatsby-config";
import { Helmet } from "react-helmet";


const Seo = ({ title, description}) => {
  const seoImage = `${siteMetadata.siteUrl}/og-image.png`
  const metaDescription = description || siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={title}
      defaultTitle={siteMetadata.title}
      meta={[
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:site_title",
          content: title,
        },
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:author",
          content: siteMetadata.author.name,
        },
        {
          property: "og:image",
          content: seoImage,
        },
        {
          property: "og:type",
          content: "website",
        },
      ]}
    />
  )
}
export default Seo
