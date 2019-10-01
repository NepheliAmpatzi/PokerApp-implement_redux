import React from 'react';
import '../.././src/App.css'

function Placeholder(props) {

  function raiseInputCb(event) {
    props.parentCb(event.target.value);
  }
  return (
    <input
      className={props.CSSclass}
      type="number"
      npc={props.npc}
      value={props.value}
      onChange={(value)=>raiseInputCb(value)}
      readOnly={props.readOnly}>
    </input>
  );

}
//(value) => onValueChangeHandler(value)

export default Placeholder;