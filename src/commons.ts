import styled, {css} from 'styled-components'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export const StyledLink = styled(Link)`
  color: hotpink;
  text-decoration: none;
  padding: 10px 0;
`

export const StyledAnchor = styled.a`
  color: hotpink;
  text-decoration: none;
  padding: 10px 0;
`

export type ProjectType = {
  title: string,
  image: string,
  description: string,
  link: string
}