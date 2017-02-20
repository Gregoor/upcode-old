import React, {PropTypes} from 'react'

import PureComponent from './helpers/pure-component'
import Input from './helpers/input'

class Identifier extends PureComponent {

  render () {
    const {name, path, onChange} = this.props

    return (
      <Input type='text' value={name} color='black' {...{path, onChange}} />
    )
  }

}

Identifier.propTypes = {
  name: PropTypes.string.isRequired
}

export default Identifier
