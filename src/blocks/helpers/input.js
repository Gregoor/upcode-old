import React, {PropTypes} from 'react'

import PureComponent from './pure-component'
import {color} from '../../style';
import {UnstyledInput} from '../../ui'

class Input extends PureComponent {

  render () {
    const {type, value} = this.props

    return (
      <UnstyledInput type='text' value={value} size={value.toString().length || 1}
        style={{color: this.props.color || (type === 'number' ? color.NUMBER : color.STRING)}}
        onChange={this.onChange} />
    )
  }

  onChange = (event) => {
    const {onChange, path} = this.props
    onChange(path, event.target.value)
  }

}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'number']).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default Input
