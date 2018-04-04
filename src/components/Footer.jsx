import React from 'react';
import Link from 'gatsby-link';
import format from 'date-fns/format';
import styled from 'react-emotion';
import Wave from './Wave/Waves';
import Container from './Container/Container';

const Wrapper = styled.footer`
  position: relative;
  padding-top: 10rem;
  padding-bottom: 2rem;
  background: ${p => p.theme.gradient.leftToRight};
`;

const OptionalContent = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  h1,
  h2 {
    color: ${p => p.theme.colors.white.base};
    text-align: center;
    margin: 0 auto;
    display: block;
  }
`;

const Content = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${p => p.theme.colors.white.blue};
  a {
    color: ${p => p.theme.colors.white.blue};
    &:hover {
      color: ${p => p.theme.colors.blue.base};
    }
  }
  @media (max-width: ${p => p.theme.breakpoints.s}) {
    flex-direction: column;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  text-shadow: 0 5px 10px rgba(0, 0, 0, 0.13);
  @media (max-width: ${p => p.theme.breakpoints.s}) {
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1rem;
    a {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
`;

const Important = styled(Item)`
  font-size: 1.2rem;
  a {
    color: ${p => p.theme.colors.white.base};
    &:hover {
      color: ${p => p.theme.colors.blue.base};
    }
  }
`;

const Copyright = styled.div`
  margin: 1rem 0;
  text-align: center;
`;

const Footer = ({ children }) => {
  const date = format(new Date(), 'YYYY');
  return (
    <Wrapper>
      <Wave top />
      <Container>
        <OptionalContent>{children}</OptionalContent>
        <Content>
          <Important>
            <a href="https://www.patreon.com/lekoarts" target="_blank" rel="noopener noreferrer">
              Patreon
            </a>
            <Link to="/categories/tutorial">Tutorials</Link>
            <Link to="/categories/freebie">Freebies</Link>
          </Important>
          <Item>
            <Link to="/impressum">Impressum</Link>
            <Link to="/datenschutz">Datenschutzerklärung</Link>
          </Item>
          <Item>
            <a href="https://www.behance.net/lekoarts" target="_blank" rel="noopener noreferrer">
              Behance
            </a>
            <a href="https://dribbble.com/LekoArts" target="_blank" rel="noopener noreferrer">
              Dribbble
            </a>
            <a href="https://www.facebook.com/lekoarts.de" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://www.instagram.com/lekoarts.de" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </Item>
        </Content>
        <Copyright>{`Copyright © ${date}. LekoArts. Alle Rechte vorbehalten.`}</Copyright>
      </Container>
    </Wrapper>
  );
};

export default Footer;
