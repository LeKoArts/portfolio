/* eslint max-len: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'react-emotion';
import { Container, Layout } from 'elements';
import Footer from '../components/Footer';
import FeaturedProject from '../components/FeaturedProject';
import FeaturedPost from '../components/FeaturedPost';
import Header from '../components/Header';
import Button from '../components/Button';

const ProjectsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  margin-top: -10rem;
`;

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10rem;
`;

const Text = styled.p`
  text-align: center;
  font-family: ${props => props.theme.fontFamily.heading};
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.5rem;
  max-width: 850px;
  margin: 5rem auto;
  text-shadow: ${props => props.theme.shadow.text.big};
`;

const Index = ({
  data: {
    content: { data: home },
    projects: { edges: projectEdges },
    posts: { edges: postEdges },
  },
}) => (
  <Layout>
    <Header big html={`<h1>${home.hero_title}</h1>`} />
    <Container type="big">
      <ProjectsWrapper>
        {projectEdges.map(project => (
          <FeaturedProject
            key={project.node.uid}
            cover={project.node.data.cover.localFile.childImageSharp.fluid}
            customer={project.node.data.customer}
            path={project.node.fields.slug}
            title={project.node.data.title.text}
          />
        ))}
      </ProjectsWrapper>
    </Container>
    <Container>
      <Text>
        {home.teaser_projects.text} <br />
        <Button to="/projekte" type="primary" role="button">
          Projekte
        </Button>
      </Text>
    </Container>
    <Container>
      <PostsWrapper>
        {postEdges.map(post => (
          <FeaturedPost
            key={post.node.uid}
            cover={post.node.data.cover.localFile.childImageSharp.fluid}
            date={post.node.data.date}
            path={post.node.fields.slug}
            title={post.node.data.title.text}
            category={post.node.data.category.document[0].data.kategorie}
          />
        ))}
      </PostsWrapper>
      <Text>
        {home.teaser_blog.text} <br />
        <Button to="/blog" type="secondary" role="button">
          Blog
        </Button>
      </Text>
    </Container>
    <Footer />
  </Layout>
);

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.object.isRequired,
    projects: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
    posts: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    content: prismicHome {
      data {
        hero_title
        teaser_projects {
          text
        }
        teaser_blog {
          text
        }
      }
    }
    projects: allPrismicProjekt(limit: 3, sort: { fields: [data___date], order: DESC }) {
      edges {
        node {
          uid
          fields {
            slug
          }
          data {
            title {
              text
            }
            customer
            cover {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1000, quality: 90, traceSVG: { color: "#2B2B2F" }) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
    posts: allPrismicBlogpost(limit: 2, sort: { fields: [data___date], order: DESC }) {
      edges {
        node {
          uid
          fields {
            slug
          }
          data {
            title {
              text
            }
            date(formatString: "DD.MM.YYYY")
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
                  fluid(maxWidth: 1000, quality: 90, traceSVG: { color: "#2B2B2F" }) {
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
`;
