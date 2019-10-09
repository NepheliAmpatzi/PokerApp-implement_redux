import React, { Component } from 'react'
import '../.././src/App.css'

class Placeholder extends Component() {
  constructor (props) {
    super(props)
    this.state = {
      raiseAmount: ''
    }
    this.raiseInputCb = this.raiseInputCb.bind(this)
  }

  raiseInputCb (event) {
    this.setState({
      raiseAmount: event.target.value
    })
    this.props.parentCb(event.target.value)
  }

  render () {
    return (
      <input
        className={this.props.CSSclass}
        type="number"
        npc={this.props.npc}
        value={this.props.value}
        onChange={this.raiseInputCb}
        readOnly={this.props.readOnly}>
      </input>
    )
  }
}
// (value) => onValueChangeHandler(value)

export default Placeholder
