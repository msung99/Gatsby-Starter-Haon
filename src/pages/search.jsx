import React, { useCallback, useState } from "react"
import { graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"
import PostList from "../components/postlist"
import Search from "../components/search"
import Seo from "../components/seo"
import { siteMetadata } from "../../gatsby-config"

const SearchTemplate = ({ data }) => {
    const posts = data.allMarkdownRemark.nodes
    const title = siteMetadata.author;
    const description = siteMetadata.description;

    const [query, setQuery] = useState(null) // Initialize with null

    const filteredPosts = useCallback(
      posts.filter(post => {
        const { frontmatter, rawMarkdownBody } = post
        const { title } = frontmatter
        const lowerQuery = (query || '').toLocaleLowerCase() // Handle null query

        if (rawMarkdownBody.toLocaleLowerCase().includes(lowerQuery)) return true

        return title.toLocaleLowerCase().includes(lowerQuery)
      }), [query, posts]
    )

    return (
        <PageLayout>
          <Seo title={title} description={description}/>
          <Search onChange={e => setQuery(e.target.value)} placeholder="Enter your search keyword" count={query ? filteredPosts.length : 0}/>  
          {query && filteredPosts.length > 0 && <PostList posts={filteredPosts}/>}
        </PageLayout>
    )
}

export default SearchTemplate

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
          series
          previewImage
        }
        rawMarkdownBody
      }
    }
  }
`