import React from 'react';
import '../.././src/App.css';
import Button from './Button';
import Placeholder from './Placeholder';
import { connect } from 'react-redux';

import {
    getNpcBet, 
    getPlayerBet, 
    getNpcBalance, 
    getPlayerBalance, 
    getRaiseAmount, 
    getTotalBet 
} from '../models/App/app.stateSelectors';

const sidebar = (props) => {
    const { 
        playerBet,
        npcBet,
        amountRaised,
        totalBet,
        onCall,
        onFold,
        onRaise,
        startNewGame
    } = props;
        
    return (
        <div className="gameplay-button-group">
            <Button
                CSSclass='raise-btn'
                name='Raise'
                onClick={onRaise}/>
            <Placeholder
                CSSclass='raise-placeholder'
                parentCb={amountRaised}
                readOnly={false}
                value={props.raiseInput}
                />
            <Button
                CSSclass='call-btn'
                name='Call'
                onClick={onCall}/>
            <Button
                CSSclass='fold-btn'
                name='Fold'
                onClick={onFold}/>
            <div className='text-style'>NPC bet</div>
            <Placeholder
                CSSclass='bet-placeholder'
                readOnly={true}
                value={npcBet}
                />
            <div className='text-style'>Player bet</div>
            <Placeholder
                CSSclass='bet-placeholder'
                readOnly={true}
                value={playerBet}
                />
            <div className='text-style'>Total amount</div>
            <Placeholder
                CSSclass='bet-placeholder'
                readOnly={true}
                value={totalBet}
                />
            <Button
                CSSclass='new-game-btn'
                name='Start New Game'
                onClick={startNewGame}/>
            <Button
                CSSclass='change-cards-btn'
                name='Change Cards'
                onClick={props.changeCards}
                disableBtn={props.disableBtn}/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    playerBet: getPlayerBet(state.app),
    npcBet: getNpcBet(state.app),
    totalBet: getTotalBet(state.app),
    npcBalance: getNpcBalance(state.app),
    playerBalance: getPlayerBalance(state.app),
    amountRaised: getRaiseAmount(state.app)
});
      
export default connect(mapStateToProps)(sidebar);
