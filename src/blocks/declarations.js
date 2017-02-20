import React, {PropTypes} from 'react'

import PureComponent from './helpers/pure-component'
import Block from './helpers/block'
import Keyword from './helpers/keyword'
import joinElements from './helpers/join-elements'

class VariableDeclaration extends PureComponent {

  render () {
    const {kind, declarations} = this.props
    return (
      <Block color='#FFE0B2'>
        <span>
          <Keyword>{kind}</Keyword>
          {joinElements(declarations)}
        </span>
      </Block>
    )
  }

}

VariableDeclaration.propTypes = {
  kind: PropTypes.oneOf(['const', 'let', 'var']),
  declarations: PropTypes.array.isRequired
}

class VariableDeclarator extends PureComponent {

  render () {
    const {id, init} = this.props
    return (
      <span><span>{id}</span> = {init}</span>
    )
  }

}

VariableDeclarator.propTypes = {
  id: PropTypes.any.isRequired,
  init: PropTypes.any.isRequired
}

class FunctionDeclaration extends PureComponent {

  render () {
    const {id, params, children} = this.props

    return (
      <Block color='#BBDEFB'>
        <div>
          <Keyword>fn</Keyword>{id}
          ({joinElements(params)})
        </div>
        {children}
      </Block>
    )
  }

}

FunctionDeclaration.propTypes = {
  id: PropTypes.any,
  params: PropTypes.array,
  children: PropTypes.any
}

FunctionDeclaration.defaultProps = {
  params: []
}

export default {VariableDeclarator, VariableDeclaration, FunctionDeclaration}
