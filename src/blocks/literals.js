import React, {PropTypes} from 'react'

import PureComponent from './helpers/pure-component'
import Input from './helpers/input'

class NumericLiteral extends PureComponent {

  render () {
    const {value, path, onChange} = this.props
    return (
      <Input type='number' value={value} {...{path, onChange}} />
    )
  }

}

NumericLiteral.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

class StringLiteral extends PureComponent {

  render () {
    const {value, path, onChange} = this.props
    return (
      <span>"<Input type='text' value={value} {...{path, onChange}} />"</span>
    )
  }

}

StringLiteral.propTypes = {
  value: PropTypes.string
}

class BooleanLiteral extends PureComponent {

  render () {
    const {value, path, onChange} = this.props
    return (
      <input type='checkbox' checked={value} style={{verticalAlign: 'middle'}}
        onChange={(event) => onChange(path, event.target.checked)} />
    )
  }

}

export default {NumericLiteral, StringLiteral, BooleanLiteral}
