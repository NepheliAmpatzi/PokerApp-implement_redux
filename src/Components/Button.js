import React from 'react'

function Button ({ CSSclass, onClick, disableBtn, name }) {
  return (
    <button
      className={CSSclass}
      onClick={onClick}
      disabled={disableBtn}
    >
      {name}
    </button>
  )
}

export default Button
