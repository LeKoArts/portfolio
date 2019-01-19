import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { Container, Layout } from 'elements'
import { Footer, Header } from 'components'
import config from '../../config/website'

const Imprint = ({
  data: {
    content: { data: i },
  },
  pageContext: { locale },
  location,
}) => (
  <Layout locale={locale} pathname={location.pathname}>
    <Helmet title={`${i.title.text} | ${config.siteTitleAlt}`} />
    <Header title={i.title.text}>{i.description.text}</Header>
    <div style={{ marginTop: '3rem' }}>
      <Container type="article">
        <div dangerouslySetInnerHTML={{ __html: i.content.html }} />
      </Container>
    </div>
    <Footer />
  </Layout>
)

export default Imprint

Imprint.propTypes = {
  data: PropTypes.shape({
    allPrismicSeite: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query ImprintQuery($name: String!, $locale: String!) {
    content: prismicSeite(uid: { eq: $name }, lang: { eq: $locale }) {
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
  }
`
