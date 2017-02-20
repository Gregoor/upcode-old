import React, {PropTypes} from 'react'

import PureComponent from './helpers/pure-component'
import Block from './helpers/block'
import Keyword from './helpers/keyword'

class IfStatement extends PureComponent {

  render () {
    const {test, children, alternate} = this.props

    let alternateBranch
    if (alternate) {
      alternateBranch = [
        <div key='else'><Keyword>else</Keyword></div>,
        alternate
      ]
    }

    return (
      <Block color='#DCEDC8'>
        <div>
          <Keyword>if</Keyword>
          ({test})
        </div>
        {children}
        {alternateBranch}
      </Block>
    )
  }

}

IfStatement.propTypes = {
  test: PropTypes.any.isRequired
}

class ReturnStatement extends PureComponent {

  render () {
    return (
      <Block><Keyword>return</Keyword>{this.props.argument}</Block>
    )
  }

}

ReturnStatement.propTypes = {
  argument: PropTypes.any
}

export default {IfStatement, ReturnStatement}
