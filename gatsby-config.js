require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const config = require('./config/website');
const { RichText } = require('prismic-reactjs');
const Prism = require('prismjs');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-css');
require('prismjs/components/prism-scss');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-json');
require('prismjs/components/prism-diff');
require('prismjs/components/prism-markdown');
require('prismjs/components/prism-graphql');

const { Elements } = RichText;
const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

module.exports = {
  /* General Information */
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
  },
  /* Plugins */
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'lekoarts',
        accessToken: `${process.env.API_KEY}`,
        linkResolver: ({ node, key, value }) => doc => {
          if (doc.type === 'projekt') return `/projekte/${doc.uid}`;
          if (doc.type === 'blogpost') return `/blog/${doc.uid}`;

          return `/${doc.uid}`;
        },
        htmlSerializer: ({ node, key, value }) => (type, element, content, children) => {
          switch (type) {
            case Elements.label:
              return `<code class="language-${element.data.label}">${content}</code>`;
            case Elements.preformatted:
              return `<pre class="language-${element.label}"><code class="language-${element.label}">${Prism.highlight(
              element.text,
              Prism.languages[element.label]
            )}</code></pre>`;
            default:
              return null;
          }
        },
      },
    },
    'gatsby-source-filesystem',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID,
        anonymize: true,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor,
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'config/typography.js',
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-lodash',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteShortName,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'fullscreen',
        icons: [
          {
            src: '/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    /* Must be placed at the end */
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
};
