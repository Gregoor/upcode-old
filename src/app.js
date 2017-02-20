import React, {Component} from 'react'
import Immutable from 'immutable'
import styled from 'styled-components'

import navigate, {LEFT, RIGHT, UP, DOWN} from './navigate'
import reservedWords from './blocks/helpers/reserved-words'
import toBlock from './to-block'
import {UnstyledInput} from './ui'
import {size} from './style'

const MainBlock = styled.div`
  margin-bottom: 64px;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  white-space: pre;
`

const TitleInput = styled(UnstyledInput)`
  font-size: ${size.BIG}px;
  ${(props) => props.italic && `
    font-style: italic;
  `}
`

const yDirections = Immutable.List.of(UP, DOWN)

class App extends Component {

  state = {
    document: new Immutable.OrderedMap(Immutable.fromJS({
      title: 'Test',
      ast: require('./example.json')
    })),
    selected: true,
    cursorAt: new Immutable.List([])
  };

  render () {
    const {document, selected, cursorAt} = this.state
    const title = document.get('title')

    return (
      <MainBlock>
        <TitleInput type='text' italic={!(title || selected)}
          value={selected ? title : (title || '<Unnamed>')}
          onSelect={() => this.setState({selected: true})}
          onBlur={() => this.setState({selected: false})}
          onChange={this.updateTitle} />
        <button onClick={() => {
          const babel = require('babel-standalone')
          console.log(babel.transformFromAst(document.get('ast').toJSON(), '', {}).code)
        }}>
          Print
        </button>
        <hr />
        <div tabIndex='0' onKeyDown={this.navigateBlocks}>
          {toBlock(document.get('ast'), cursorAt, {
            onChange: this.updateDocument,
            onFocus: (path) => this.setState({cursorAt: path})
          })}
        </div>
      </MainBlock>
    )
  }

  updateTitle = (event) => {
    this.setState({
      document: this.state.document.set('title', event.target.value)
    })
  };

  updateDocument = (path, value) => {
    const document = this.state.document
    const node = document.getIn(['ast', ...path])

    const type = node.get('type')
    if (type === 'Identifier') {
      value = value.replace(/\s/gi, '')
      if (reservedWords.includes(value)) {
        // TODO: Maybe
      }
    } else if (type === 'NumericLiteral') {
      const hadPoint = value.length > 0 && value[value.length - 1] === '.'
      value = parseFloat(value)
      if (!value.toString().includes('.') && hadPoint) value += '.'
    }

    this.setState({
      document: document.setIn(
        ['ast', ...path, node.get('name') ? 'name' : 'value'],
        value
      )
    })
  };

  navigateBlocks = (event) => {
    const direction = {
      'ArrowUp': UP,
      'ArrowDown': DOWN,
      'ArrowLeft': LEFT,
      'ArrowRight': RIGHT
    }[event.key]

    const isInput = event.target.tagName === 'INPUT'
    if (!direction || (isInput && !yDirections.includes(direction))) {
      return
    }

    event.preventDefault()
    if (isInput) event.target.blur()
    const {document, cursorAt} = this.state
    this.setState({
      cursorAt: navigate(document.get('ast'), cursorAt, direction)
    })
  };

}

export default App
