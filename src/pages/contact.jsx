/* eslint max-len: 0 */

import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { Container, Layout } from 'elements'
import Footer from '../components/Footer'
import { LinkCard } from '../components/Card'
import Header from '../components/Header'
import Button from '../components/Button'
import config from '../../config/website'
import Paperplane from '../icons/Paperplane'
import GitHub from '../icons/GitHub'
import Instagram from '../icons/Instagram'
import Behance from '../icons/Behance'
import YouTube from '../icons/YouTube'

const CenteredContainer = styled(Container)`
  text-align: center;
  svg {
    fill: white;
  }
`

const Wrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 2rem;
`

const MyLinkCard = styled(LinkCard)`
  flex-basis: calc(99% * 1 / 4 - 1rem);
  max-width: calc(99% * 1 / 4 - 1rem);
  width: calc(99% * 1 / 4 - 1rem);
  margin-bottom: 2rem;
  @media (max-width: 1135px) {
    flex-basis: calc(99% * 1 / 2 - 1rem);
    max-width: calc(99% * 1 / 2 - 1rem);
    width: calc(99% * 1 / 2 - 1rem);
  }
  @media (max-width: 690px) {
    flex-basis: calc(99% * 1 / 1);
    max-width: calc(99% * 1 / 1);
    width: calc(99% * 1 / 1);
  }
`

const CardContainer = styled(Container)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 4rem;
`

const Outbound = Button.withComponent('a')

const Contact = ({
  data: {
    content: { data: c },
  },
  pageContext: { locale, i18n },
}) => (
  <Layout locale={locale}>
    <Helmet title={`${c.title.text} | ${config.siteTitleAlt}`} />
    <Header title={c.title.text}>{c.description.text}</Header>
    <Wrapper>
      <Container type="article">
        <div dangerouslySetInnerHTML={{ __html: c.content.html }} />
      </Container>
      <CenteredContainer>
        <Outbound
          href="mailto:&#104;&#101;&#108;&#108;&#111;&#064;&#108;&#101;&#107;&#111;&#097;&#114;&#116;&#115;&#046;&#100;&#101;"
          type="primary"
          role="button"
        >
          <Paperplane /> E-Mail
        </Outbound>
      </CenteredContainer>
      <CardContainer>
        <MyLinkCard link="https://github.com/LekoArts" github>
          <GitHub />
          {i18n.pageContactGitHub}
        </MyLinkCard>
        <MyLinkCard link="https://www.instagram.com/lekoarts.de" instagram>
          <Instagram />
          {i18n.pageContactInstagram}
        </MyLinkCard>
        <MyLinkCard link="https://www.behance.net/lekoarts" behance>
          <Behance />
          {i18n.pageContactBehance}
        </MyLinkCard>
        <MyLinkCard link="https://youtube.de/LekoArtsDE" youtube>
          <YouTube />
          {i18n.pageContactYouTube}
        </MyLinkCard>
      </CardContainer>
    </Wrapper>
    <Footer />
  </Layout>
)

export default Contact

Contact.propTypes = {
  data: PropTypes.shape({
    allPrismicSeite: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    i18n: PropTypes.object.isRequired,
  }).isRequired,
}

export const pageQuery = graphql`
  query ContactQuery($name: String!) {
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
  }
`
