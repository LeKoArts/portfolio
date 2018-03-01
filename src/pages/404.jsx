/* eslint max-len: 0 */

import React from 'react';
import Link from 'gatsby-link';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Container from '../components/Container/Container';

const ErrorPage = () => (
  <div className="container">
    <Header slim>404</Header>
    <Container>
      <p />
      <h1>
        Oh. Hier ist wohl was schiefgelaufen{' '}
        <span role="img" aria-label="thinking">
          🤔
        </span>
      </h1>
      <h3>Die Seite, die du aufrufen wolltest, existiert nicht mehr oder ist momentan nicht erreichbar.</h3>
      <p>
        Um die Leere schnell zu überbrücken, kannst du zur <Link to="/">Homepage</Link> zurückkehren oder meine Videos
        bingewatchen! Schreib mir gerne deine Videovorschläge auf{' '}
        <a href="https://twitter.com/lekoarts_de" target="_blank" rel="nofollow noopener noreferrer">
          Twitter
        </a>{' '}
        <span role="img" aria-label="wink">
          😉
        </span>
      </p>
      <p />
    </Container>
    <Container>
      <div
        style={{
          position: 'relative',
          paddingBottom: '56.25%',
          overflow: 'hidden',
          width: '100%',
          height: 'auto',
          marginBottom: '2rem',
        }}
      >
        <iframe
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
          }}
          title="videos"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/videoseries?list=PLB-cmN3u7PHJTB_4eeuo6Hy1Ts2HgKD-5"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </Container>
    <Footer />
  </div>
);

export default ErrorPage;
