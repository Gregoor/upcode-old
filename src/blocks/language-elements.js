import React from 'react'
import Immutable from 'immutable'

import Block from './helpers/block'

import Identifier from './identifier'
import Literals from './literals'
import Expressions from './expressions'
import Declarations from './declarations'
import Statements from './statements'

const childrenIdentity = ({children}) => <span>{children}</span>

const LanguageElements = new Immutable.Map()
  .merge(
  {
    Identifier,
    File: childrenIdentity,
    Program: childrenIdentity,
    BlockStatement: ({children}) => <Block>{'  '}{children}</Block>,
    ExpressionStatement: ({children}) => <Block color='#E1BEE7'>{children}</Block>
  },
    Literals, Expressions, Declarations, Statements)

export default LanguageElements
