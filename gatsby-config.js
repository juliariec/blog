/**
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "juliariec",
    titleTemplate: "%s · juliariec",
    author: "Julia Cooke",
    description: "Thoughts on books, software, and life.",
    siteUrl: "https://www.juliariec.com",
    url: "https://www.juliariec.com",
    image: "logo.png",
  },
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
                {
                  allMarkdownRemark(
                    sort: { order: DESC, fields: [frontmatter___date] },
                  ) {
                    edges {
                      node {
                        excerpt(pruneLength: 210)
                        html
                        fields { slug }
                        frontmatter {
                          title
                          date
                        }
                      }
                    }
                  }
                }
              `,
            output: "/rss.xml",
            title: "juliariec RSS Feed",
          },
        ],
      },
    },
    `gatsby-plugin-advanced-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-offline`,
  ],
}
