import React from 'react'
import styled from 'styled-components'

import PureComponent from './pure-component'
import {size} from '../../style'

const InnerBlock = styled.div`
  display: inline-block;
  padding: ${size.SMALL}px;
`

class Block extends PureComponent {

  render () {
    return (
      <InnerBlock>{this.props.children}</InnerBlock>
    )
  }

}

export default Block
