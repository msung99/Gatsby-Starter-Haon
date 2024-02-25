import React, { useCallback, useState } from "react"
import { graphql } from "gatsby"
import PageLayout from  "../components/layout/page-component"
import PostList from "../components/postlist"
import Search from "../components/search"

const SearchTemplate = ({ data }) => {
    const posts = data.allMarkdownRemark.nodes

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
          <Search onChange={e => setQuery(e.target.value)} placeholder="Search" count={query ? filteredPosts.length : 0}/>  
          {query && filteredPosts.length > 0 && <PostList posts={filteredPosts}/>}
          {!query && <p>Please enter a search query</p>}
          {query && filteredPosts.length === 0 && <p>No matching posts found</p>}
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
          tags
        }
        rawMarkdownBody
      }
    }
  }
`
