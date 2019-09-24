import React from 'react';
import '../.././src/App.css'
import Button from './Button';
import Placeholder from './Placeholder';

function Sidebar(props){

    function receiveRaiseAmount(dataFromChild){
        props.sendInfo(dataFromChild)
    }

        return (
            <div className="gameplay-button-group">
                <Button
                    CSSclass='raise-btn'
                    name='Raise'
                    onClick={props.onRaise}/>
                <Placeholder
                    CSSclass='raise-placeholder'
                    parentCb={receiveRaiseAmount}
                    readOnly={false}
                    value={props.raiseInput}
                    />
                <Button
                    CSSclass='call-btn'
                    name='Call'
                    onClick={props.onCall}/>
                <Button
                    CSSclass='fold-btn'
                    name='Fold'
                    onClick={props.onFold}/>
                <div className='text-style'>NPC bet</div>
                <Placeholder
                    CSSclass='bet-placeholder'
                    readOnly={true}
                    value={props.npcBet}
                    />
                <div className='text-style'>Player bet</div>
                <Placeholder
                    CSSclass='bet-placeholder'
                    readOnly={true}
                    value={props.playerBet}
                    />
                <div className='text-style'>Total amount</div>
                <Placeholder
                    CSSclass='bet-placeholder'
                    readOnly={true}
                    value={props.totalBet}
                    />
                <Button
                    CSSclass='new-game-btn'
                    name='Start New Game'
                    onClick={props.startNewGame}/>
                <Button
                    CSSclass='change-cards-btn'
                    name='Change Cards'
                    onClick={props.changeCards}
                    disableBtn={props.disableBtn}/>
            </div>
        );
    }

export default Sidebar;