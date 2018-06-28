const path = require('path');
const _ = require('lodash');
const { timeToRead, fullText, ex } = require('./src/utilities');

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  let slug;
  if (node.internal.type === 'PrismicProjekt') {
    slug = `/projekt/${node.uid}`;
    createNodeField({ node, name: 'slug', value: slug });
    createNodeField({ node, name: 'sourceType', value: 'Projekte' });
  }
  if (node.internal.type === 'PrismicBlogpost') {
    slug = `/blog/${node.uid}`;
    createNodeField({ node, name: 'slug', value: slug });
    createNodeField({ node, name: 'sourceType', value: 'Blog' });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve('src/templates/post.jsx');

    resolve(
      graphql(`
        {
          posts: allPrismicBlogpost(sort: { fields: [data___date], order: DESC }) {
            edges {
              node {
                fields {
                  slug
                }
                data {
                  title {
                    text
                  }
                  body {
                    ... on PrismicBlogpostBodyText {
                      primary {
                        text {
                          text
                        }
                      }
                      slice_type
                    }
                  }
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
                        resize(width: 600) {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const categorySet = new Set();

        const postsList = result.data.posts.edges;

        let TTR;
        let excerpt;

        postsList.forEach(post => {
          if (post.node.data.category.document[0].data.kategorie) {
            categorySet.add(post.node.data.category.document[0].data.kategorie);
          }

          const filtered = _.filter(postsList, input => input.node.fields.slug !== post.node.fields.slug);
          const sample = _.sampleSize(filtered, 2);
          const left = sample[0].node;
          const right = sample[1].node;

          TTR = timeToRead(fullText(post));
          excerpt = ex(post.node.data.body[0].primary.text.text);

          createPage({
            path: post.node.fields.slug,
            component: postPage,
            context: {
              slug: post.node.fields.slug,
              left,
              right,
              timeToRead: TTR,
              excerpt,
            },
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
