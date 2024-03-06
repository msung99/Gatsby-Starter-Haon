/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `haon.blog`,
    description: `Hello! This is a tech blog theme using Gatsby 🤩`,
    author: `Haon`,
    siteUrl: `https://main--sage-malasada-49a59a.netlify.app`,
    repo: 'msung99/Gatsby-Starter-Haon',
    keywords: [`server`, `backend`, `gatsby`], 
    onImage: `/og-image.png`,
    socialLinks: { 
      github: 'https://github.com/',
      instagram: 'https://www.instagram.com/', 
      facebook: 'https://www.facebook.com/', 
      linkedin: 'https://www.linkedin.com/',
      velog: 'https://velog.io/',
      email: `https://naver.com`
  },
  },
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              maxHeight: 400,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`
          }
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/contents/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
  ],
}
