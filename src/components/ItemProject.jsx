import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'react-emotion'

const Overlay = styled.div`
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
  border-radius: ${props => props.theme.borderRadius.default};
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  padding: 1rem;
  background-image: linear-gradient(
    30deg,
    ${props => props.theme.colors.primary.light} 0%,
    ${props => props.theme.colors.primary.dark} 100%
  );
  color: ${props => props.theme.colors.white.light};
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  h2 {
    margin-bottom: 0;
  }
  &:hover {
    color: ${props => props.theme.colors.white.light};
  }
`

const Wrapper = styled(Link)`
  display: inline-block;
  width: 100%;
  position: relative;
  border-radius: ${props => props.theme.borderRadius.default};
  box-shadow: ${props => props.theme.shadow.feature.small.default};
  transition: ${props => props.theme.transitions.boom.transition};
  img {
    border-radius: ${props => props.theme.borderRadius.default};
  }
  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.hover};
    transform: translateY(-12px);
    ${Overlay} {
      visibility: visible;
      opacity: 0.9;
    }
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 5px ${props => props.theme.tint.blue};
    ${Overlay} {
      visibility: visible;
      opacity: 0.9;
    }
  }
`

const ItemProject = ({ cover, path, customer, title }) => (
  <Wrapper to={path}>
    <Img fluid={cover} />
    <Overlay>
      <div>{customer}</div>
      <h2>{title}</h2>
    </Overlay>
  </Wrapper>
)

export default ItemProject

ItemProject.propTypes = {
  cover: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  customer: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
