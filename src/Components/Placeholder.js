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
