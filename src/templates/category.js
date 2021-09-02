import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import PostSnippet from "../components/PostSnippet"

const Category = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const { category } = pageContext

  return (
    <Layout
      title={`Posts in '${category}'`}
      description={`A list of all the posts in the ${category} category.`}
      article={false}
    >
      <h1>Posts in '{category}'</h1>
      <p className="grey">
        {data.allMarkdownRemark.totalCount} post
        {data.allMarkdownRemark.totalCount > 1 ? "s" : null}
      </p>
      <div className="items">
        {posts.map(({ node }) => (
          <PostSnippet key={node.id} node={node}></PostSnippet>
        ))}
      </div>
      <p className="grey" style={{ paddingTop: "2rem" }}>
        <Link to="/blog">{`<--`} return to all posts</Link>
      </p>
    </Layout>
  )
}

export const query = graphql`
  query ($category: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            description
            date(formatString: "MMMM D, YYYY")
            category
            type
          }
          fields {
            slug
          }
          timeToRead
          excerpt(pruneLength: 190)
        }
      }
    }
  }
`

export default Category