import React from 'react'
import Immutable from 'immutable'

import Grammar from './blocks/helpers/grammar'
import LanguageElements from './blocks/language-elements'
import Focusable from './blocks/helpers/focusable'

const propRemap = new Immutable.Map({
  'arguments': 'args',
  'key': 'objKey'
})

const childrenPropKeys = new Immutable.List(
  ['program', 'body', 'consequent']
)

export {childrenPropKeys}

const toBlock = (ast, cursorAt, {onChange, onFocus}) => {
  const toBlockInternal = (node, path = new Immutable.List(), pos = new Immutable.List([])) => {
    if (node instanceof Immutable.List) {
      // eslint-disable-next-line
      return node.map(toBlocks(path, pos))
    }
    if (!(node instanceof Immutable.Map)) {
      return <h2>Unprocessable AST {JSON.stringify(node)}</h2>
    }

    const type = node.get('type')

    const nodeDef = Grammar.get(type)

    if (!nodeDef) {
      return <h2>Unsupported type {type}</h2>
    }

    const propKeys = nodeDef.get('props').delete('type').keySeq()

    const props = new Immutable.Map(
      propKeys
        .filter((key) => !childrenPropKeys.includes(key))
        .map((key, i) => {
          const value = node.get(key)

          return [
            propRemap.get(key) || key,
            value instanceof Object
              ? toBlockInternal(value, path.push(key), pos.push(i))
              : value
          ]
        })
    ).merge({path, onChange}).toJSON()

    const blockComponent = LanguageElements.get(node.get('type'))

    if (!blockComponent) {
      return <h2>No element for type {type}</h2>
    }

    let body
    const childKey = type === 'ExpressionStatement'
      ? 'expression'
      : propKeys.find((key) => childrenPropKeys.includes(key))
    if (childKey) {
      body = toBlockInternal(node.get(childKey), path.push(childKey))
    }

    const element = React.createElement(blockComponent, props, body)
    return (
      <Focusable key={path.toString()} isFocused={cursorAt.equals(path)}
        onFocus={onFocus} path={path}>
        {element}
      </Focusable>
    )
  }

  const toBlocks = (path, pos) =>
    (subAST, i) => toBlockInternal(subAST, path.push(i), pos.push(i))

  return toBlockInternal(ast)
}

export default toBlock
