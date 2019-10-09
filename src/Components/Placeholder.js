<<<<<<< HEAD
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
=======
import React from 'react';
import '../.././src/App.css';
import { connect } from 'react-redux';
import { getRaiseAmount } from '../models/App/app.stateSelectors';

const placeholder = (props) => {

  const raiseInputCb = (event) => {
    props.parentCb(event.target.value);
  };

  return (
    <input
      className={props.CSSclass}
      type="number"
      npc={props.npc}
      value={props.value}
      onChange={raiseInputCb}
      readOnly={props.readOnly}>
    </input>
  );
};

const mapStateToProps = (state) => ({
  raiseAmount: getRaiseAmount(state.app)
});

export default connect(mapStateToProps)(placeholder);
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63
