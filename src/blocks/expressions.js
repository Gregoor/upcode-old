import React, {PropTypes} from 'react'

import PureComponent from './helpers/pure-component'
import Block from './helpers/block'
import joinElements from './helpers/join-elements'

class AssignmentExpression extends PureComponent {

  render () {
    const {left, operator, right} = this.props
    return <span><span>{left}</span> {operator} {right}</span>
  }

}

AssignmentExpression.propTypes = {
  left: PropTypes.any.isRequired,
  operator: PropTypes.string.isRequired,
  right: PropTypes.any.isRequired
}

class BinaryExpression extends PureComponent {

  render () {
    const {left, operator, right} = this.props
    return <span><span>{left}</span> {operator} {right}</span>
  }

}

BinaryExpression.propTypes = {
  left: PropTypes.any.isRequired,
  operator: PropTypes.string.isRequired,
  right: PropTypes.any.isRequired
}

class MemberExpression extends PureComponent {

  render () {
    const {object, property} = this.props
    return <span><span>{object}</span>.{property}</span>
  }

}

MemberExpression.propTypes = {
  object: PropTypes.any.isRequired,
  property: PropTypes.any.isRequired
}

class CallExpression extends PureComponent {

  render () {
    const {callee, args} = this.props
    return <span>{callee}({joinElements(args)})</span>
  }

}

CallExpression.propTypes = {
  callee: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  args: PropTypes.array
}

CallExpression.defaultProps = {
  args: []
}

class ArrayExpression extends PureComponent {

  render () {
    const {elements} = this.props
    return <span>[{joinElements(elements)}]</span>
  }

}

ArrayExpression.propTypes = {
  elements: PropTypes.array
}

ArrayExpression.defaultProps = {
  elements: []
}

class ObjectExpression extends PureComponent {

  render () {
    const {properties} = this.props
    return (
      <span>
        {'{'}
        <Block indent>
          {joinElements(properties, [' ', <br />])}
        </Block>
        {'}'}
      </span>
    )
  }

}

ObjectExpression.propTypes = {
  properties: PropTypes.array
}

ObjectExpression.defaultProps = {
  properties: []
}

class ObjectProperty extends PureComponent {

  render () {
    const {objKey, value} = this.props

    return <span><span>{objKey}</span>: {value}</span>
  }

}

ObjectProperty.propTypes = {
  objKey: PropTypes.any,
  value: PropTypes.any
}

class ArrowFunctionExpression extends PureComponent {

  render () {
    const {params, children} = this.props
    return <span>({joinElements(params)}) ⇒ {children}</span>
  }

}

ArrowFunctionExpression.propTypes = {
  params: PropTypes.array,
  children: PropTypes.any
}

ArrowFunctionExpression.defaultProps = {
  params: []
}

export default {
  AssignmentExpression,
  BinaryExpression,
  MemberExpression,
  CallExpression,
  ArrayExpression,
  ObjectExpression,
  ObjectProperty,
  ArrowFunctionExpression
}
