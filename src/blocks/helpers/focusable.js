import React from 'react'
// import styled from 'styled-components'

import PureComponent from './pure-component'

const isInViewport = (element) => {
  const {top, left, bottom, right} = element.getBoundingClientRect()
  const html = document.documentElement
  return (
    top >= 0 && left >= 0 &&
    bottom <= (window.innerHeight || html.clientHeight) &&
    right <= (window.innerWidth || html.clientWidth)
  )
}

class Focusable extends PureComponent {

  componentDidUpdate () {
    const {root} = this
    if (!this.props.isFocused || !root) return

    if (!isInViewport(root)) root.scrollIntoView()
    root.focus()
  }

  render () {
    const {isFocused, children} = this.props

    return (
      <span ref={(n) => { this.root = n }} tabIndex='-1'
        style={{border: isFocused ? '1px solid red' : 'none'}}
        onClick={this.onFocus} onFocus={this.onFocus}>
        {children}
      </span>
    )
  }

  onFocus = (event) => {
    event.stopPropagation()
    const {onFocus, path} = this.props
    onFocus(path)
  }

}

export default Focusable
