import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'react-emotion'
import { Container, Layout } from 'elements'
import config from '../../config/website'
import ItemBlog from '../components/ItemBlog'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Base = styled.main`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
`

const Blog = ({
  data: {
    allPrismicBlogpost: { edges },
    content: { data: b },
  },
  pageContext: { locale },
}) => (
  <Layout locale={locale}>
    <Helmet title={`${b.title.text} | ${config.siteTitle}`} />
    <Header title={b.title.text}>{b.description.text}</Header>
    <Container type="big">
      <Base>
        {edges.map(post => (
          <ItemBlog
            key={post.node.uid}
            path={post.node.fields.slug}
            cover={post.node.data.cover.localFile.childImageSharp.fluid}
            title={post.node.data.title.text}
            date={post.node.data.date}
            category={post.node.data.category.document[0].data.kategorie}
            timeToRead={post.node.fields.timeToRead}
            excerpt={post.node.fields.excerpt}
          />
        ))}
      </Base>
    </Container>
    <Footer />
  </Layout>
)

export default Blog

Blog.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
}

export const pageQuery = graphql`
  query BlogQuery($name: String!) {
    content: prismicSeite(uid: { eq: $name }) {
      data {
        title {
          text
        }
        description {
          text
        }
        content {
          html
        }
      }
    }
    allPrismicBlogpost(sort: { fields: [data___date], order: DESC }) {
      edges {
        node {
          uid
          fields {
            slug
            timeToRead
            excerpt
          }
          data {
            title {
              text
            }
            date(formatString: "DD.MM.YYYY", locale: "de")
            category {
              document {
                data {
                  kategorie
                }
              }
            }
            cover {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 900, quality: 85, traceSVG: { color: "#2B2B2F" }) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
