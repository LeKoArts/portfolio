/* eslint no-unused-expressions: 0 */

import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import Headroom from 'react-headroom';
import Logo from '../icons/Logo';

const StyledLink = styled(Link)`
  display: flex;
  font-weight: 700;
  align-items: center;
  svg {
    height: 2.5rem;
    margin-bottom: 0;
  }
`;

const LogoText = styled.span`
  text-transform: uppercase;
  font-family: ${props => props.theme.fontFamily.heading};
  font-size: 1.25rem;
  margin-left: 0.75rem;
  color: ${props => props.theme.colors.white.base};
  @media (max-width: 500px) {
    display: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  font-family: ${props => props.theme.fontFamily.heading};
  align-items: center;
  a {
    color: ${props => props.theme.colors.white.base};
    margin-left: 2rem;
    transition: all 0.4s;
    border-bottom: 1px solid transparent;
    &:hover {
      border-bottom: 1px solid white;
      color: white;
    }
    &:focus {
      color: white;
    }
  }
`;

const Navigation = () => (
  <Headroom calcHeightOnResize disableInlineStyles>
    <StyledLink to="/">
      <Logo />
      <LogoText>LekoArts</LogoText>
    </StyledLink>
    <Nav>
      <Link to="/projekte" activeClassName="active">
        Projekte
      </Link>
      <Link to="/blog" activeClassName="active">
        Blog
      </Link>
      <Link to="/kontakt" activeClassName="active">
        Kontakt
      </Link>
    </Nav>
  </Headroom>
);

export default Navigation;