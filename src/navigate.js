import {List} from 'immutable'
import {isNumber} from 'lodash'

import {childrenPropKeys} from './to-block'

const UP = 'up'
const DOWN = 'down'
const LEFT = 'left'
const RIGHT = 'right'

const nonNavKeys = List.of(
  'type', 'start', 'end', 'loc', 'comments', 'tokens', 'operator', 'kind'
)
const leafNodeTypes = List.of(
  'Identifier', 'BooleanLiteral', 'NumericLiteral', 'StringLiteral'
)

const yKeys = List.of('id', 'test', ...childrenPropKeys, 'alternate')
const yKeysReverse = yKeys.reverse()

const isXKey = (key) => !nonNavKeys.includes(key)
const isYKey = (key) => yKeys.includes(key)
const isNodeKeyOf = (node) => (key) => node && node.keySeq().includes(key)

const [findPreviousYPath, findNextYPath] = (() => {
  const buildFindYNeighborPath = (keys, updateIndex, checkFringe) =>
    (ast, startPath) => (
      function find (path) {
        const lastKey = path.last()
        const parentPath = path.slice(0, -1)
        const parentNode = ast.getIn(parentPath)
        const parentSize = parentNode.size

        const isFringe = checkFringe(parentSize, lastKey)
        if (isYKey(lastKey) || isFringe) {
          const prevBodyKey = path.last()
          const newBodyKey = keys
            .slice(keys.indexOf(prevBodyKey) + 1)
            .find(isNodeKeyOf(parentNode))
          path = parentPath
          const newPath = path.push(newBodyKey)
          return newBodyKey && ast.getIn(newPath) ? newPath : find(path)
        } else if (isNumber(lastKey)) {
          return path.update(-1, updateIndex.bind(null, parentSize))
        } else {
          return find(parentPath)
        }
      }(startPath)
    )

  return [
    buildFindYNeighborPath(
      yKeysReverse, (size, n) => Math.max(0, n - 1), (size, n) => n === 0
    ),
    buildFindYNeighborPath(
      yKeys, (size, n) => Math.min(size - 1, n + 1), (size, n) => n === size - 1
    )
  ]
})()

const [findFirstStatementPathIn, findLastStatementPathIn] = (() => {
  const findChildKey = (node, keys) => {
    const childKey = keys.find(isNodeKeyOf(node))
    const childNode = node.get(childKey)
    keys = keys.slice(keys.indexOf(childKey) + 1)

    if (childNode) return [childKey, childNode]
    else if (keys.isEmpty() || !childKey) return []
    else return findChildKey(node, keys)
  }

  const buildFindStatementPathIn = (keys, indexFn) => (startNode) => (
    function findIn (node) {
      const [childKey, childNode] = findChildKey(node, keys)
      if (!childNode) return new List()

      let path = List.of(childKey)
      if (childNode instanceof List) {
        path = path.push(indexFn(childNode))
      }
      return path.concat(findIn(node.getIn(path)))
    }(startNode)
  )

  return [
    buildFindStatementPathIn(yKeys, (list) => 0),
    buildFindStatementPathIn(yKeysReverse, ({size}) => size - 1)
  ]
})()

const traverseAST = (ast, path, findNeighbor, findIn) => {
  const neighbourPath = findNeighbor(ast, path)
  return neighbourPath.concat(findIn(ast.getIn(neighbourPath)))
}

const navigate = (ast, path, direction) => {
  const isLowestLevel = path.size === 3
  const lastKey = path.last()

  switch (direction) {

    case UP:
      return isLowestLevel && lastKey === 0
        ? path
        : traverseAST(ast, path, findPreviousYPath, findLastStatementPathIn)

    case DOWN:
      return isLowestLevel && lastKey === ast.getIn(path.slice(0, -1)).size - 1
        ? path
        : traverseAST(ast, path, findNextYPath, findFirstStatementPathIn)

    case LEFT:
      return path

    case RIGHT:
      return path

    default:
      throw new Error('Unexpected direction ' + direction)

  }
}

export {UP, DOWN, LEFT, RIGHT}

export default navigate
