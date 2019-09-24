import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import { changePlayerBalance } from '../models/App/app.actions.creator';
import { getPlayerBalance } from '../models/App/app.stateSelectors';

/**
 * This component represents the redux implementation, feel free to remove this file after recreation
 */
function ChangeUserBalanceButton({ onClickHandler, viewingBalance }) {
  return (
    <div style={{position: 'absolute', bottom: '10px', left: '10px'}}>
      <span style={{color: 'red'}}>REDUX Example</span><br/>
      <Button
        CSSclass='raise-btn'
        name='Change User Balance example'
        onClick={onClickHandler}
      /><br/>
      <span style={{color: 'white'}}>The player balance now is: {`${viewingBalance}`}</span>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onClickHandler: () => {
    dispatch(changePlayerBalance(-50));
  }
});

const mapStateToProps = (state) => ({
  viewingBalance: getPlayerBalance(state.app)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUserBalanceButton);
