const { createFilePath } = require(`gatsby-source-filesystem`)
const kebabCase = require(`lodash.kebabcase`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const postTemplate = require.resolve(`./src/templates/Post.jsx`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: ASC }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            tags
            series
            previewImage
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes
  let tags = new Set()
  let seriesList = new Set() // 3. set to store tags

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: postTemplate,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
      // get tags from post
      if (post.frontmatter.tags) {
           post.frontmatter.tags.forEach((tag) => {
             tags.add(tag)
           })
      }

      if (post.frontmatter.series) {
        const series = post.frontmatter.series;
        seriesList.add(series);
      }      
    })
  }

   // 5. create tag pages
   const tagTemplate = require.resolve(`./src/templates/tag.jsx`)
   tags.forEach(tag => {
     createPage({
       path: `/tags/${kebabCase(tag)}/`,
       component: tagTemplate,
       context: {
         tag,
       },
     })
   })

   const seriesTemplate = require.resolve(`./src/templates/series.jsx`)
   seriesList.forEach(series => {
     createPage({
       path: `/series/${kebabCase(series)}/`,
       component: seriesTemplate,
       context: {
        series,
       },
     })
   })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}