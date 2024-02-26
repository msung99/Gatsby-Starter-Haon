import React from "react";
import { Link, graphql } from "gatsby";
import Post from "../components/post/post-component";
import PageLayout from "../components/layout/page-component";
import PostContent from "../components/post/post-content";
import Utterances from "../components/utterances";
import TableOfContents from "../components/toc";

export default ({ data, location }) => {
  const { previous, next } = data;
  const post = data.markdownRemark;
  const { title, date } = post.frontmatter;
  const author = data.site.siteMetadata.author;
  const toc = post.tableOfContents;

  return (
    <PageLayout>
      <Post>
        <Post.Header
          title={title}
          date={date}
          author={author}
        />
        <PostContent>
          {toc && <TableOfContents content={toc} />}
          <section dangerouslySetInnerHTML={{ __html: post.html }} itemProp="postContent" />
        </PostContent>
      </Post>
      <Utterances/>
    </PageLayout>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents(maxDepth: 3)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
